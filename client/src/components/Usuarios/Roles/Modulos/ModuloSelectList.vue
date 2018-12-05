<template>
<div>
    <div v-if="op == 'edit'">
            <el-transfer
                size="mini"
                v-model="selected"
                :data="allModules"
                :titles="['Todos', roleToEdit.nombre]"
            >
            </el-transfer>
    </div>
    <div v-else>
            <el-transfer
                :disabled="(permisos['Roles'].editar)? false:true"
                v-model="selected"
                :data="allModules"
                :titles="['Todos', 'Nuevo Role']"
            >
            </el-transfer>
    </div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import HTTP from '../../../../http';
  export default {
    data() {
      return {
        selected: [],
        dialogVisible: false,
      };
    },
    props: ['op'],
    watch: {
        'selected' : function(value){
            this.setSelectedModules(value[0])
            return this.selectedModulos
        }
    },
    computed: {
      
        ...mapState('roles', [
            'allModules',
            'selectedModulos',
            'roleToCreate',
            'roleToEdit',
        ]),
         ...mapState('authentication', [
			'permisos',
		]),
    },
    methods: {
        ...mapMutations('roles', [
            'setModuleListDialogeVisible',
            'setSelectedModules',
        ]),
       
    },

  };
</script>
<style lang="scss" scoped>
    
</style>
