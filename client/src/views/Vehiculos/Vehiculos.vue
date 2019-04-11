<template>

   
    <vue-scroll>
    <VehiculosTable></VehiculosTable>
    </vue-scroll>
    
</template>

<script>

import VehiculosTable from '@/components/Vehiculos/table'


export default {
    namespaced: true,
    components: {
        VehiculosTable,
	}
}
</script>

<style>

</style>
