<template>
    <vue-scroll>
    <AseguradorasTable></AseguradorasTable>
    </vue-scroll>
</template>

<script>

import AseguradorasTable from '@/components/Aseguradoras/table'


export default {
    namespaced: true,
    components: {
        AseguradorasTable,
	}
}
</script>

<style>

</style>