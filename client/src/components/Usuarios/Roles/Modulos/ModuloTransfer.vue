<template>
<div>
    <div v-if="op == 'edit'">
            <el-transfer
                @change="handleTransfer"
                size="mini"
                v-model="selectedMods"
                :data="allModules"
                :titles="['Disponibles', roleToEdit.nombre]"
            >
            </el-transfer>
    </div>
    <div v-else>
            <el-transfer
                @change="handleTransfer"
                :disabled="(permisos['Roles'].editar)? false:true"
                v-model="selectedMods"
                :data="allModules"
                :titles="['Disponibles', 'Nuevo Role']"
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
    computed: {
        selectedMods: {
            get: function(value){
                return this.selectedModulos
            },
            set: function(value){
                this.setSelectedModules(value)
            }
        },
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
        handleTransfer(e){
            console.log(e)
        }
       
    },

  };
</script>
<style lang="scss" scoped>
    
</style>
