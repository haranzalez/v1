<template>
<el-dialog title="Modulos" :visible.sync="moduleListDialogeVisible">
  <el-transfer
    v-model="selected"
    :data="allModules">
  </el-transfer>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setModuleListDialogeVisible(false)">Cancel</el-button>
    <el-button type="primary" @click="setSelectedModules(selected)">Confirm</el-button>
  </span>
</el-dialog>
 
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import HTTP from '../../../../http';
  export default {
    data() {
      return {
        selected: [],
        dialogVisible: false,
        allModules: null,
      };
    },
    computed: {
        ...mapState('roles', [
            'moduleListDialogeVisible',
            'role',
        ]),
    },
    methods: {
        ...mapMutations('roles', [
            'setModuleListDialogeVisible',
            'setSelectedModules',
        ]),
       
    },
    beforeCreate() {
        console.log('fetching')
        HTTP().local.get('api/modulos')
        .then(d => {
            let data = []
            console.log(this.role)
            for(let prop in this.role.modulos){
                this.selected.push(this.role.modulos[prop]['id'])
            }
            for (let prop in d.data) {
                data.push({
                    key:d.data[prop]['id'],
                    label: d.data[prop]['nombre'],
                    disabled: false
                });
            }
            this.allModules = data
        }).catch(err => {
            console.log(err)
        })
    }
  };
</script>