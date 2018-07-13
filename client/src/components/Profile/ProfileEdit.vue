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
						<el-input :value="usuario.username"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email">
						<el-input :value="usuario.email" type="email"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Nombre">
						<el-input v-model="usuario.nombre"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Apellido">
						<el-input v-model="usuario.apellido"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Birthday">
						<el-date-picker type="date" placeholder="Pick a date" v-model="form.birthday" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Gender">
						<el-radio-group v-model="form.gender">
							<el-radio label="Male" border></el-radio>
							<el-radio label="Female" border></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Telefono">
						<el-input v-model="usuario.email" placeholder="+xx xxx xxx xxxx"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Celular">
						<el-input v-model="usuario.email" placeholder="https://"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Address">
						<el-input v-model="form.address"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Postal code">
						<el-input v-model="form.postalCode"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="City">
						<el-input v-model="form.city"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Country">
						<el-input v-model="form.country"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Roles">
						<el-select
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
						
			<el-col class="col-p pull-right">
				<el-form-item>
					<el-button type="primary" @click="onSubmit">Guardar</el-button>
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
			form: {
				username: 'aShenton',
				email: 'ashenton@mail.com',
				firstName: 'Aurora',
				lastName: 'Shenton',
				birthday: '1991-02-13T23:00:00.000Z',
				phone: '',
				website: '',
				hobbies: [],
				skills: ['JavaScript', 'HTML', 'CSS', 'Vue.js'],
				gender: 'Female',
				address: '',
				city: '',
				country: '',
				postalCode: '',
				aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus posuere libero, nec convallis arcu ullamcorper a. Vestibulum diam neque, egestas scelerisque arcu a, fermentum ornare mauris. Ut venenatis vulputate maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur scelerisque quis turpis ac tempus. Quisque dolor dolor, fermentum nec magna eget, fringilla auctor lacus. Aenean sagittis est ac ligula pharetra, quis imperdiet ante dignissim. Ut vehicula nec nisl a pretium. Quisque faucibus auctor viverra. Sed ultricies convallis magna. In blandit eros id efficitur vulputate. Duis efficitur sollicitudin dui non vehicula. Nullam ut eros fermentum, dapibus metus non, accumsan neque. Mauris sed pellentesque felis. Suspendisse viverra risus sit amet congue consectetur.'
			},
			hobbies: [
				{
					value: 'Model building',
					label: 'Model building'
				}, {
					value: 'Drawing',
					label: 'Drawing'
				}, {
					value: 'Snowboarding',
					label: 'Snowboarding'
				}
			],
			skills: [
				{
					value: 'HTML',
					label: 'HTML'
				}, {
					value: 'CSS',
					label: 'CSS'
				}, {
					value: 'JavaScript',
					label: 'JavaScript'
				}
			],
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
		}
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
