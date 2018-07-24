<template>
  <el-table
    :data="rolesList"
    style="width: 100%"
    height="250">
    <el-table-column
      fixed
      prop="date"
      label="Date"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="120">
    </el-table-column>
    <el-table-column
      prop="state"
      label="State"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="City"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Address"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="Zip"
      width="120">
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

  export default {
    data() {
      return {
        tableData: []
      }
    },
    computed: {
        ...mapState('roles',[
            'rolesList',
        ]),
    },
    methods: {
        ...mapActions('roles',[
            'fetchRoles'
        ])
    },
    created(){
        this.fetchRoles()
    }
  }
</script>

<style>

</style>
