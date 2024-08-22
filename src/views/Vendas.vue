<template>
	<div class="vendas-container">
		<h1>Vendas</h1>

		<label for="cliente">Selecionar Cliente:</label>
		<select v-model="venda.clienteId" id="cliente">
			<option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
				{{ cliente.nome }}
			</option>
		</select>

		<label for="produto">Selecionar Produto:</label>
		<select v-model="produtoSelecionadoId" id="produto">
			<option v-for="produto in produtos" :key="produto.id" :value="produto.id">
				{{ produto.nome }} - R$ {{ produto.preco.toFixed(2) }}
			</option>
		</select>

		<input
			type="number"
			v-model.number="quantidadeSelecionada"
			min="1"
			placeholder="Quantidade"
		/>
		<button @click="adicionarProduto">Adicionar Produto</button>

		<h2>Carrinho</h2>
		<ul>
			<li v-for="item in venda.itens" :key="item.produto.id">
				{{ item.produto.nome }} - Quantidade: {{ item.quantidade }} -
				Subtotal: R$ {{ (item.produto.preco * item.quantidade).toFixed(2) }}
				<button @click="removerProduto(item.produto.id)">Remover</button>
			</li>
		</ul>

		<h3>Total: R$ {{ totalVenda.toFixed(2) }}</h3>
		<button @click="finalizarVenda">Finalizar Venda</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			clientes: [],
			produtos: [],
			venda: {
				clienteId: null,
				itens: []
			},
			produtoSelecionadoId: null,
			quantidadeSelecionada: 1,
		};
	},
	computed: {
		totalVenda() {
			return this.venda.itens.reduce((total, item) => {
				return total + item.produto.preco * item.quantidade;
			}, 0);
		}
	},
	methods: {
		adicionarProduto() {
			const produto = this.produtos.find(p => p.id === this.produtoSelecionadoId);
			if (produto && this.quantidadeSelecionada > 0) {
				const itemExistente = this.venda.itens.find(item => item.produto.id === produto.id);
				if (itemExistente) {
					itemExistente.quantidade += this.quantidadeSelecionada;
				} else {
					this.venda.itens.push({
						produto,
						quantidade: this.quantidadeSelecionada
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
			const clienteSelecionado = this.clientes.find(c => c.id === this.venda.clienteId);
			const temProdutosNoCarrinho = this.venda.itens.length > 0;

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
				itens: []
			};
		},
		carregarDados() {
			this.clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
			this.produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
		}
	},
	mounted() {
		this.carregarDados();
	}
};
</script>

<style scoped>
.vendas-container {
	padding: 20px;
}

select,
input {
	margin-right: 10px;
	padding: 5px;
}

button {
	padding: 5px 10px;
	cursor: pointer;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	margin-bottom: 10px;
}
</style>
