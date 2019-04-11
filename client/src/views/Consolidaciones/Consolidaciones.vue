<template>

   
    <vue-scroll>
    <ConsolidacionesTable></ConsolidacionesTable>
    </vue-scroll>
    
</template>

<script>

import ConsolidacionesTable from '@/components/Consolidaciones/table'


export default {
    namespaced: true,
    components: {
        ConsolidacionesTable,
	}
}
</script>

<style>

</style>

