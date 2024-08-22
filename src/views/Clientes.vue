<template>
	<div class="clientes-container">
		<h1>Clientes</h1>

		<div class="form-container">
			<input v-model="form.nome" type="text" placeholder="Nome do Cliente" />
			<input v-model="form.email" type="email" placeholder="Email do Cliente" />
			<button @click="isEditing ? updateCliente() : addCliente()">
				{{ isEditing ? 'Atualizar Cliente' : 'Adicionar Cliente' }}
			</button>
		</div>

		<ul>
			<li v-for="(cliente, index) in clientes" :key="index">
				{{ cliente.nome }} - {{ cliente.email }}
				<button @click="editCliente(index)">Editar</button>
				<button @click="deleteCliente(index)">Excluir</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Clientes',
	data() {
		return {
			clientes: [],
			form: {
				nome: '',
				email: '',
			},
			isEditing: false,
			currentIndex: null,
		};
	},
	methods: {
		addCliente() {
			if (this.form.nome && this.form.email) {
				this.clientes.push({ ...this.form });
				this.saveToLocalStorage();
				this.resetForm();
			} else {
				alert('Por favor, preencha todos os campos.');
			}
		},
		editCliente(index) {
			this.form = {...this.clientes[index]};
			this.isEditing = true;
			this.currentIndex = index;
		},
		updateCliente() {
			if (this.form.nome && this.form.email) {
				this.clientes[this.currentIndex] = {...this.form};
				this.saveToLocalStorage();
				this.resetForm();
			} else {
				alert('Por favor, preencha todos os campos.');
			}
		},
		deleteCliente(index) {
			this.clientes.splice(index, 1);
			this.saveToLocalStorage();
		},
		resetForm() {
			this.form.nome = '';
			this.form.email = '';
			this.isEditing = false;
			this.currentIndex = null;
		},
		saveToLocalStorage() {
			localStorage.setItem('clientes', JSON.stringify(this.clientes));
		},
		loadFromLocalStorage() {
			const storedClientes = localStorage.getItem('clientes');
			if (storedClientes) {
				this.clientes = JSON.parse(storedClientes);
			}
		}
	},
	mounted() {
		this.loadFromLocalStorage();
	},
};
</script>

<style scoped>
.clientes-container {
	padding: 20px;
}

.form-container {
	margin-bottom: 20px;
}

.form-container input {
	margin-right: 10px;
	padding: 5px;
}

.form-container button {
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

button {
	margin-left: 10px;
	padding: 5px 10px;
	cursor: pointer;
}
</style>
