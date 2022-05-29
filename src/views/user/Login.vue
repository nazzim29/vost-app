<template>
	<!-- component -->
	<div
		class="bg-gray-800 w-full h-screen self-center flex items-center justify-center"
	>
		<div class="bg-gray-900 rounded-md text-white w-full max-w-md">
			<form class="shadow-lg rounded px-12 pt-6 pb-8 mb-4">
				<div
					v-if="error"
					class="mx-2 flex gap-4 bg-red-100 p-4 rounded-md items-center"
				>
					<div class="w-max">
						<div class="h-10 w-10 flex rounded-full text-red-700">
							<Icon
								icon="ph:warning-circle-fill"
								class="m-auto"
								height="100%"
							/>
						</div>
					</div>
					<div class="space-y-1 text-sm">
						<h6 class="font-medium text-red-900">Fatal error</h6>
						<p class="text-red-700 leading-tight">{{ error }}</p>
					</div>
				</div>
				<div
					class="text-white text-2xl flex justify-center border-b-2 py-2 mb-4"
				>
					Login
				</div>
				<div class="mb-4">
					<label
						class="block text-gray-300 text-sm font-normal mb-2"
						for="username"
					>
						Username
					</label>
					<input
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						:class="[
							error === 'Wrong password or username' ? 'border-red-500' : '',
						]"
						name="username"
						v-model="username"
						type="username"
						required
						autofocus
						placeholder="Username"
					/>
				</div>
				<div class="mb-6">
					<label
						class="block text-gray-300 text-sm font-normal mb-2"
						for="password"
					>
						Password
					</label>
					<input
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						:class="[
							error === 'Wrong password or username' ? 'border-red-500' : '',
						]"
						v-model="password"
						type="password"
						placeholder="Password"
						name="password"
						required
						autocomplete="current-password"
					/>
				</div>
				<div class="flex items-center justify-between">
					<button
						@click.prevent="login"
						class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-900 focus:bg-blue-700"
						type="submit"
						:class="{ 'hover:bg-blue-600': !isDisabled }"
						:disabled="isDisabled"
					>
						Sign In
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
	name: "Login",
	components: {
		Icon,
	},

	data() {
		return {
			username: "",
			password: "",
			error: false,
			loading: false,
		};
	},
	methods: {
		login() {
			this.$store.dispatch('login',{username:this.username,password:this.password}).then(()=>	this.$router.push('/'));
		},
	},
	computed: {
		isDisabled() {
			return !(this.username && this.password) | this.loading;
		},
	},
};
</script>

<style></style>
