<template>
	<div class="login-container">
		<h1>Login</h1>
		<form @submit.prevent="login">
			<input type="text" v-model="username" placeholder="Usuário" />
			<input type="password" v-model="password" placeholder="Senha" />
			<button type="submit">Entrar</button>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: '',
		};
	},
	methods: {
		login() {
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
</style>
