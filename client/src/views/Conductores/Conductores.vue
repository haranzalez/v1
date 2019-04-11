<template>

   
    <vue-scroll>
    <ConductoresTable></ConductoresTable>
    </vue-scroll>
    
</template>

<script>

import ConductoresTable from '@/components/Conductores/table'


export default {
    namespaced: true,
    components: {
        ConductoresTable,
	}
}
</script>

<style>

</style>
