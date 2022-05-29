<!-- component -->
<style>
/* Compiled dark classes from Tailwind */
.dark .dark\:divide-gray-700 > :not([hidden]) ~ :not([hidden]) {
	border-color: rgba(55, 65, 81);
}
.dark .dark\:bg-gray-50 {
	background-color: rgba(249, 250, 251);
}
.dark .dark\:bg-gray-100 {
	background-color: rgba(243, 244, 246);
}
.bg-gray-600 {
	background-color: rgba(75, 85, 99);
}
.bg-gray-700 {
	background-color: rgba(55, 65, 81);
}
.bg-gray-800 {
	background-color: rgba(31, 41, 55);
}
.dark .dark\:bg-gray-900 {
	background-color: rgba(17, 24, 39);
}
.dark .dark\:bg-red-700 {
	background-color: rgba(185, 28, 28);
}
.dark .dark\:bg-green-700 {
	background-color: rgba(4, 120, 87);
}
.dark .dark\:hover\:bg-gray-200:hover {
	background-color: rgba(229, 231, 235);
}
.dark .dark\:hover\:bg-gray-600:hover {
	background-color: rgba(75, 85, 99);
}
.dark .dark\:hover\:bg-gray-700:hover {
	background-color: rgba(55, 65, 81);
}
.dark .dark\:hover\:bg-gray-900:hover {
	background-color: rgba(17, 24, 39);
}
.dark .dark\:border-gray-100 {
	border-color: rgba(243, 244, 246);
}
.dark .dark\:border-gray-400 {
	border-color: rgba(156, 163, 175);
}
.dark .dark\:border-gray-500 {
	border-color: rgba(107, 114, 128);
}
.dark .dark\:border-gray-600 {
	border-color: rgba(75, 85, 99);
}
.dark .dark\:border-gray-700 {
	border-color: rgba(55, 65, 81);
}
.dark .dark\:border-gray-900 {
	border-color: rgba(17, 24, 39);
}
.dark .dark\:hover\:border-gray-800:hover {
	border-color: rgba(31, 41, 55);
}
.dark .dark\:text-white {
	color: rgba(255, 255, 255);
}
.dark .dark\:text-gray-50 {
	color: rgba(249, 250, 251);
}
.dark .dark\:text-gray-100 {
	color: rgba(243, 244, 246);
}
.dark .dark\:text-gray-200 {
	color: rgba(229, 231, 235);
}
.dark .dark\:text-gray-400 {
	color: rgba(156, 163, 175);
}
.dark .dark\:text-gray-500 {
	color: rgba(107, 114, 128);
}
.dark .dark\:text-gray-700 {
	color: rgba(55, 65, 81);
}
.dark .dark\:text-gray-800 {
	color: rgba(31, 41, 55);
}
.dark .dark\:text-red-100 {
	color: rgba(254, 226, 226);
}
.dark .dark\:text-green-100 {
	color: rgba(209, 250, 229);
}
.dark .dark\:text-blue-400 {
	color: rgba(96, 165, 250);
}
.dark .group:hover .dark\:group-hover\:text-gray-500 {
	color: rgba(107, 114, 128);
}
.dark .group:focus .dark\:group-focus\:text-gray-700 {
	color: rgba(55, 65, 81);
}
.dark .dark\:hover\:text-gray-100:hover {
	color: rgba(243, 244, 246);
}
.dark .dark\:hover\:text-blue-500:hover {
	color: rgba(59, 130, 246);
}

/* Custom style */
.header-right {
	width: calc(100% - 3.5rem);
}

@media (min-width: 768px) {
	.header-right {
		width: calc(100% - 16rem);
	}
	.w-fit {
		width: "fit-content";
	}
}
</style>
<template>
	<div class="fixed h-screen w-full flex flex-row z-50 pointer-events-none">
		<div
			@mouseover="extended = true"
			class="pointer-events-auto transition-all duration-100 ease-linear group overflow-hidden h-screen flex flex-col bg-gray-900 rounded-r-lg shadow-4xl z-50"
			:class="[extended ? 'w-1/2 md:w-52 ' : 'w-1/6 md:w-16']"
		>
			<div
				class="p-1 w-full bg-gray-600 flex items-center transition-all duration-100 delay-200 h-24 ease-linear"
				:class="[
					extended
						? 'flex-row space-x-1 md:space-x-2 md:justify-center'
						: 'flex-col justify-center space-y-1',
				]"
			>
				<img
					src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
					alt="avatar"
					class="object-cover w-12 h-12 rounded-md"
				/>
				<div class="flex flex-col">
					<div
						:class="[extended ? 'w-full h-6' : 'w-0 h-0']"
						class="text-white text-md font-semibold overflow-hidden transition-all duration-100 ease-linear"
					>
						{{ nom }} {{ prenom }}
					</div>
					<div
						class="flex transition-all duration-100 delay-200 ease-linear"
						:class="[
							extended
								? 'flex-row'
								: ' justify-center items-center flex-col-reverse mx-auto',
						]"
					>
						<Icon
							:icon="iconProfile"
							class="h-5 w-5"
							:style="{ color: iconColor }"
						/>
						<div
							class="text-white text-xs transition-all duration-100 ease-linear ml-1 font-semibold overflow-hidden"
							:class="[extended ? 'w-full h-6' : 'w-0 h-0']"
						>
							{{ profile }}
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-row w-full">
				<div class="flex-row mt-2 w-full">
					<div
						class="group transition-colors duration-100 ease-linear w-full h-12 text-white inline-flex space-x-2 justify-center items-center"
						:class="[
							this.$router.currentRoute.value.name === 'Clients'
								? 'bg-gray-600 border-r-2 border-blue-700'
								: 'bg-gray-900 hover:bg-gray-500',
							this.extended ? 'justify-evenly p-1 pr-1' : 'justify-center',
						]"
						v-if="hasPermission('read-client')"
						@click="goto('/clients')"
					>
						<Icon
							class="transition-all ease-linear flex-1 w-10 h-10"
							icon="gridicons:multiple-users"
						/>
						<label
							class="h-6 overflow-hidden"
							:class="[extended ? 'w-full' : 'w-0']"
							>Clients</label
						>
					</div>
					<div
						class="group transition-colors duration-100 ease-linear w-full h-12 text-white inline-flex space-x-2 justify-center items-center"
						:class="[
							this.$router.currentRoute.value.name === 'User'
								? 'bg-gray-600 border-r-2 border-blue-700'
								: 'bg-gray-900 hover:bg-gray-500',
							this.extended ? 'justify-evenly p-1' : 'justify-center',
						]"
						v-if="hasPermission('read-utilisateur')"
						@click="goto('/user')"
					>
						<Icon
							icon="clarity:employee-group-solid"
							class="transition-all ease-linear flex-1 w-10 h-10"
						/>
						<label
							class="overflow-hidden"
							:class="[extended ? 'w-full h-6' : 'w-0 h-0']"
							>Utilisateurs</label
						>
					</div>
					<div
						class="group transition-colors duration-100 ease-linear w-full h-12 text-white inline-flex space-x-2 justify-center items-center"
						:class="[
							this.$router.currentRoute.value.name === 'Fonction'
								? 'bg-gray-600 border-r-2 border-blue-700'
								: 'bg-gray-900 hover:bg-gray-500',
							this.extended ? 'justify-evenly p-1' : 'justify-center',
						]"
						v-if="user.Profile.nom == 'admin'"
						@click="goto('/fonction')"
					>
						<Icon
							icon="icon-park-outline:permissions"
							class="transition-all ease-linear flex-1 w-10 h-10"
						/>
						<label
							class="overflow-hidden"
							:class="[extended ? 'w-full h-6' : 'w-0 h-0']"
							>Privileges</label
						>
					</div>
					<div
						class="group transition-colors duration-100 ease-linear w-full h-12 text-white inline-flex space-x-2 justify-center items-center"
						:class="[
							this.$router.currentRoute.value.name === 'MatierePremiere'
								? 'bg-gray-600 border-r-2 border-blue-700'
								: 'bg-gray-900 hover:bg-gray-500',
							this.extended ? 'justify-evenly p-1' : 'justify-center',
						]"
						v-if="hasPermission('read-matiere')"
						@click="goto('/MatierePremiere')"
					>
						<Icon
							icon="ri:paint-fill"
							class="transition-all ease-linear flex-1 w-10 h-10"
						/>
						<label
							class="overflow-hidden"
							:class="[extended ? 'w-full h-6' : 'w-0 h-0']"
							>Matieres premiere</label
						>
					</div>
					<div
						class="group transition-colors duration-100 ease-linear w-full h-12 text-white inline-flex space-x-2 justify-center items-center"
						:class="[
							this.$router.currentRoute.value.name === 'Produits'
								? 'bg-gray-600 border-r-2 border-blue-700'
								: 'bg-gray-900 hover:bg-gray-500',
							this.extended ? 'justify-evenly p-1' : 'justify-center',
						]"
						v-if="hasPermission('read-produit')"
						@click="goto('/Produits')"
					>
						<Icon
							icon="ri:paint-fill"
							class="transition-all ease-linear flex-1 w-10 h-10"
						/>
						<label
							class="overflow-hidden"
							:class="[extended ? 'w-full h-6' : 'w-0 h-0']"
							>Produits</label
						>
					</div>
					<div
						class="group transition-colors duration-100 ease-linear w-full h-12 text-white inline-flex space-x-2 justify-center items-center"
						:class="[
							this.$router.currentRoute.value.name === 'Commandes'
								? 'bg-gray-600 border-r-2 border-blue-700'
								: 'bg-gray-900 hover:bg-gray-500',
							this.extended ? 'justify-evenly p-1 pr-1' : 'justify-center',
						]"
						v-if="hasPermission('read-commande')"
						@click="goto('/commandes')"
					>
						<Icon
							class="transition-all ease-linear flex-1 w-10 h-10"
							icon="icon-park-outline:transaction-order"
						/>
						<label
							class="h-6 overflow-hidden"
							:class="[extended ? 'w-full' : 'w-0']"
							>Commandes</label
						>
					</div>
					<div
						class="group transition-colors duration-100 ease-linear w-full h-12 text-white inline-flex space-x-2 justify-center items-center"
						:class="[
							this.$router.currentRoute.value.name === 'Ventes'
								? 'bg-gray-600 border-r-2 border-blue-700'
								: 'bg-gray-900 hover:bg-gray-500',
							this.extended ? 'justify-evenly p-1' : 'justify-center',
						]"
						v-if="hasPermission('read-vente')"
						@click="goto('/ventes')"
					>
						<Icon
							icon="mdi:shipping-pallet"
							class="transition-all ease-linear flex-1 w-10 h-10"
						/>
						<label
							class="overflow-hidden"
							:class="[extended ? 'w-full h-6' : 'w-0 h-0']"
							>Ventes</label
						>
					</div>

					<div
						class="group transition-colors duration-100 ease-linear w-full h-12 text-white inline-flex space-x-2 justify-center items-center"
						:class="[
							this.$router.currentRoute.value.name === 'Parametres'
								? 'bg-gray-600 border-r-2 border-blue-700'
								: 'bg-gray-900 hover:bg-gray-500',
							this.extended ? 'justify-evenly p-1' : 'justify-center',
						]"
						v-if="user.Profile.nom == 'admin'"
						@click="goto('/parametres')"
					>
						<Icon
							icon="icon-park-outline:composition"
							class="transition-all ease-linear flex-1 w-10 h-10"
						/>
						<label
							class="overflow-hidden"
							:class="[extended ? 'w-full h-6' : 'w-0 h-0']"
							>Parametres</label
						>
					</div>
					<div
						class="group transition-colors duration-100 ease-linear w-full h-12 text-white inline-flex space-x-2 justify-center items-center"
						:class="[
							this.$router.currentRoute.value.name === 'Productions'
								? 'bg-gray-600 border-r-2 border-blue-700'
								: 'bg-gray-900 hover:bg-gray-500',
							this.extended ? 'justify-evenly p-1' : 'justify-center',
						]"
						v-if="hasPermission('read-production')"
						@click="goto('/Productions')"
					>
						<Icon
							icon="lucide:package-plus"
							class="transition-all ease-linear flex-1 w-10 h-10"
						/>
						<label
							class="overflow-hidden"
							:class="[extended ? 'w-full h-6' : 'w-0 h-0']"
							>Productions</label
						>
					</div>
					<div
						class="group transition-colors duration-100 ease-linear w-full h-12 text-white inline-flex space-x-2 justify-center items-center"
						:class="[
							this.$router.currentRoute.value.name === 'ContactClient'
								? 'bg-gray-600 border-r-2 border-blue-700'
								: 'bg-gray-900 hover:bg-gray-500',
							this.extended ? 'justify-evenly p-1' : 'justify-center',
						]"
						v-if="hasPermission('read-contactclient')"
						@click="goto('/contact-client')"
					>
						<Icon
							icon="icon-park-outline:mail-package"
							class="transition-all ease-linear flex-1 w-10 h-10"
						/>
						<label
							class="overflow-hidden"
							:class="[extended ? 'w-full h-6' : 'w-0 h-0']"
							>Contact Client</label
						>
					</div>
					<!-- <div
						class="group transition-colors duration-100 ease-linear w-full h-12 text-white inline-flex space-x-2 justify-center items-center"
						:class="[
							this.$router.currentRoute.value.name === 'Messagerie'
								? 'bg-gray-600 border-r-2 border-blue-700'
								: 'bg-gray-900 hover:bg-gray-500',
							this.extended ? 'justify-evenly p-1' : 'justify-center',
						]"
						@click="goto('/messagerie')"
					>
						<Icon
							icon="ant-design:message-filled"
							class="transition-all ease-linear flex-1 w-10 h-10"
						/>
						<label
							class="overflow-hidden"
							:class="[extended ? 'w-full h-6' : 'w-0 h-0']"
							>Messagerie</label
						>
					</div> -->
				</div>
			</div>
			<div
				class="mt-auto text-center text-light text-white mb-2 h-12 overflow-hidden transistion-all ease-in-out"
				:class="[
					extended ? 'w-full delay-300 duration-100' : 'w-0 duration-75',
				]"
				@click="logout"
			>
				EURL NANOKIMYA
			</div>
		</div>
		<div
			class="ml-4 flex-1 z-40 pointer-events-auto"
			@mouseenter="this.extended = false"
			v-if="extended"
		></div>
	</div>
</template>
<script>
import "alpinejs";
import { Icon } from "@iconify/vue";
export default {
	components: {
		Icon,

		// TransitionRoot,
	},
	mounted() {},
	setup() {
		const getTheme = () => {
			if (window.localStorage.getItem("dark")) {
				return JSON.parse(window.localStorage.getItem("dark"));
			}
			return (
				!!window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches
			);
		};

		const setTheme = (value) => {
			window.localStorage.setItem("dark", value);
		};

		return {
			loading: true,
			isDark: getTheme(),
			toggleTheme() {
				this.isDark = !this.isDark;
				setTheme(this.isDark);
			},
		};
	},
	data() {
		return { extended: false };
	},
	computed: {
		nom() {
			console.log(this.user);
			return this.user.nom.toUpperCase();
		},
		user() {
			return this.$store.getters.getCurrentUser;
		},
		prenom() {
			// capitalize the first letter of the name
			return (
				this.user.prenom.toUpperCase().slice(0, 1) +
				this.user.prenom.toLowerCase().slice(1)
			);
		},
		profile() {
			return this.user.Profile.nom;
		},
		iconProfile() {
			return this.user.Profile.icon;
		},
		iconColor() {
			return this.user.Profile.couleur;
		},
	},
	methods: {
		goto(url) {
			this.$router.push(url);
		},
		hasPermission(permission) {
			return !!this.user.Profile.Autorisations.find(
				(el) => el.nom == permission
			);
		},
		logout() {
			console.log("logout");
			this.$store.dispatch("logout");
			this.$router.push("/login");
		},
	},
};
</script>
