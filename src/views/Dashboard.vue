<template>
	<div class="dashboard-container">
		<h1>Dashboard</h1>
		<nav>
			<ul>
				<li><router-link to="/vendas">Vendas</router-link></li>
				<li><router-link to="/produtos">Produtos</router-link></li>
				<li><router-link to="/clientes">Clientes</router-link></li>
				<li><router-link to="/relatorios">Relatórios</router-link></li>
				<li><router-link to="/">Sair</router-link></li>
			</ul>
		</nav>
		<router-view></router-view> <!-- Para renderizar os componentes filhos -->
	</div>
</template>

<script>
export default {
	name: 'Dashboard',
};
</script>

<style scoped>
.dashboard-container {
	padding: 20px;
}

nav ul {
	list-style-type: none;
	padding: 0;
}

nav ul li {
	display: inline;
	margin-right: 20px;
}

nav ul li a {
	text-decoration: none;
	color: #42b983;
	font-weight: bold;
}

nav ul li a:hover {
	text-decoration: underline;
}
</style>
