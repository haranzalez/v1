<template>

   
    <vue-scroll>
    <ServiciosTable></ServiciosTable>
    </vue-scroll>
    
</template>

<script>

import ServiciosTable from '@/components/Servicios/table'


export default {
    namespaced: true,
    components: {
        ServiciosTable,
	}
}
</script>

<style>

</style>
