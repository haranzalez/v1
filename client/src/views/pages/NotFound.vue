<template>
	<div class="not-found">
		<div class="msg-box">
			<h1 class="animated fadeInDown">404 Recurso no encontrado.</h1>
			<h2 class="animated fadeInUp">
				Hmmmm..<br>Al parecer esta pagina no existe.
			</h2>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NotFound'
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
@import '../../assets/scss/_mixins';

.msg-box {
	max-width: 240px;
	margin: 50px auto;

	h1 {
		@include text-bordered-shadow();
	}
}
</style>

