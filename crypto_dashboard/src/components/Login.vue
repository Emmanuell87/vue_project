<template>
	<div class="container d-flex justify-content-center">
		<div class="w-50">
			<h2 class="text-center">Iniciar sesión</h2>
			<form @submit.prevent="login">
				<!--Recordar contraseña-->
				<h2 class="text-center" style="font-size: 15px">
					¿Eres nuevo en este sitio?
					<router-link to="/signup">Registrate</router-link>
				</h2>

				<!--Username-->
				<label for="Email" class="fw-bold">Email</label>
				<input
					class="w-100 mb-2"
					type="text"
					placeholder="ejemplo@email.com"
					v-model="form.email"
				/>

				<!--Password-->
				<label for="password" class="fw-bold">Contraseña</label>
				<div class="">
					<input
						class="mb-2"
						style="width: 80%"
						:type="type ? 'text' : 'password'"
						placeholder="Contraseña"
						v-model="form.password"
					/>
					<input
						type="checkbox"
						class="mx-2 mb-0"
						style="width: 13px; height: 13px"
						value="ver_password"
						v-model="type"
					/>
					<fa :icon="type ? 'eye' : 'eye-slash'" />
				</div>
				<!-- <input id="ingresar" type="submit" value="Ingresar" /> -->
				<div class="w-100 d-grid">
					<b-button type="submit" variant="primary">
						Ingresar
					</b-button>
				</div>
			</form>
		</div>
	</div>
</template>
<script lang="ts">
import { signInApi } from "../services/authApi";
import { defineComponent } from "vue";
import store from "../store";
export default defineComponent({
	name: "Login",
	data() {
		return {
			form: {
				email: "",
				password: "",
			},
			type: false,
		};
	},
	methods: {
		async login(): Promise<void> {
			try {
				const res = await signInApi(this.form);
				if (typeof res === "string") {
					store.commit("UPDATE_TOKEN", res);
					this.$router.push({ path: "/crypto/new" });
				}
			} catch (error) {
				console.log(error);
			}
		},
	},
});
</script>
