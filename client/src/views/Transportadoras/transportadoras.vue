<template>

   
    <vue-scroll>
    <TransportadorasTable></TransportadorasTable>
    </vue-scroll>
    
</template>

<script>

import TransportadorasTable from '@/components/Transportadoras/table'


export default {
    namespaced: true,
    components: {
        TransportadorasTable,
	}
}
</script>

<style>

</style>