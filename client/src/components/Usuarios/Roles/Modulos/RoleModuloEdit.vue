<template>
<el-collapse>
 <el-collapse-item v-for="item in modules" :key="item.id" :title="item.nombre">
  <!-- <el-collapse-item title="Prueba" name="1"> -->
    <el-tabs    v-model="activeName" :tab-position="tabPosition">
        <el-tab-pane 
        v-for="sub in item.subModulo" 
        :key="sub.id" 
        :label="sub.nombre" 
        :value="sub.nombre" 
        :name="sub.nombre">
            <p>Porfavor elija los permisos deseados de manipulacion a <b>{{sub.nombre}}</b> para <b>{{role}}</b></p>
            <p>{{sub.descripcion}}</p>
            <div style="margin: 15px 0;"></div>
            <el-checkbox border
            :checked="permisosSeleccionados[sub.nombre][per]" 
            v-for="per in permisosDisponibles" 
            :label="per" 
            :key="per" 
            @input="handleCheckedPermisoChange($event, sub.nombre, per)">
            {{per}}
            </el-checkbox>
            <el-button type="primary" @click="actualizarPermisos(sub.nombre, sub.id)" size="mini" round plain>Actualizar permisos</el-button>
        </el-tab-pane>
    </el-tabs>
    
  </el-collapse-item>
</el-collapse>

</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

 export default {
    data() {
      return {
        activo: ['1'],
        checkAll: {},
        activeName: '',
        permisosSeleccionados: {},
        permisosDisponibles: ['editar', 'crear', 'eliminar'],
        isIndeterminate: {},
        tabPosition: 'top',
      };
    },
    props: ['role'],
    computed: {
        ...mapState('roles', [
            'modules',
        ]),
        
    },
    methods: {
        ...mapMutations('roles', [
            'setSelectedPermisos',
        ]),
        ...mapActions('roles', [
            'edit',
            'setPermisos',
        ]),
      actualizarPermisos(subName, subId) {
        this.setSelectedPermisos(this.permisosSeleccionados[subName])
        this.setPermisos(subId)
      },
      handleCheckAllChange(event, subName) {
        for(let prop in this.permisosSeleccionados[subName]){
            this.permisosSeleccionados[subName][prop] = event
        }
        console.log(this.permisosSeleccionados[subName])
        this.isIndeterminate[subName] = false;
      },
      handleCheckedPermisoChange(event, subName, op) {
        this.permisosSeleccionados[subName][op] = event;
      },
     
    },
    created(){
        
        for(let prop in this.modules){
            this.activeName = this.modules[prop].subModulo[0]['nombre']
            for(let prop3 in this.modules[prop].subModulo){
                
                let name = this.modules[prop].subModulo[prop3]['nombre'].toString()
                this.permisosSeleccionados[name] = {}
                for(let prop4 in this.modules[prop].subModulo[prop3]['permisos'])
                {
                    delete this.modules[prop].subModulo[prop3]['permisos'][prop4]['created_at']
                    delete this.modules[prop].subModulo[prop3]['permisos'][prop4]['updated_at']
                    delete this.modules[prop].subModulo[prop3]['permisos'][prop4]['role_id']
                    delete this.modules[prop].subModulo[prop3]['permisos'][prop4]['id']
                    delete this.modules[prop].subModulo[prop3]['permisos'][prop4]['sub_modulo_id']
                    for(var prop5 in this.modules[prop].subModulo[prop3]['permisos'][prop4]){
                        this.permisosSeleccionados[name][prop5] = this.modules[prop].subModulo[prop3]['permisos'][prop4][prop5]
                    }

                }
            }
        }
    }
  }
</script>

<style>

</style>
