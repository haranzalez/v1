<template>
	
	<vue-scroll class="register-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				
				<float-label class="styled">
					<v-text-field class="vtext"  type="text" placeholder="Nombre" 
					:value="nombre"
					@input="setNombre"></v-text-field>
					
				</float-label>
				<float-label class="styled">
					<v-text-field class="vtext"  type="text" placeholder="Apellido" 
					:value="apellido"
					@input="setApellido"></v-text-field>
					
				</float-label>
				<float-label class="styled">
					<v-text-field class="vtext"  
					type="email" placeholder="E-mail" 
					:value="email"
					@input="setEmail"></v-text-field>
				</float-label>
				<float-label class="styled">
					<v-text-field class="vtext"  
					type="text" placeholder="Username" 
					:value="username"
					@input="setUsername"></v-text-field>
					
				</float-label>
				<float-label class="styled">
					<v-text-field class="vtext"  
					type="password" placeholder="Password" 
					:value="password"
					@input="setPassword"></v-text-field>
				</float-label>
				<float-label class="styled">
					<v-text-field class="vtext"  
					type="password" placeholder="Password (Confirmar)"></v-text-field>
				</float-label>
				
				<div class="flex text-center center pt-30 pb-20">			
					<el-button plain size="small" @click="register" class="signin-btn tada animated">
						Registrarme
					</el-button>
				</div>

				<div class="text-center login-box pt-10">
					Ya se registro? <a>Ingresar</a>
				</div>
			</div>
		</div>
	</vue-scroll>
	
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
	name: 'Register',
	computed:{
		...mapState('authentication', [
			'nombre',
			'apellido',
			'email',
			'username',
			'password',
			'success',
			'warning',
		]),
		...mapGetters('index', [
			'successMessage',
			'warningMessage',
		]),
	},

	methods: {
		...mapMutations('authentication', [
			'setNombre',
			'setApellido',
			'setEmail',
			'setUsername',
			'setPassword',
		]),
		...mapActions('authentication', [
			'register'
		]),
		
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
