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
						<el-input  
                        :value="username"
					    @input="setUsername"
                        placeholder="Username"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email">
						<el-input  
                        :value="email"
					    @input="setEmail"
                        placeholder="Email"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Nombre">
						<el-input  
                        :value="nombre"
					    @input="setNombre"
                        placeholder="Nombre"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Apellido">
						<el-input  
                        :value="apellido"
					    @input="setApellido"
                        placeholder="Apellido"/>
					</el-form-item>
				</el-col>
			</el-col>
			
			<el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Cedula">
						<el-input  
                        :value="cedula"
					    @input="setCedula"
                        placeholder="Cedula"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Fijo">
						<el-input  
                        :value="tel_fijo"
					    @input="setTelFijo"
                        placeholder="Fijo"/>
					</el-form-item>
				</el-col>
				
			</el-col>
			<el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Mobil">
						<el-input  
                        :value="tel_mobil"
					    @input="setTelMobil"
                        placeholder="Mobil"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Direccion">
						<el-input  
                        :value="direccion"
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
                            allow-create
							multiple
                            no-match-text
                            :value="roles"
							placeholder="Roles...">
							<el-option
							v-for="item in roles"
							:key="item.id"
							:label="item.nombre"
							:value="item.nombre">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Ciudad">
						<el-input  
                        :value="ciudad"
					    @input="setCiudad"
                        placeholder="ciudad"/>
					</el-form-item>
				</el-col>
			</el-col>
			
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
				<el-form-item label="Departamento">
					<el-input  
                        :value="ciudad"
					    @input="setCiudad"
                        placeholder="ciudad"/>
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

export default {
	name: 'UserEdit',
	data() {
		return {
			labelPosition: 'right'
		}
	},
	computed:{
		...mapState('users', [
            'usuario',
            'nombre',
            'apellido',
            'cedula',
            'email',
            'tel_fijo',
            'tel_mobil',
            'direccion',
            'ciudad',
            'departamento',
            'username',
            'password',
            'roles',
		]),
	},
	methods: {
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
            'createUser',
        ]),
		onSubmit() {
			this.createUser()
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
@import '../assets/scss/_variables';

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
