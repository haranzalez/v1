'use strict'
const Ruta = use('App/Models/Ruta');
const Comentario = use('App/Models/ComentariosRuta');

class RutaController {

//===================================================================
//READ
//===================================================================
     async get_all_rutas({ params }){
        return await Ruta.all()
    }

    async get_ruta({ params }){
        const { id } = params;
        return await Ruta.query()
        .where('id', id).fetch()
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

        if(comentario && user){
            await Comentario.create({
                ruta_id: ruta.id,
                comentario: comentario,
                usuario:user.username
            })
            ruta.comentarios = await ruta.comentarios().fetch()
        }
        if(municipio_id){
            await ruta.municipios().attach(municipio_id)
            ruta.municipio = await ruta.municipios().fetch()
        }

        return ruta

    }
   
//===================================================================
//UPDATE
//===================================================================
    async update_ruta({ auth, request, params }){
        const user = auth.user
        const { id } = params;
        const ruta = await Ruta.find(id)
        const {
            kilometros,
            anticipo_sugerido,
            valor_flete,
            municipio_id,
            comentario
        } = request.all()

        if(comentario && user){
            await Comentario.create({
                ruta_id: ruta.id,
                comentario: comentario,
                usuario:user.username
            })

            ruta.comentarios = await ruta.comentarios().fetch()
        }
        if(municipio_id){
            const muni = await ruta.municipios().fetch()
            if(muni.rows.length > 0){
                ruta.municipios().detach([muni.id])
            }
            await ruta.municipios().attach(municipio_id)
            ruta.municipio = await ruta.municipios().fetch()
        }

        ruta.kilometros = kilometros
        ruta.anticipo_sugerido = anticipo_sugerido
        ruta.valor_flete = valor_flete
        ruta.save()

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
