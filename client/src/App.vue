<template>
	<div class="layout-container flex justify-center" :class="{
		'column':navPos === 'top' || navPos === 'bottom', 
		'boxed':boxed, 
		'footer-above':footer === 'above',
		'content-only':!navPos
	}">

		<transition name="fade">
			<div class="splash-screen" v-if="splashScreen">
				<div class="wrap">
					
<svg id="truck" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="145px" height="68px" viewBox="0 0 145 68">
<defs>
<g id="tank_0_Layer6_0_FILL">
<path id="body" fill="#CCCCCC" stroke="none" d="
M 57.95 -15
L 57.95 -7 62.95 -7 62.95 0 26.55 0
Q 7.15 7.15 1.9 25.1 -0.45 30.55 0.1 40.8 0.6 51.05 8.8 60.95 17.4 68.75 29.55 71
L 173.5 71
Q 194.3 67.55 201.15 46.9 208.1 8.1 173.5 0
L 91.95 0 91.95 -7 96.95 -7 96.95 -15 57.95 -15 Z"/>
</g>

<g id="tank_0_Layer3_0_FILL">
<path id="body" fill="#CCCCCC" stroke="none" d="
M 100.1 19.95
L 95.1 18.4
Q 89 16.2 87.75 15.15 87.85 19 86.35 22.55 84.9 26.05 84.05 29.45 83.25 32.85 83.45 35.55 83.65 39.05 86.1 42.45 88.85 46.25 93.15 47.65 94.3 48 95.45 48.2 97.5 48.5 99.65 48.2 101.3 47.95 102.95 47.35 108.05 45.5 110.55 40.95 113.1 36.45 111.8 31.4 110.5 26.35 107.05 23.5 104.4 21.3 100.1 19.95 Z"/>
</g>

<g id="tank_0_Layer2_0_FILL">
<path id="body" fill="#FFFFFF" stroke="none" d="
M 99.55 19.05
L 94.55 17.5
Q 88.45 15.3 87.2 14.25 87.3 18.1 85.8 21.65 84.35 25.15 83.5 28.55 82.7 31.95 82.9 34.65 83.1 38.15 85.55 41.55 88.3 45.35 92.6 46.75 97.3 48.3 102.15 46.5 107.25 44.65 109.7 40.05 112.15 35.65 111 30.35 109.95 25.45 106.5 22.6 103.85 20.4 99.55 19.05 Z"/>
</g>

<g id="tank_0_Layer1_0_FILL">
<path id="body" fill="#000000" stroke="none" d="
M 99.55 20.35
L 95 18.95
Q 89.4 16.95 88.25 15.95 88.35 19.5 87 22.75 85.65 25.95 84.9 29.05 84.15 32.15 84.35 34.65 84.5 37.85 86.75 40.95 89.25 44.45 93.2 45.7 97.5 47.15 101.95 45.5 106.6 43.8 108.85 39.6 111.1 35.55 110.05 30.7 109.1 26.2 105.95 23.6 103.5 21.6 99.55 20.35 Z"/>
</g>

<g id="tank_0_Layer0_0_FILL">
<path id="body" fill="#FF0000" stroke="none" d="
M 102.95 29.45
L 106.6 29.45 106.65 38.3 108.85 38.4
Q 109.95 37.6 110 36.1
L 110.2 37.15
Q 110.75 38.35 111.8 38.4 113.5 38.5 117.6 38.5
L 117.6 43.5 121.45 45.75 121.55 25.6 112 25.5
Q 111.45 25.6 110.65 26.25 109.8 26.9 109.7 28.2 109.6 29.45 109.5 27.85 109.4 26.2 108.95 26 106.65 25.75 104.85 25.8 103.05 25.8 102.65 25.85
L 102.75 15.95 98.7 19 98.7 38.3 102.95 38.2 102.95 29.45
M 117.8 34.65
L 114.1 34.75
Q 113.2 31.95 114 29.45
L 117.8 29.45 117.8 34.65 Z"/>
</g>

<g id="wheel_0_Layer0_0_FILL">
<path id="wheel--front" fill="#000000" stroke="none" d="
M 33 16.5
Q 33 9.65 28.15 4.8 23.35 0 16.5 0 9.65 0 4.8 4.8 0 9.65 0 16.5 0 23.35 4.8 28.15 9.65 33 16.5 33 23.35 33 28.15 28.15 33 23.35 33 16.5
M 22.3 10.65
Q 24.75 13.05 24.75 16.5 24.75 19.9 22.3 22.3 19.9 24.75 16.5 24.75 13.05 24.75 10.65 22.3 8.25 19.9 8.25 16.5 8.25 13.05 10.65 10.65 13.05 8.25 16.5 8.25 19.9 8.25 22.3 10.65 Z"/>
</g>

<g id="body_0_Layer0_0_FILL">
<path id="body" fill="#000000" stroke="none" d="
M 206.35 106.7
L 206.35 78.7 0.4 78.7
Q -1.5 96.05 5.4 102.7
L 19.65 106.7
Q 19.4 105.25 19.4 103.7 19.4 95.85 24.95 90.25 30.55 84.7 38.4 84.7 46.25 84.7 51.8 90.25 57.4 95.85 57.4 103.7 57.4 105.25 57.2 106.7
L 60.6 106.7
Q 60.35 105.25 60.35 103.7 60.35 95.85 65.9 90.25 71.5 84.7 79.35 84.7 87.2 84.7 92.75 90.25 98.35 95.85 98.35 103.7 98.35 105.25 98.15 106.7
L 206.35 106.7 Z"/>

<path id="body" fill="#FF0000" stroke="none" d="
M 288.5 81.7
L 287.35 54.7
Q 281.25 16.45 271.35 8.7 257.3 -3.8 207.35 1.7
L 207.35 78.7 206.35 78.7 206.35 106.7 211.5 106.7
Q 211.35 105.5 211.35 104.2 211.35 95.7 217.35 89.7 223.35 83.7 231.85 83.7 240.35 83.7 246.35 89.7 252.35 95.7 252.35 104.2 252.35 105.5 252.25 106.7
L 276.35 106.7 288.5 81.7
M 263.85 23.6
Q 268.35 23.6 268.35 28.1
L 268.35 47.1
Q 268.35 51.65 268.35 59.8
L 234.9 51.65
Q 230.35 51.65 230.35 47.1
L 230.35 28.1
Q 230.35 23.6 234.9 23.6
L 263.85 23.6 Z"/>
</g>
</defs>

<g transform="matrix( 0.5029296875, 0, 0, 0.5029296875, -82,-68) ">
<g transform="matrix( 1, 0, 0, 1, 163.05,150.2) ">
<g transform="matrix( 1, 0, 0, 1, 0,0) ">
<use xlink:href="#tank_0_Layer6_0_FILL"/>
</g>

<g transform="matrix( 1, 0, 0, 1, 0,0) ">
<use xlink:href="#tank_0_Layer3_0_FILL"/>
</g>

<g transform="matrix( 1, 0, 0, 1, 0,0) ">
<use xlink:href="#tank_0_Layer2_0_FILL"/>
</g>

<g transform="matrix( 1, 0, 0, 1, 0,0) ">
<use xlink:href="#tank_0_Layer1_0_FILL"/>
</g>

<g transform="matrix( 1, 0, 0, 1, 0,0) ">
<use xlink:href="#tank_0_Layer0_0_FILL"/>
</g>
</g>

<g transform="matrix( 1, 0, 0, 1, 185.6,239.15) ">
<g transform="matrix( 1, 0, 0, 1, 0,0) ">
<use xlink:href="#wheel_0_Layer0_0_FILL"/>
</g>
</g>

<g transform="matrix( 1, 0, 0, 1, 226.55,239.15) ">
<g transform="matrix( 1, 0, 0, 1, 0,0) ">
<use xlink:href="#wheel_0_Layer0_0_FILL"/>
</g>
</g>

<g transform="matrix( 1, 0, 0, 1, 379.55,239.15) ">
<g transform="matrix( 1, 0, 0, 1, 0,0) ">
<use xlink:href="#wheel_0_Layer0_0_FILL"/>
</g>
</g>

<g transform="matrix( 1, 0, 0, 1, 164.2,150.5) ">
<g transform="matrix( 1, 0, 0, 1, 0,0) ">
<use xlink:href="#body_0_Layer0_0_FILL"/>
</g>
</g>
</g>
</svg>

					<h3 class="m10">LLegamos!</h3>
				</div>
			</div>
		</transition>

		<vertical-nav 
			:position="navPos" 
			:collapse-nav="collapseNav" 
			:open-sidebar.sync="openSidebar" 
			@collapse-nav-toggle="collapseNav = !collapseNav" 
			@push-page="closeSidebar" 
			v-if="navPos === 'left'"/>

		<div class="container flex column box grow">

			<div class="header" v-if="toolbar === 'top'">
				<Toolbar @toggle-sidebar="openSidebar = !openSidebar" :menu-burger="navPos"/>
			</div>
			<horizontal-nav :position="navPos" @push-page="closeSidebar" v-if="navPos === 'top'"/>
			<div class="header" v-if="toolbar === 'bottom'">
				<Toolbar @toggle-sidebar="openSidebar = !openSidebar" :menu-burger="navPos"/>
			</div>

			<div class="main box grow flex">
				<span class="main-out-border--top-left" v-if="roundedCorners"></span>
				<span class="main-out-border--top-right" v-if="roundedCorners"></span>
				<span class="main-out-border--bottom-left" v-if="roundedCorners"></span>
				<span class="main-out-border--bottom-right" v-if="roundedCorners"></span>
				<transition :name="viewAnimation" mode="out-in">
					<router-view class="view box grow"/>
				</transition>
			</div>

			<horizontal-nav :position="navPos" @push-page="closeSidebar" v-if="navPos === 'bottom'" style="margin-bottom:0;"/>
			
			<Footer v-if="footer === 'below'" :position="footer"/>
		</div>

		<vertical-nav 
			:position="navPos" 
			:collapse-nav="collapseNav" 
			:open-sidebar.sync="openSidebar" 
			@collapse-nav-toggle="collapseNav = !collapseNav" 
			@push-page="closeSidebar" 
			v-if="navPos === 'right'"/>

		<Footer v-if="footer === 'above'" :position="footer"/>

		<layout-picker :position="navPos" v-if="isLogged"/>
	</div>
</template>


<script> 
import { detect } from 'detect-browser'
const browser = detect()
// @ is an alias to /src
import HorizontalNav from '@/core/horizontal-nav.vue'
import VerticalNav from '@/core/vertical-nav.vue'
import Toolbar from '@/core/toolbar.vue'
import Footer from '@/core/footer.vue'
import LayoutPicker from '@/components/layout-picker.vue'

export default {
	name: 'App',
	data() {
		return {
			collapseNav: false,
			openSidebar: false,
			innerWidth: 0
		}
	},
	computed: {
		navPos() {
			if(this.innerWidth <= 768 && (this.$store.getters['layout/navPos'] === 'top' || this.$store.getters['layout/navPos'] === 'bottom')) {
				return 'left'	
			}
			return this.$store.getters['layout/navPos']
		},
		toolbar() {
			return this.$store.getters['layout/toolbar']
		},
		footer() {
			return this.$store.getters['layout/footer']
		},
		boxed() {
			return this.$store.getters['layout/boxed']
		},
		roundedCorners() {
			return this.$store.getters['layout/roundedCorners']
		},
		viewAnimation() {
			return this.$store.getters['layout/viewAnimation'] || 'none'
		},
		splashScreen() {
			return this.$store.getters['layout/splashScreen']
		},
		isLogged() {
			return this.$store.getters['layout/isLogged']
		}
	},	
	methods: {
		resizeOpenNav() {
			this.innerWidth = window.innerWidth
			if(window.innerWidth <= 768) {
				this.collapseNav = false	
			}
		},
		closeSidebar() {
			this.openSidebar = false
		}
	},
	components: {
		HorizontalNav,
		VerticalNav,
		Toolbar,
		Footer,
		LayoutPicker
	},
	created() {
		if(browser.name)
			document.getElementsByTagName("html")[0].classList.add(browser.name)
	},
	mounted() {
		this.resizeOpenNav()
		window.addEventListener('resize', this.resizeOpenNav);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeOpenNav);
	}
}
</script>

<style lang="scss">
@import './assets/scss/_variables';
@import './assets/scss/_mixins';

.layout-container {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
	background: $background-color;

	.container {
		overflow: hidden;
		
		.header {
			height: 60px;
			margin-bottom: 20px;
			margin-top: 10px;
			margin-left: 30px;
			margin-right: 30px;
		}

		.main {
			position: relative;
			overflow: hidden;
			padding: 0 30px;
		}

		.view {
			padding: 20px;
			padding-bottom: 10px;
			padding-top: 0px;
			box-sizing: border-box;
			transition: all .4s cubic-bezier(.55,0,.1,1);
			backface-visibility: hidden;
		    /*-webkit-perspective: 1000px;*/

		}
		.fade-top-in-out-enter { opacity: 0; transform: translate(0, 30px); }
		.fade-top-in-out-leave-active { opacity: 0; transform: translate(0, 30px); }
		
		.fade-top-enter { opacity: 0; transform: translate(0, 30px); }
		.fade-top-leave-active { opacity: 0; transform: translate(0, -30px); }
		
		.fade-bottom-in-out-enter { opacity: 0; transform: translate(0, -30px); }
		.fade-bottom-in-out-leave-active { opacity: 0; transform: translate(0, -30px); }
		
		.fade-bottom-enter { opacity: 0; transform: translate(0, -30px); }
		.fade-bottom-leave-active { opacity: 0; transform: translate(0, 30px); }
		
		.fade-left-enter { opacity: 0; transform: translate(30px, 0); }
		.fade-left-leave-active { opacity: 0; transform: translate(-30px, 0); }
		
		.fade-right-enter { opacity: 0; transform: translate(-30px, 0); }
		.fade-right-leave-active { opacity: 0; transform: translate(30px, 0); }
		
		.fade-enter { opacity: 0; }
		.fade-leave-active { opacity: 0; }
	

		.main-out-border {
			&--top-left, &--top-right {
				background: linear-gradient($background-color, rgba(230,235,241,0));
				height: 16px;
				position: absolute;
				width: 8px;
				z-index: 1;
				top: 4px;
			}
			&--bottom-left, &--bottom-right {
				background: linear-gradient(rgba(230,235,241,0), $background-color);
				height: 16px;
				position: absolute;
				width: 8px;
				z-index: 1;
				bottom: 4px;
			}

			&--top-left, &--bottom-left {
				left: 42px;
				
				&::after {
					content: "";
					height: 5px;
					position: absolute;
					right: -4px;
					top: -4px;
					width: 12px;
					box-shadow: 8px 0px 0px 0px $background-color inset;
					border-top-left-radius: 5px;
				}
			}
			&--top-right, &--bottom-right {
				right: 42px;

				&::after {
					content: "";
					height: 5px;
					left: -4px;
					position: absolute;
					top: -4px;
					width: 12px;
					box-shadow: -8px 0px 0px 0px $background-color inset;
					border-top-right-radius: 5px;
				}
			}

			&--bottom-left:after {
				border-radius: 0;
				border-bottom-left-radius: 5px;
			}
			&--bottom-right:after {
				border-radius: 0;
				border-bottom-right-radius: 5px;
			}

			&--bottom-left, &--bottom-right {
				&::after {
					top: initial;
					bottom: -4px;
				}
			}	
		}

	}

	&.boxed {
		max-width: 1300px;
		margin: 0 auto;
		box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.15), 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
	}

	&.footer-above {
		padding-bottom: 40px;
		position: relative;
	}

	&.content-only {
		.container {
			.main-out-border--top-left,.main-out-border--top-right ,
			.main-out-border--bottom-left,.main-out-border--bottom-right {
				display: none;
			}	
		}
	}
}

html:not(.ie) {
	.layout-container {
		.container {
			max-width: 1920px;
		}
	}
}

@media (min-width: 1920px) {
	.layout-container:not(.boxed) {		
		&.column {
			.container {
				margin: 0 auto;
			}
		}
	}
}

@media (max-width: 768px) {
	.layout-container {
		.container {
			/*width: 100%;
			max-width: 100%;
			height: 100%;
			max-height: 100%;*/

			.header {
				height: 50px;
				background: #fff;
				box-shadow: 0px -20px 10px 20px rgba(0, 0, 0, 0.25);
				margin: 0;
				margin-bottom: 5px;

				.toggle-sidebar {
					box-shadow: none !important;
				}

				.search-box {
					& > .el-autocomplete {
						box-shadow: none !important;
					}
				}
			}

			.main {
				padding: 0 5px;
			}

			
			.view {
				//padding: 5px;
				max-width: 100%;
				padding: 15px;
				padding-left: 15px;
				padding-right: 15px;
			}
			.main-out-border--top-left,.main-out-border--top-right ,
			.main-out-border--bottom-left,.main-out-border--bottom-right {
				display: none;
			}
		}
	}
}


.fade-enter-active, .fade-leave-active {
	transition: opacity 0.5s ease-out;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
.m10{
			margin-top:55px !important;
			margin-right: 45px !important;
		}
</style>
