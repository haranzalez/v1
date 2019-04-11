<template>

   
    <vue-scroll>
    <CuadresRutasTable></CuadresRutasTable>
    </vue-scroll>
    
</template>

<script>
    import CuadresRutasTable from '@/components/CuadresRutas/table'


    export default {
        namespaced: true,
        components: {
            CuadresRutasTable,
        }
    }
</script>

<style>

</style>
