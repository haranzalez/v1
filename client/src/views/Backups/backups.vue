<template>
    <vue-scroll>
    <BakcupsTable></BakcupsTable>
    </vue-scroll>
</template>

<script>

import BakcupsTable from '@/components/Backups/table'


export default {
    namespaced: true,
    components: {
        BakcupsTable,
	}
}
</script>

<style>

</style>