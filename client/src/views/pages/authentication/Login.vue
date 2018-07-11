<template>
	<vue-scroll class="login-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				
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
				
				<div class="flex">
					<div class="box grow"><el-checkbox>Recordarme </el-checkbox></div>
					<div class="box grow text-right"><router-link to="/forgot-password">Olvido contraseña?</router-link></div>
				</div>

				<div class="flex text-center center pt-30 pb-10">			
					<el-button plain size="small" @click="login" class="login-btn tada animated">
						LOGIN
					</el-button>
				</div>

				<div class="text-divider mv-10">o</div>

				<div class="text-center signin-box pt-20">
					No se a registrado? <router-link to="/register">Registrarse</router-link>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
	name: 'Login',
	computed: {
		...mapState('authentication', [
			'username',
			'password',
		]),
	},
	methods: {
		...mapMutations('authentication', [
			'setUsername',
			'setPassword',
		]),
		...mapActions('authentication', [
			'login'
		]),
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.login-page {
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
			margin-bottom: 30px;
			display: block;
		}

		.login-btn ,
		.social-btn {
			width: 160px;

			&.google {
				margin-bottom: 10px;
				background-color: #d73d32;
				color: white;

				&:hover {
					border-color: #d73d32;
				}
			}
			&.facebook {
				background-color: #3f5c9a;
				color: white;

				&:hover {
					border-color: #3f5c9a;
				}
			}
		}

		.signin-box {
			font-size: 14px;
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.login-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
