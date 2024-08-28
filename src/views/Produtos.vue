<template>
	<div class="produtos-container">
		<h1>Gerenciamento de Produtos</h1>

		<form @submit.prevent="saveProduto">
			<InputText
				v-model="produto.nome"
				placeholder="Nome do Produto"
				required
			/>
			<InputNumber
				v-model.number="produto.preco"
				placeholder="Preço"
				required
				mode="currency"
				currency="BRL"
				locale="pt-BR"
			/>
			<Button
				type="submit"
				label="Salvar Produto"
				:icon="editando ? 'pi pi-pencil' : 'pi pi-plus'"
				class="p-button-success"
			/>
		</form>

		<ul>
			<li v-for="produto in produtos" :key="produto.id">
				{{ produto.nome }} - R$ {{ produto.preco.toFixed(2) }}
				<Button @click="editProduto(produto)" icon="pi pi-pencil" class="p-button-warning" />
				<Button @click="deleteProduto(produto.id)" icon="pi pi-trash" class="p-button-danger" />
			</li>
		</ul>
	</div>
</template>

<script>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'


export default {
	components: {
		InputText,
		InputNumber,
		Button,
	},
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
	display: flex;
	gap: 10px;
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
