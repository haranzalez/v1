<template>
    <div>
        <div v-for="(per, key) in permisosDisponibles" :key="per" class="inputGroup">
            <input 
            :disabled="(permisos['Roles'].editar)? false:true"
            :checked="checked[per]"
            type="checkbox" 
            @change="handleCheck($event)"
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
            permisosDisponibles: ['editar', 'crear', 'eliminar'],
            permisosSeleccionados: null,
            pkg: {},
        }
    },
    computed: {
        ...mapState('roles',[
            'rolePermisos',
        ]),
         ...mapState('authentication', [
			'permisos',
		]),
    },
    props: ['permiso', 'subName', 'roleName'],
    methods: {
        ...mapMutations('roles', [
            'setSelectedPermisos',
        ]),
        handleCheck(event){
            this.permisosSeleccionados[event.target.value] = event.target.checked
            this.setSelectedPermisos(this.permisosSeleccionados)
        },
       
    },
     created(){
         console.log(this.checked)
            this.permisosSeleccionados = this.checked
        }
   

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

