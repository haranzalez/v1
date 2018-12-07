<template>
    <div>
        <div v-for="(per, key) in availablePermisos" :key="per" class="inputGroup">
            <input 
            :disabled="(permisos['Roles'].editar)? false:true"
            :checked="permisosOps[roleToEdit.nombre][modName][subName][per]"
            type="checkbox" 
            @change="handleCheck($event, permisosOps[roleToEdit.nombre][modName][subName]['subId'])"
            :value="per"
            >
            <label :for="per">{{per}}</label>
        </div>
        
    </div>
    
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return {
            
            permisosSeleccionados: {},
            pkg: {},
        }
    },
    computed: {
        permisosDisponibles(){
            console.log(this.availablePermisos[this.roleToEdit.nombre])
            return ['editar', 'crear', 'eliminar']
        },
        ...mapState('roles',[
            'roleToEdit',
            'permisosOps',
            'availablePermisos',
        ]),
         ...mapState('authentication', [
			'permisos',
		]),
    },
    props: ['modName', 'subName'],
    methods: {
        ...mapMutations('roles', [
            'setSelectedPermisos',
        ]),
         ...mapActions('roles', [
            'setPermisos',
        ]),
        handleCheck(event, subid){
            this.setSelectedPermisos({
                op:event.target.value,
                value: event.target.checked
            })
            this.setPermisos(subid)
            console.log(event.target.checked, subid)
        },
    },
 
   

}
</script>

<style lang="scss" scoped>
.inputGroup {
    background-color: #fff;
    display: block;
    margin: 10px 0;
    position: relative;

   
  }
</style>

