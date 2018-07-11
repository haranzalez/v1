<template>
	<vue-scroll class="forgot-password-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				
				<float-label class="styled">
					<v-text-field class="vtext"  
					type="email" placeholder="E-mail" 
					:value="email"
					@input="setEmail"></v-text-field>
				</float-label>

				<div class="flex text-center center pt-20 pb-10">			
					<el-button plain size="small" @click="requestPasswordChange" class="send-btn tada animated">
						ENVIAR LINK
					</el-button>
				</div>

				<div class="text-divider mv-10">o</div>

				<div class="text-center signin-box pt-20">
					<router-link to="/login">Ingresar</router-link>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
	name: 'ForgotPassword',
	computed: {
		...mapState('authentication', [
			'email',
			'ip',
		]),
	},
	methods: {
		...mapMutations('authentication', [
			'setEmail',
		]),
		...mapActions('authentication', [
			'requestPasswordChange'
		]),
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.forgot-password-page {
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

		.send-btn {
			width: 160px;
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.forgot-password-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
