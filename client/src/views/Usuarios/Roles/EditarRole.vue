<template>
    <vue-scroll>
        <div class="ctn">
            <formulario></formulario>
        </div>
    </vue-scroll>
    
    
</template>

<script>
import Formulario from '@/components/Usuarios/Roles/RoleEdit'

export default {
    namespaced: true,
    components: {
	    Formulario,
	}

}
</script>

<style>

</style>
