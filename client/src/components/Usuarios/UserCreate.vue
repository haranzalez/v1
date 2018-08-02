<template>
	<div class="page-profile-edit">
		<h2 class="mv-0 animated fadeInDown">Crear Usuario</h2>
		<el-button class="text-up-15p mb-0 animated slideInUp" type="text" @click="back"><i class="mdi mdi-keyboard-backspace"></i></el-button>

		<el-form ref="form" label-width="120px" :label-position="labelPosition">
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Username">
						<el-input  
					    @input="setUsername"
                        placeholder="Username"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email">
						<el-input  
					    @input="setEmail"
                        placeholder="Email"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Nombre">
						<el-input  
					    @input="setNombre"
                        placeholder="Nombre"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Apellido">
						<el-input  
					    @input="setApellido"
                        placeholder="Apellido"/>
					</el-form-item>
				</el-col>
			</el-col>
			
			<el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Cedula">
						<el-input  
					    @input="setCedula"
                        placeholder="Cedula"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Fijo">
						<el-input  
					    @input="setTelFijo"
                        placeholder="Fijo"/>
					</el-form-item>
				</el-col>
				
			</el-col>
			<el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Mobil">
						<el-input  
					    @input="setTelMobil"
                        placeholder="Mobil"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Direccion">
						<el-input  
					    @input="setDireccion"
                        placeholder="Direccion"/>
					</el-form-item>
				</el-col>
				
				
			</el-col>
			<el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Roles">
						<el-select
							v-model="selectedRoles"
							class="select-wide"
                            filterable
                            allow-create
							multiple
                            no-match-text
							placeholder="Roles...">
							<el-option
							v-for="item in roles"
							:key="item.id"
							:label="item.nombre"
							:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Ciudad">
						<el-input  
					    @input="setCiudad"
                        placeholder="ciudad"/>
					</el-form-item>
				</el-col>
			</el-col>
			
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
				<el-form-item label="Departamento">
					<el-input  
					    @input="setDepartamento"
                        placeholder="Departamento"/>
				</el-form-item>
			</el-col>
				
			<el-col class="col-p pull-right">
				<el-form-item>
					<el-button  type="primary" @click="onSubmit">Crear</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import router from '../../router';

export default {
	name: 'UserEdit',
	data() {
		return {
			labelPosition: 'right',
			selectedRoles: [],
		}
	},
	computed:{
		...mapState('users', [
			'usuario',
			'roles',
		]),
	},
	methods: {
		back() {
			router.push('/Usuarios')
		},
        ...mapMutations('users', [
            'setNombre',
            'setApellido',
            'setCedula',
            'setEmail',
            'setTelFijo',
            'setTelMobil',
            'setDireccion',
            'setCiudad',
            'setDepartamento',
            'setUsername',
			'setPassword',
			'setRoles',
        ]),
         ...mapActions('users', [
            'fetchRolesList',
			'createUser',
        ]),
		onSubmit() {
			this.createUser(this.selectedRoles)
		},
		resizeLabelPosition() {
			if(window.innerWidth <= 768) {
				this.labelPosition = 'top'	
			}
		},
	},
	mounted() {
		this.resizeLabelPosition();
		window.addEventListener('resize', this.resizeLabelPosition);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeLabelPosition);
    },
    created() {
        this.fetchRolesList()
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-profile-edit {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
		padding: 0 10px;
		box-sizing: border-box;
	}
	.select-wide {
		width: 100%;
	}
	.pull-right {
		text-align: right;
	}
	.text-up-15p{
		font-size: 15pt;
	}
}
</style>
