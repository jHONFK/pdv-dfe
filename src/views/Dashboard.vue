<template>
	<div class="dashboard-container">
		<aside class="sidebar">
			<TieredMenu :model="items" />
		</aside>
		<main class="content">
			<component :is="currentComponent" />
		</main>
	</div>
</template>

<script>
import TieredMenu from 'primevue/tieredmenu';
import Vendas from './Vendas.vue';
import Produtos from './Produtos.vue';
import Clientes from './Clientes.vue';
import Relatorios from './Relatorios.vue';
import 'primeicons/primeicons.css'


export default {
	name: 'Dashboard',
	components: {
		TieredMenu,
		Vendas,
		Produtos,
		Clientes,
		Relatorios,
	},
	data() {
		return {
			currentComponent: null,
			items: [
				{
					label: 'Vendas',
					icon: 'pi pi-shopping-cart',
					command: () => this.currentComponent = 'Vendas',
				},
				{
					label: 'Produtos',
					icon: 'pi pi-tags',
					command: () => this.currentComponent = 'Produtos',
				},
				{
					label: 'Clientes',
					icon: 'pi pi-users',
					command: () => this.currentComponent = 'Clientes',
				},
				{
					label: 'Relatórios',
					icon: 'pi pi-file',
					command: () => this.currentComponent = 'Relatorios',
				},
				{
					separator: true,
				},
				{
					label: 'Sair',
					icon: 'pi pi-sign-out',
					command: () => this.currentComponent = null,
				},
			],
		};
	},
};
</script>

<style scoped>
.dashboard-container {
	display: flex;
	height: 100vh;
}

.sidebar {
	position: fixed;
	top: 0;
	left: 0;
	width: 250px;
	height: 100vh;
	background-color: #121212;
	padding: 8px;
	box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
	z-index: 1000;
}

.content {
	margin-left: 250px;
	padding: 20px;
	flex-grow: 1;
	overflow-y: auto;
}

h1 {
	margin-bottom: 20px;
}
</style>
