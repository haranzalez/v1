<template>
	<div class="page-profile-edit">
		<div class="label-switch-box">
			<span>Etiquetas: </span>
			<el-radio-group v-model="labelPosition" size="small">
				<el-radio-button label="left">Izquierda</el-radio-button>
				<el-radio-button label="right">Derecha</el-radio-button>
				<el-radio-button label="top">Arriba</el-radio-button>
			</el-radio-group>
		</div>

		<el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition">
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Username">
						<el-input :disabled="usuario.roles[0].nombre !== 'Admin'" :value="usuario.username"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email">
						<el-input :disabled="usuario.roles[0].nombre !== 'Admin'" :value="usuario.email" type="email"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Nombre">
						<el-input :disabled="usuario.roles[0].nombre !== 'Admin'" v-model="usuario.nombre"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Apellido">
						<el-input :disabled="usuario.roles[0].nombre !== 'Admin'" v-model="usuario.apellido"/>
					</el-form-item>
				</el-col>
			</el-col>
			
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Telefono Fijo">
						<el-input :disabled="usuario.roles[0].nombre !== 'Admin'" v-model="usuario.tel_fijo" placeholder="xxx xxxx"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Celular">
						<el-input :disabled="usuario.roles[0].nombre !== 'Admin'" v-model="usuario.tel_mobil" placeholder="https://"/>
					</el-form-item>
				</el-col>
			</el-col>

			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Direccion">
						<el-input :disabled="usuario.roles[0].nombre !== 'Admin'" v-model="usuario.direccion"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Roles">
						<el-select
						    :disabled="usuario.roles[0].nombre !== 'Admin'"
							class="select-wide"
							:value="usuario.roles"
							multiple
							filterable
							allow-create
							default-first-option
							placeholder="Choose tags for your skills">
							<el-option
							v-for="item in usuario.roles"
							:key="item.id"
							:label="item.nombre"
							:value="item.nombre">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				
			</el-col>
			
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Ciudad">
						<el-input :disabled="usuario.roles[0].nombre !== 'Admin'" v-model="usuario.ciudad"/>
					</el-form-item>
				</el-col>
			</el-col>
			
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
				<el-form-item label="Departamento">
					<el-input :disabled="usuario.roles[0].nombre !== 'Admin'" v-model="usuario.departamento"/>
				</el-form-item>
			</el-col>
				
			<el-col class="col-p pull-right">
				<el-form-item>
					<el-button :disabled="usuario.roles[0].nombre !== 'Admin'" type="primary" @click="onSubmit">Guardar</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
	name: 'ProfileEdit',
	data() {
		return {
			labelPosition: 'right'
		}
	},
	computed:{
		...mapState('authentication', [
			'usuario',
		]),
	},
	methods: {
		onSubmit() {
			console.log('submit!');
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
}
</style>
