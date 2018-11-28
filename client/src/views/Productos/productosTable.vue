<template>

   
    <vue-scroll>
    <ProductosTable></ProductosTable>
    </vue-scroll>
    
</template>

<script>

import ProductosTable from '@/components/Productos/table'


export default {
    namespaced: true,
    components: {
        ProductosTable,
	}
}
</script>

<style>

</style>
