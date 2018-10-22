<template>

   
    <vue-scroll>
    <CuadroViajesTable></CuadroViajesTable>
    </vue-scroll>
    
</template>

<script>
    import CuadroViajesTable from '@/components/CuadroViajes/table'


    export default {
        namespaced: true,
        components: {
            CuadroViajesTable,
        }
    }
</script>

<style>

</style>
