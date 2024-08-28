<template>
	<div class="relatorio-container">
		<h1>Relatório de Vendas</h1>
		<div v-if="vendas.length">
			<div v-for="(venda, index) in vendas" :key="index" class="venda">
				<h3>Venda #{{ index + 1 }} - {{ venda.data }}</h3>
				<p><strong>Cliente:</strong> {{ venda.cliente }}</p>
				<ul>
					<li v-for="(item, i) in venda.itens" :key="i">
						{{ item.produto.nome }} - Quantidade: {{ item.quantidade }} - Subtotal: R$ {{ (item.produto.preco * item.quantidade).toFixed(2) }}
					</li>
				</ul>
				<p><strong>Total da Venda:</strong> R$ {{ venda.total.toFixed(2) }}</p>
				<hr>
			</div>
		</div>
		<div v-else>
			<Message severity="info" text="Nenhuma venda registrada." />
		</div>
	</div>
</template>

<script>
import Message from 'primevue/message';

export default {
	components: {
		Message,
	},
	data() {
		return {
			vendas: [],
		};
	},
	methods: {
		carregarVendas() {
			const vendas = JSON.parse(localStorage.getItem('vendas') || '[]');
			this.vendas = vendas;
		}
	},
	mounted() {
		this.carregarVendas();
	}
};
</script>

<style scoped>
.relatorio-container {
	padding: 20px;
}

.venda {
	margin-bottom: 20px;
}

h3 {
	margin-bottom: 10px;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	margin-bottom: 5px;
}
</style>
