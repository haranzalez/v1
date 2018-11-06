'use strict'
const Ruta = use('App/Models/Ruta');
const Comentario = use('App/Models/ComentariosRuta');

class RutaController {

//===================================================================
//READ
//===================================================================
     async get_all_rutas({ params }){
        const rutas = await Ruta.query()
        .with('comentarios')
        .with('municipios')
        .fetch()
        for(let prop in rutas.rows)
        {
            let muni = await rutas.rows[prop].municipios().fetch()
            if(muni.rows.length > 0){
                rutas.rows[prop]['municipio_id'] = muni.rows[0]['id']
                rutas.rows[prop]['nombre_municipio'] = muni.rows[0]['nombre_municipio']
            }else{
                rutas.rows[prop]['municipio_id'] = null
                rutas.rows[prop]['nombre_municipio'] = 'No aplica'
            }
        }
        for(let prop1 in rutas.rows){
            let comentarios = await rutas.rows[prop1].comentarios().fetch()
            rutas.rows[prop1]['comentario'] = []
            if(comentarios.rows.length > 0){
                for(let prop2 in comentarios.rows){
                    rutas.rows[prop1]['comentario'].push(
                        {
                            usuario: comentarios.rows[prop2]['usuario'],
                            comentario: comentarios.rows[prop2]['comentario'],
                            fecha: comentarios.rows[prop2]['created_at'].toString().substring(0, comentarios.rows[prop2]['created_at'].toString().length - 42),
                        }
                    )
                }
            }
            
        }
        
        return rutas
    }

    async get_ruta({ params }){
        const { id } = params;
        const ruta = await Ruta.find(id)
       
        let muni = await ruta.municipios().fetch()
        ruta['municipio_id'] = muni.rows[0]['municipio_id']
        ruta['nombre_municipio'] = muni.rows[0]['nombre_municipio']
        
        let comentarios = await ruta.comentarios().fetch()
        ruta['comentario'] = []
        for(let prop in comentarios.rows){
            ruta['comentario'].push(
                {
                    usuario: comentarios.rows[prop]['usuario'],
                    comentario: comentarios.rows[prop]['comentario'],
                    fecha: comentarios.rows[prop]['created_at'].toString(),
                }
            )
        }

        return ruta
        
    }
//===================================================================
//CREATE
//===================================================================
    async create_ruta({auth, request }){
        const user = auth.user
        
        const {
            kilometros,
            anticipo_sugerido,
            valor_flete,
            municipio_id,
            comentario,
        } = request.all()
       
        const ruta = await Ruta.create({
            kilometros,
            anticipo_sugerido,
            valor_flete
        })

        /*if(comentario && user){
            await Comentario.create({
                ruta_id: ruta.id,
                comentario: comentario,
                usuario:user.username
            })
            const comentarios = await ruta.comentarios().fetch()
            ruta.comentarios = []
            for(let prop in comentarios.rows){
                ruta.comentarios = {
                    usuario: comentarios.rows[prop]['usuario'],
                    comentario: comentarios.rows[prop]['comentario'],
                    fecha: comentarios.rows[prop]['created_at'],
                }
            }

        }*/
        if(municipio_id){
            await ruta.municipios().attach(municipio_id)
        }

        return {
            message: "success"
        }

    }

    async get_comments({params}){
        const { ruta_id } = params
        const coments = await Comentario.query().where('ruta_id', ruta_id).fetch()
        for(let prop in coments.rows){
            coments.rows[prop]['fecha'] = coments.rows[prop]['created_at'].toString().substring(0, coments.rows[prop]['created_at'].toString().length - 42)
        }
        return coments
    }

    async create_comment({auth,request}){
        const user = auth.user
        const {
            ruta_id,
            comentario,
        } = request.all()
        return await Comentario.create({
            ruta_id,
            comentario,
            usuario: user.username,
        })
        
    }
   
//===================================================================
//UPDATE
//===================================================================
    async update_ruta({ auth, request, params }){
        const user = auth.user
        const { id } = params;
        const ruta = await Ruta.find(id)
        if(ruta == null){
            return {
                message: "No se pudo encontrar esta ruta en los registros."
            }
        }
        const {
            kilometros,
            anticipo_sugerido,
            valor_flete,
            municipio_id,
        } = request.all()
        let municipio = []
       
        if(municipio_id != null){
            
            const muni = await ruta.municipios().fetch()
            if(muni.rows.length > 0){
                await ruta.municipios().detach([muni.rows[0]['id']])
            }
            await ruta.municipios().attach(municipio_id)
        }

        ruta.kilometros = kilometros
        ruta.anticipo_sugerido = anticipo_sugerido
        ruta.valor_flete = valor_flete
        ruta.save()
        ruta['municipio'] = await ruta.municipios().fetch()
        return ruta

    }

//===================================================================
//DELETE
//===================================================================
     async delete_ruta({ params }){
        const { id } = params
        const ruta = await Ruta.find(id)
        return ruta.delete()
    }

}

module.exports = RutaController
