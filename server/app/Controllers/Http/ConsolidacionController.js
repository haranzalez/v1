'use strict'
const Consolidacion = use('App/Models/Consolidacion')
const Cliente = use('App/Models/Cliente')
const CuadreProducto = use('App/Models/CuadreProducto')
const CuadreRuta = use('App/Models/CuadreViaje')
const CuadreServicio = use('App/Models/CuadreServicio')
const Database = use('Database')
class ConsolidacionController {
     //READ
     async get_all_consolidaciones({ params }){
        const cuadre = await Consolidacion.query()
        .with('cuadre_ruta.ruta.municipios')
        .with('cuadre_producto.producto')
        .with('cuadre_servicio.servicio')
        .with('vehiculo')
        .fetch()
     
        if(cuadre.rows.length > 0){
            for(let prop in cuadre.rows){

                var nombre_razon_social = await Cliente.find(cuadre.rows[prop].cliente_id)
                nombre_razon_social = nombre_razon_social.nombre_razon_social
                cuadre.rows[prop]['nombre_razon_social'] = nombre_razon_social

                if(cuadre.rows[prop].$relations.cuadre_producto.rows.length > 0 && cuadre.rows[prop].$relations.cuadre_producto.rows[0].$relations.producto.rows.length > 0){
                    for(let prop2 in cuadre.rows[prop].$relations.cuadre_producto.rows){
                        const producto = {
                            id: cuadre.rows[prop].$relations.cuadre_producto.rows[prop2].id,
                            nombre: cuadre.rows[prop].$relations.cuadre_producto.rows[prop2].$relations.producto.rows[0].nombre,
                        }
                        cuadre.rows[prop]['producto'] = producto
                    }
                    
                }else{
                    cuadre.rows[prop]['producto'] = null
                }
        
                if(cuadre.rows[prop].$relations.cuadre_servicio.rows.length > 0 && cuadre.rows[prop].$relations.cuadre_servicio.rows[0].$relations.servicio.rows.length > 0){
                    for(let prop2 in cuadre.rows[prop].$relations.cuadre_servicio.rows){
                        const servicio = {
                            id: cuadre.rows[prop].$relations.cuadre_servicio.rows[prop2].id,
                            nombre: cuadre.rows[prop].$relations.cuadre_servicio.rows[prop2].$relations.servicio.rows[0].nombre
                        }
                        cuadre.rows[prop]['servicio'] = servicio
                    }
                   
                }else{
                    cuadre.rows[prop]['servicio'] = null
                }
                
                if(cuadre.rows[prop].$relations.cuadre_ruta.rows.length > 0 &&  cuadre.rows[prop].$relations.cuadre_ruta.rows[0].$relations.ruta.rows.length > 0){
                    for(let prop2 in cuadre.rows[prop].$relations.cuadre_ruta.rows){
                        const ruta = {
                            id: cuadre.rows[prop].$relations.cuadre_ruta.rows[prop2].id,
                            nombre: cuadre.rows[prop].$relations.cuadre_ruta.rows[prop2].$relations.ruta.rows[0].$relations.municipios.rows[0].nombre_municipio + 
                            ' - ' + cuadre.rows[prop].$relations.cuadre_ruta.rows[prop2].$relations.ruta.rows[0].$relations.municipios.rows[1].nombre_municipio
                        }
                        cuadre.rows[prop]['ruta'] = ruta
                    }
                   
                }else{
                    cuadre.rows[prop]['ruta'] = null
                }

              
                cuadre.rows[prop].$relations.cuadre_producto = cuadre.rows[prop].$relations.cuadre_producto.rows[0]
                cuadre.rows[prop].$relations.cuadre_servicio = cuadre.rows[prop].$relations.cuadre_servicio.rows[0]
                cuadre.rows[prop].$relations.cuadre_ruta = cuadre.rows[prop].$relations.cuadre_ruta.rows[0]
            }
            return cuadre
        }
        return []
    }
    async get_consolidacion({ params }){
        const { id } = params;
        return await Consolidacion.query()
        .where('id', id)
        .with('cuadre_ruta.ruta.municipios')
        .with('cuadre_producto.producto')
        .with('cuadre_servicio.servicio')
        .fetch()
    }
    async create_consolidacion({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { cliente_id } = params
        await Consolidacion.create({
            cliente_id
        })
        return {
            message: 'success'
        }
    }
    async get_ruta({params}){
        const { consolidacion_id } = params
        return await CuadreRuta.query()
        .where('consolidacion_id', consolidacion_id)
        .fetch()
    }
    async get_producto({params}){
        const { consolidacion_id } = params
        return await CuadreProducto.query()
        .where('consolidacion_id', consolidacion_id)
        .fetch()
    }
    async get_servicio({params}){
        const { consolidacion_id } = params
        return await CuadreServicio.query()
        .where('consolidacion_id', consolidacion_id)
        .fetch()
    }
    async get_vehiculo({params}){
        const { consolidacion_id } = params
        return await Database.from('vehiculos').where('consolidacion_id', consolidacion_id)
    }
    async add_ruta({ params }){
        const { consolidacion_id, cuadre_ruta_id } = params
        //await CuadreRuta.query().where('consolidacion_id', consolidacion_id).update({ consolidacion_id: null })
        const cuadreRuta = await CuadreRuta.find(cuadre_ruta_id)
        const cons = await Database.from('pivot_consolidacion_cuadre_rutas').where('consolidacion_id', consolidacion_id)
       
       
        if(cons.length > 0){
            await Database.table('pivot_consolidacion_cuadre_rutas').where('consolidacion_id', consolidacion_id).delete()
        }
        await cuadreRuta.consolidacion().attach([consolidacion_id])
        return {
            message: 'success'
        }
    }
    async add_producto({ params }){
        const { consolidacion_id, cuadre_producto_id } = params
        //await CuadreProducto.query().where('consolidacion_id', consolidacion_id).update({ consolidacion_id: null })
        const cuadreProducto = await CuadreProducto.find(cuadre_producto_id)
        const cons = await Database.from('pivot_consolidacion_cuadre_productos').where('consolidacion_id', consolidacion_id)
       
      
        if(cons.length > 0){
            await Database.table('pivot_consolidacion_cuadre_productos').where('consolidacion_id', consolidacion_id).delete()
        }
        await cuadreProducto.consolidacion().attach([consolidacion_id])
        return {
            message: 'success'
        }
    }
    async add_servicio({ params, request }){
        const { consolidacion_id } = params
        const { servicios } = request
        //await CuadreServicio.query().where('consolidacion_id', consolidacion_id).update({ consolidacion_id: null })
        const cons = await Database.from('pivot_consolidacion_cuadre_servicios').where('consolidacion_id', consolidacion_id)
        

        if(cons.length > 0){
            await Database.table('pivot_consolidacion_cuadre_servicios').where('consolidacion_id', consolidacion_id).delete()
        }
        await Consolidacion.cuadre_servicio().attach(servicios)
        return {
            message: 'success'
        }
    }
    async add_vehiculo({ params }){
        const { consolidacion_id, vehiculo_id } = params
        await Database.table('vehiculos').where('id', vehiculo_id).update({consolidacion_id})
        return {
            message: 'success'
        }
    }
    //UPDATE
    async update_consolidacion({ auth, request, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params;
        const consolidacion = await Consolidacion.find(id)
        const {
            
        } = request.all()
        consolidacion.save()

        return consolidacion

    }

     //DELETE
     async delete_consolidacion({ auth, params }){
        const user = await auth.getUser()
        await Database.raw('SET hq.usuario = ' + user.nombre)
        const { id } = params
        const consolidacion = await Consolidacion.find(id)
        return consolidacion.delete()
    }
}

module.exports = ConsolidacionController
