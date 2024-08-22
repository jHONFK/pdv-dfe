<template>
	<div class="produtos-container">
		<h1>Gerenciamento de Produtos</h1>

		<form @submit.prevent="saveProduto">
			<input
				type="text"
				v-model="produto.nome"
				placeholder="Nome do Produto"
				required
			/>
			<input
				type="number"
				v-model.number="produto.preco"
				placeholder="Preço"
				required
				step="0.01"
			/>
			<button type="submit">
				{{ editando ? 'Atualizar' : 'Adicionar' }} Produto
			</button>
		</form>

		<ul>
			<li v-for="produto in produtos" :key="produto.id">
				{{ produto.nome }} - R$ {{ produto.preco.toFixed(2) }}
				<button @click="editProduto(produto)">Editar</button>
				<button @click="deleteProduto(produto.id)">Deletar</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			produtos: [],
			produto: {
				id: null,
				nome: '',
				preco: 0.00
			},
			editando: false
		};
	},
	methods: {
		saveProduto() {
			if (this.editando) {
				const index = this.produtos.findIndex(p => p.id === this.produto.id);
				if (index !== -1) {
					this.produtos[index] = { ...this.produto };
				}
				this.editando = false;
			} else {
				this.produto.id = Date.now();
				this.produtos.push({ ...this.produto });
			}
			this.saveToLocalStorage();
			this.resetForm();
		},
		editProduto(produto) {
			this.produto = { ...produto };
			this.editando = true;
		},
		deleteProduto(id) {
			this.produtos = this.produtos.filter(produto => produto.id !== id);
			this.saveToLocalStorage();
		},
		resetForm() {
			this.produto = { id: null, nome: '', preco: 0.00 };
			this.editando = false;
		},
		saveToLocalStorage() {
			localStorage.setItem('produtos', JSON.stringify(this.produtos));
		},
		loadFromLocalStorage() {
			const storedProdutos = localStorage.getItem('produtos');
			if (storedProdutos) {
				this.produtos = JSON.parse(storedProdutos);
			}
		}
	},
	mounted() {
		this.loadFromLocalStorage();
	}
};
</script>

<style scoped>
.produtos-container {
	padding: 20px;
}

form {
	margin-bottom: 20px;
}

input {
	margin-right: 10px;
	padding: 5px;
}

button {
	margin-left: 5px;
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
