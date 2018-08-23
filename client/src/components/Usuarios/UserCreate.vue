<template>
<div class="page-profile">
	<div class="card-base card-shadow--medium identity" id="boundary">
			<div class="cover"></div>
			<!--<div class="username" v-affix="{parentid: 'affix-container', boundaryid: '', delay:600, offset:0, enable:() => affixEnabled}">-->
			<div class="username">
				<div class="cover-small"></div>
				<div class="avatar-small"><img src="@/assets/images/avatar-default.svg" alt="avatar"></div>
				<span :value="usuario.nombre+' '+usuario.apellido">{{usuario.nombre+' '+usuario.apellido}}</span>
				<div class="colors-box">
					<div v-for="i in 5" :key="i" :class="{'color':true, 'active':colorActive}" :style="{'background':color}"></div>
				</div>
			</div>
			<div class="avatar"><i class="mdi mdi-account"></i></div>
			<img src="@/assets/images/cubierta-1.jpg" id="color-thief" class="color-thief" alt="profile cover">
	</div>
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

.page-profile {
	overflow: auto;

	.identity {
		margin-bottom: 20px;
		position: relative;
		width: 100%;
		height: 370px;

		.cover {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-image: url('../../assets/images/cubierta-1.jpg');
			background-position: 50%;
			background-size: cover;
			background-repeat: no-repeat;
			width: 100%;
			height: 100%;
		}
		.username {
			color: #32325d;
			position: absolute;
			width: 100%;
			height: 50px;
			bottom: 75px;
			left: 0;
			right: 0;
			background: #fff;
			line-height: 50px;
			box-sizing: border-box;
			padding-left: 250px;
			font-size: 25px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);

			.cover-small {
				width: 220px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -220px;
				position: relative;
				left: -250px;
				border-radius: 9px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				background-image: url('../../assets/images/cover-2.jpg');
				background-position: 50%;
				background-size: cover;
				background-repeat: no-repeat;
				-webkit-transition: all .5s;
				transition: all .5s;
			}
			.avatar-small {
				width: 50px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -50px;
				position: relative;
				left: -100px;
				border-radius: 50%;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				transform: rotate(-50deg);
				transition: all .5s;
				background-color: red !important;
			}
			.avatar-small img {
				width: 100%;
				
			}

			&.affix {
				z-index: 99;
				border-radius: 5px;

				.cover-small {
					opacity: 1;
				}

				.avatar-small {
					opacity: 1;
					left: -60px;
					transform: rotate(0deg);
				}
			}

			.colors-box {
				height: 50px;
				background: white; //091c2d
				float: right;

				.color {
					width: 50px;
					height: 50px;
					background: white; //091c2d
					float: right;
					transform: skew(-45deg);
					box-shadow: 1px 0px 1px 0px transparent;
					position: relative;
					right: -25px;
					margin-right: -50px;
					transition: margin-right .75s;

					&.active {
						margin-right: 0;
					}

					&:nth-child(2) { opacity: .8; }
					&:nth-child(3) { opacity: .6; }
					&:nth-child(4) { opacity: .4; }
					&:nth-child(5) { opacity: .2; }
				}
			}
		}
		.avatar {
			border: 6px solid #fff;
			position: absolute;
			bottom: 10px;
			left: 50px;
			width: 180px;
			height: 180px;
			overflow: hidden;
			border-radius: 50%;
			box-sizing: border-box;
			box-shadow: 0px 20px 15px -15px rgba(0, 0, 0, 0.15);
			background-color: #EC205F !important;
			img {
				width: 100%;
			}
			i{
				position: absolute;
				margin: auto;
				display: block;
				color: black;
				top: 50%;
				left: 50%;
				font-size: 197px;
				transform: translate(-50%, -42%);
				color: white;
			}
		}

		.color-thief {
			display: block;
			width: 100px;
			visibility: hidden;
			z-index: -999999;
			position: absolute;
		}
	}

	.info {
		padding: 24px 32px;
	}
}

@media (max-width: 768px) {
	.page-profile {
		.identity {
			height: auto;

			.avatar {
				bottom: inherit;
				top: 10px;
				left: 50%;
				width: 100px;
				margin-left: -50px;
				height: 100px;
				border-width: 3px;
			}

			.username {
				position: inherit;
				padding: 10px ;
				margin: 0;
				top: inherit;
				left: inherit;
				z-index: 1;
				right: inherit;
				text-align: center;
				bottom: inherit;
				white-space: inherit;
				line-height: inherit;
				height: auto;
				margin-top: 120px;
				width: 90%;
				margin-left: 5%;
				margin-bottom: 10px;
				border-radius: 50px;

				.colors-box {
					display: none;
				}

				.avatar-small {
					display: none;
				}

				.cover-small {
					display: none;
				}
			}
		}

		.info {
			padding: 8px 16px;
		}
	}
}
</style>

<style lang="scss">
.page-profile {
	.el-tabs:not(.el-tabs--border-card) {
		.el-tabs__item:not(.is-active) {
			color: #32325d;
		}
	}
}
</style>
