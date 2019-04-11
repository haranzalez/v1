<template>

   
    <vue-scroll>
    <ClientesTable></ClientesTable>
    </vue-scroll>
    
</template>

<script>

import ClientesTable from '@/components/Clientes/table'


export default {
    namespaced: true,
    components: {
        ClientesTable,
	}
}
</script>

<style>

</style>
