<template>
<el-collapse v-model="activo" @change="handleChange">
 <el-collapse-item v-for="item in modules" :key="item.id" :title="item.nombre" :name="item.id">
  <!-- <el-collapse-item title="Prueba" name="1"> -->
    <el-tabs :tab-position="tabPosition">
        <el-tab-pane v-for="sub in item.subModulo" :key="sub.id" :label="sub.nombre" :value="sub.nombre" :name="sub.nombre">
            <el-checkbox @change="handleCheckAllChange($event, sub.nombre)" :indeterminate="isIndeterminate[sub.nombre]" v-model="checkAll[sub.nombre]">Seleccionar todos</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedPermisos[sub.nombre]" @change="handleCheckedPermisoChange($event, sub.nombre)">
                <el-checkbox v-for="per in permisos" :label="per" :key="per">{{per}}</el-checkbox>
            </el-checkbox-group>
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
        checkedPermisos: {},
        permisos: ['editar', 'crear', 'eliminar'],
        isIndeterminate: {},
        tabPosition: 'right',
      };
    },
    computed: {
        ...mapState('roles', [
            'modules',
        ]),
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      handleCheckAllChange(event, subName) {
        this.checkedPermisos[subName] = event ? this.permisos[subName] : [];
        this.isIndeterminate[subName] = false;
      },
      handleCheckedPermisoChange(event, subName) {
          console.log(event)
          
        event.forEach(element => {
            console.log(element)
            let index = this.checkedPermisos[subName].indexOf(element)
            if(index === -1){
                this.checkedPermisos[subName].push(element)
            } 
            else{
                this.checkedPermisos[subName].splice(index, 1)
            }
                
        });
       console.log(this.checkedPermisos[subName])
        let checkedCount = event.length;
        
        this.checkAll[subName] = checkedCount === this.permisos.length;
        this.isIndeterminate[subName] = checkedCount > 0 && checkedCount < this.permisos.length;
      },
     
    },
    created(){
        console.log(this.modules)
        for(let prop in this.modules){
                for(let prop3 in this.modules[prop].subModulo){
                    let name = this.modules[prop].subModulo[prop3]['nombre'].toString()
                    this.checkedPermisos[name] = []
                    
                    for(let prop4 in this.modules[prop].subModulo[prop3]['permisos'])
                    {
                        delete this.modules[prop].subModulo[prop3]['permisos'][prop4]['created_at']
                        delete this.modules[prop].subModulo[prop3]['permisos'][prop4]['updated_at']
                        delete this.modules[prop].subModulo[prop3]['permisos'][prop4]['role_id']
                        delete this.modules[prop].subModulo[prop3]['permisos'][prop4]['id']
                        delete this.modules[prop].subModulo[prop3]['permisos'][prop4]['sub_modulo_id']
                        for(var prop5 in this.modules[prop].subModulo[prop3]['permisos'][prop4]){
                            if(this.modules[prop].subModulo[prop3]['permisos'][prop4][prop5])
                                this.checkedPermisos[name].push(prop5)
                        }

                    }
                }
        }
    }
  }
</script>

<style>

</style>
