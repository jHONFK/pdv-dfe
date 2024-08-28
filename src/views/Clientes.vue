<template>
	<div class="clientes-container">
		<h1>Clientes</h1>

		<div class="form-container">
			<InputText v-model="form.nome" placeholder="Nome do Cliente" />
			<InputText v-model="form.email" type="email" placeholder="Email do Cliente" />
			<Button
				@click="isEditing ? updateCliente() : addCliente()"
				:label="isEditing ? 'Atualizar Cliente' : 'Adicionar Cliente'"
				:icon="isEditing ? 'pi pi-pencil' : 'pi pi-plus'"
				class="p-button-success"
			/>
		</div>

		<ul>
			<li v-for="(cliente, index) in clientes" :key="index">
				{{ cliente.nome }} - {{ cliente.email }}
				<Button @click="editCliente(index)" icon="pi pi-pencil" />
				<Button @click="deleteCliente(index)" icon="pi pi-times" severity="danger" rounded aria-label="Cancel" />
			</li>
		</ul>
	</div>
</template>

<script>
import 'primeicons/primeicons.css'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
	name: 'Clientes',
	components: {
		InputText,
		Button,
	},
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
