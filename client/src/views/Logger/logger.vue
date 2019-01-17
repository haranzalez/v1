<template>
    <vue-scroll>
    <LoggerTable></LoggerTable>
    </vue-scroll>
</template>

<script>

import LoggerTable from '@/components/Logger/table'


export default {
    namespaced: true,
    components: {
        LoggerTable,
	}
}
</script>

<style>

</style>