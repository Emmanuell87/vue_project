<template>
	<div>
		<Navbar />
		<main class="container py-5">
			<router-view />
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
	name: "App",
	components: { Navbar },
});
</script>

<style></style>
