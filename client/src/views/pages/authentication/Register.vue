<template>
	
	<vue-scroll class="register-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
			
					<float-label class="styled">
					<v-text-field class="vtext"  type="text" placeholder="Nombre" 
					@input="setNombre"></v-text-field>
					</float-label>
					<float-label class="styled">
						<v-text-field class="vtext"  type="text" placeholder="Apellido" 
						@input="setApellido"></v-text-field>
					</float-label>
					<float-label class="styled">
						<v-text-field class="vtext"  
						type="text" placeholder="Cedula" 
						
						@input="setCedula"></v-text-field>
					</float-label>
					<float-label class="styled">
						<v-text-field class="vtext"  
						type="email" placeholder="E-mail" 
						
						@input="setEmail"></v-text-field>
					</float-label>
					
			
					<float-label class="styled">
						<v-text-field class="vtext"  
						type="text" placeholder="Telefono" 
						
						@input="setTelFijo"></v-text-field>
						
					</float-label>
					<float-label class="styled">
						<v-text-field class="vtext"  
						type="text" placeholder="Celular" 
						
						@input="setTelMobil"></v-text-field>
					</float-label>
					<float-label class="styled">
					<v-text-field class="vtext"  
					type="text" placeholder="Direccion" 
					
					@input="setDireccion"></v-text-field>
					</float-label>
					<float-label class="styled">
						<v-text-field class="vtext"  
						type="text" placeholder="Ciudad" 
						
						@input="setCiudad"></v-text-field>
					</float-label>
					<float-label class="styled">
						<v-text-field class="vtext"  
						type="text" placeholder="Departamento" 
						
						@input="setDepartamento"></v-text-field>
					</float-label>
				
					<float-label class="styled">
					<v-text-field class="vtext"  
					type="text" placeholder="Username" 
					
					@input="setUsername"></v-text-field>
					
					</float-label>
					<float-label class="styled">
						<v-text-field class="vtext"  
						type="password" placeholder="Password" 
					
						@input="setPassword"></v-text-field>
					</float-label>
					<float-label class="styled">
						<v-text-field class="vtext"  
						type="password" placeholder="Password (Confirmar)"></v-text-field>
					</float-label>

					<div class="flex text-center center pt-30 pb-10">
				
						<el-button type="success" plain size="small" @click="register" class="tada animated">
							Registrarme
						</el-button>
					</div>
					
			
				
				<div class="text-divider mv-10">o</div>
				

				<div class="text-center login-box pt-10">
					Ya se registro? <router-link to="/login">Ingresar</router-link>
				</div>
			</div>
		</div>
	</vue-scroll>
	
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
	name: 'Register',
	data() {
		return {
			active: 1,
		}
	},
	computed:{
		...mapState('authentication', [
			'nombre',
			'apellido',
			'email',
			'cedula',
			'tel_fijo',
			'tel_mobil',
			'direccion',
			'ciudad',
			'departamento',
			'username',
			'password',
		]),
	},

	methods: {
		...mapMutations('authentication', [
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
		...mapActions('authentication', [
			'register'
		]),
		prev() {
      		this.active--;
		},
		next() {
			this.active++;
		},
		
	},
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.register-page {
	background: $text-color;
	margin-left: -30px;
	margin-right: -30px;

	.form-wrapper {
		width: 100%;
	}
	
	.form-box {
		width: 100%;
		max-width: 340px;
		padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;

		a {
			font-size: 14px;
			color: $text-color-accent;
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 80px;
			margin: 0px auto;
			margin-bottom: 50px;
			display: block;
		}

		.signin-btn {
			width: 160px;
		}

		.login-box {
			font-size: 14px;
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.register-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
