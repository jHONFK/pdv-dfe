<template>
	<div class="login-container">
		<h1>Login</h1>
			<div class="form">
				<InputText v-model="username" placeholder="Usuário" />
				<InputText type="password" v-model="password" placeholder="Senha" />
				<Button @click="login" label="Entrar" icon="pi pi-sign-in" class="p-button-success" />
			</div>


	</div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'


export default {
	components: {
		InputText,
		Button,
	},
	data() {
		return {
			username: '',
			password: '',
		};
	},
	methods: {
		login() {
			console.log(this.username, this.password);
			if (this.username === 'admin' && this.password === 'admin') {
				this.$router.push('/dashboard');
			} else {
				alert('Credenciais inválidas!');
			}
		},
	},
};
</script>

<style scoped>
.login-container {
	max-width: 400px;
	margin: 100px auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
}

div .form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>
