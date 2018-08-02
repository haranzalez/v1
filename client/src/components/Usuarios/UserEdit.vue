<template>
	<div class="page-profile-edit">
		<h2 class="mv-0 animated fadeInDown" :value="usuario">{{ usuario.nombre + ' ' + usuario.apellido }}</h2>
		<el-button class="text-up-15p mb-0 animated slideInUp" type="text" @click="back"><i class="mdi mdi-keyboard-backspace"></i></el-button>

		<el-form ref="form" label-width="120px" :label-position="labelPosition">
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Username">
						<el-input  
                        :value="usuario.username"
						v-model="usuario.username"
					    @input="setUsername"
                        placeholder="Username"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email">
						<el-input  
                        :value="usuario.email"
						v-model="usuario.email"
					    @input="setEmail"
                        placeholder="Email"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Nombre">
						<el-input  
                        :value="usuario.nombre"
						v-model="usuario.nombre"
					    @input="setNombre"
                        placeholder="Nombre"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Apellido">
						<el-input  
                        :value="usuario.apellido"
						v-model="usuario.apellido"
					    @input="setApellido"
                        placeholder="Apellido"/>
					</el-form-item>
				</el-col>
			</el-col>
			
			<el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Cedula">
						<el-input  
                        :value="usuario.cedula"
						v-model="usuario.cedula"
					    @input="setCedula"
                        placeholder="Cedula"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Fijo">
						<el-input  
                        :value="usuario.tel_fijo"
						v-model="usuario.tel_fijo"
					    @input="setTelFijo"
                        placeholder="Fijo"/>
					</el-form-item>
				</el-col>
				
			</el-col>
			<el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Mobil">
						<el-input  
                        :value="usuario.tel_mobil"
					    @input="setTelMobil"
						v-model="usuario.tel_mobil"
                        placeholder="Mobil"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Direccion">
						<el-input  
                        :value="usuario.direccion"
						v-model="usuario.direccion"
					    @input="setDireccion"
                        placeholder="Direccion"/>
					</el-form-item>
				</el-col>
				
				
			</el-col>
			<el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Roles">
						<el-select
						class="select-wide"
						filterable
						multiple
						no-match-text
						v-model="selectedRoles"
						placeholder="Roles...">
							<el-option
							v-if="roles"
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
						v-model="usuario.ciudad" 
                        :value="usuario.ciudad"
					    @input="setCiudad"
                        placeholder="Ciudad"/>
					</el-form-item>
				</el-col>
			</el-col>
			
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
				<el-form-item label="Departamento">
					<el-input  
                        :value="usuario.departamento"
						v-model="usuario.departamento"
					    @input="setCiudad"
                        placeholder="Departamento"/>
				</el-form-item>
			</el-col>
				
			<el-col class="col-p pull-right">
				<el-form-item>
					<el-button  type="text" @click="del(usuario.id)">Eliminar</el-button>
					<el-button  type="primary" @click="onSubmit">Guardar</el-button>
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
			'selected',
		]),
	},
	methods: {
		del(id) {
			this.$confirm('Esta accion eliminara permanentemente el registro. Continuar?', 'Atencion', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancelar',
				type: 'warning',
				center: true
			}).then(() => {
				this.deleteUser(id)
				router.push('/Usuarios')
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Eliminacion cancelada'
				});
			});
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
        ]),
         ...mapActions('users', [
            'fetchRolesList',
			'editUser',
			'deleteUser',
        ]),
		onSubmit() {
			this.editUser(this.selectedRoles)
		},
		back() {
			router.push('/Usuarios')
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
	created(){
		this.selectedRoles = this.selected;
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeLabelPosition);
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
