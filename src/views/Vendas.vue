<template>
	<div class="vendas-container">
		<h1>Vendas</h1>

		<AutoComplete
			v-model="venda.clienteId"
			:suggestions="clientesFiltrados"
			optionLabel="nome"
			field="id"
			@complete="buscarClientes"
			@select="clienteSelecionado = clientes.find(c => c.id === venda.clienteId)"
			placeholder="Selecionar Cliente"
			dropdown
		/>

		<AutoComplete
			v-model="produtoSelecionadoId"
			:suggestions="produtosFiltrados"
			optionLabel="nome"
			@complete="buscarProdutos"
			placeholder="Selecionar Produto"
			dropdown
		/>

		<InputNumber v-model.number="quantidadeSelecionada" min="1" placeholder="Quantidade" />

		<Button label="Adicionar Produto" icon="pi pi-plus" @click="adicionarProduto" class="p-button-success" />

		<h2>Carrinho</h2>
		<ul>
			<li v-for="item in venda.itens" :key="item.produto.id">
				{{ item.produto.nome }} - Quantidade: {{ item.quantidade }} -
				Subtotal: R$ {{ (item.produto.preco * item.quantidade).toFixed(2) }}
				<Button icon="pi pi-trash" @click="removerProduto(item.produto.id)" class="p-button-danger" />
			</li>
		</ul>

		<h3>Total: R$ {{ totalVenda.toFixed(2) }}</h3>
		<Button label="Finalizar Venda" icon="pi pi-check" @click="finalizarVenda" class="p-button-success" />
	</div>
</template>

<script>
import AutoComplete from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

export default {
	components: {
		AutoComplete,
		InputNumber,
		Button,
	},
	data() {
		return {
			clientes: [],
			produtos: [],
			clientesFiltrados: [],
			produtosFiltrados: [],
			venda: {
				clienteId: null,
				itens: [],
			},
			produtoSelecionadoId: null,
			clienteSelecionado: null,
			quantidadeSelecionada: 1,
		};
	},
	computed: {
		totalVenda() {
			return this.venda.itens.reduce((total, item) => {
				return total + item.produto.preco * item.quantidade;
			}, 0);
		},
	},
	methods: {
		buscarClientes(event) {
			const query = event.query.toLowerCase();
			this.clientesFiltrados = this.clientes.filter(cliente =>
				cliente.nome.toLowerCase().includes(query)
			);
		},
		buscarProdutos(event) {
			const query = event.query.toLowerCase();
			this.produtosFiltrados = this.produtos.filter(produto =>
				produto.nome.toLowerCase().includes(query)
			);
		},
		adicionarProduto() {
			const produto = this.produtos.find(p => p.id === this.produtoSelecionadoId.id);
			if (produto && this.quantidadeSelecionada > 0) {
				const itemExistente = this.venda.itens.find(item => item.produto.id === produto.id);
				if (itemExistente) {
					itemExistente.quantidade += this.quantidadeSelecionada;
				} else {
					this.venda.itens.push({
						produto,
						quantidade: this.quantidadeSelecionada,
					});
				}
				this.produtoSelecionadoId = null;
				this.quantidadeSelecionada = 1;
			}
		},
		removerProduto(produtoId) {
			this.venda.itens = this.venda.itens.filter(item => item.produto.id !== produtoId);
		},
		finalizarVenda() {
			const clienteSelecionado = this.clientes.find(c => c.email === this.venda.clienteId.email);
			const temProdutosNoCarrinho = this.venda.itens.length > 0;
			console.log(clienteSelecionado);
			console.log(temProdutosNoCarrinho);

			if (clienteSelecionado && temProdutosNoCarrinho) {
				const novaVenda = {
					cliente: clienteSelecionado.nome,
					itens: this.venda.itens,
					total: this.totalVenda,
					data: new Date().toLocaleString(),
				};

				const vendas = JSON.parse(localStorage.getItem('vendas') || '[]');
				vendas.push(novaVenda);
				localStorage.setItem('vendas', JSON.stringify(vendas));

				alert(`Venda finalizada! Total: R$ ${this.totalVenda.toFixed(2)}`);
				this.resetarVenda();
			} else {
				alert('Selecione um cliente e adicione produtos para finalizar a venda.');
			}
		},
		resetarVenda() {
			this.venda = {
				clienteId: null,
				itens: [],
			};
			this.clienteSelecionado = null;
		},
		carregarDados() {
			this.clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
			this.produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
		},
	},
	mounted() {
		this.carregarDados();
	},
};
</script>

<style scoped>
.vendas-container {
	padding: 20px;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 10px;
}
</style>
