<template>
	<div class="flex flex-col h-screen w-full overflow-hidden">
		<div class="mx-2 mt-3 w-full flex flex-row">
			<Listbox v-model="selectedFonction">
				<ListboxButton
					class="relative w-44 py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
				>
					<span
						class="block truncate text-gray-700 font-semibold text-center"
						>{{ selectedFonction && selectedFonction.nom }}</span
					>
					<span
						class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
					>
						<SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
					</span>
				</ListboxButton>

				<transition
					leave-active-class="transition duration-100 ease-in"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
				>
					<ListboxOptions
						class="absolute w-44 py-1 mt-10 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
					>
						<ListboxOption
							v-slot="{ active, selected }"
							v-for="fonction in fonctions"
							:key="fonction.id"
							:value="fonction"
							as="template"
						>
							<li
								:class="[
									active ? 'text-gray-900 bg-gray-100' : 'text-gray-500',
									selected ? 'bg-indigo-100' : 'bg-white',
									'cursor-default select-none group  relative py-2 px-2 pr-4 text-left inline-flex w-full justify-between items-center transition-all duration-100',
								]"
							>
								<span
									:class="[
										selected ? 'font-semibold' : 'font-normal',
										'block truncate',
									]"
									>{{ fonction.nom }}</span
								>
								<div class="p-1" @click="deleteFonction(fonction)">
									<Icon
										icon="bi:archive"
										:class="[
											'w-5 h-5 ml-2 hidden text-red-500 md:hover:text-red-500 md:group-hover:block',
										]"
										aria-hidden="true"
									/>
								</div>
								<span
									v-if="selected"
									class="flex items-center pl-3 text-amber-600"
								>
									<CheckIcon class="w-5 h-5" aria-hidden="true" />
								</span>
							</li>
						</ListboxOption>
					</ListboxOptions>
				</transition>
			</Listbox>
			<button
				@click="openCreateModal"
				class="ml-2 items-center border-2 border-green-300 rounded-md px-3 bg-gray-200 hover:bg-gray-400 hover:text-white py-2 inline-flex"
			>
				<Icon icon="carbon:bookmark-add" class="w-5 h-5" />
				<span class="ml-1">Ajouter</span>
			</button>
		</div>
		<div class="bg-white shadow-lg rounded-md flex-1 m-2 p-1 overflow-y-auto">
			<!-- <h1 class="font-semibold text-md">Autorisations</h1> -->
			<div class="w-full grid grid-rows-7 ml-1 md:ml-0">
				<div class="md:grid grid-cols-3 hidden">
					<div class="font-bold w-full text-center border">Gestion</div>
					<div class="grid grid-cols-4 col-span-2">
						<div class="font-bold w-full text-gray-600 text-center border">
							Lister
						</div>
						<div class="font-bold w-full text-gray-600 text-center border">
							Ajouter
						</div>
						<div class="font-bold w-full text-gray-600 text-center border">
							Archiver
						</div>
						<div class="font-bold w-full text-gray-600 text-center border">
							Modifier
						</div>
					</div>
				</div>
				<div
					class="grid md:grid-cols-3 space-y-2 md:space-y-0"
					v-for="c in categories"
					:key="c"
				>
					<div
						class="md:border md:items-center md:justify-center md:inline-flex"
					>
						{{ capitalize(c) }}
					</div>
					<div class="grid md:grid-cols-4 md:grid-flow-col col-span-2">
						<div
							:class="[
								'flex flex-col md:justify-center md:border',
								(a.nom.startsWith('add') && 'order-2 ') ||
									(a.nom.startsWith('delete') && 'order-3') ||
									(a.nom.startsWith('update') && 'order-4') ||
									(a.nom.startsWith('read') && 'order-1'),
							]"
							v-for="a in autorisations
								.filter((el) => el.categorie === c)
								.sort((el) => el.id)"
							:key="a"
						>
							<div
								class="inline-flex items-center space-evenly space-x-1 md:justify-center w-full h-10"
							>
								<input
									type="checkbox"
									:id="a.nom"
									:class="[
										'focus:outline-none focus:ring-0 rounded-md w-5 h-5',
									]"
									:checked="
										selectedFonction &&
										selectedFonction.Autorisations.map((el) => el.id).includes(
											a.id
										)
									"
									@change="updateAutorisation(a, 'all')"
								/>
								<label :for="a.nom" class="md:hidden">{{
									a.description
								}}</label>
							</div>

							<div
								class="inline-flex justify-center items-center p-2"
								v-if="
									selectedFonction &&
									selectedFonction.Autorisations.find((el) => el.id == a.id) &&
									!a.nom.startsWith('add') &&
									selectedFonction.Autorisations.find((el) => el.id === a.id)
										.autorisations_fonctions
								"
							>
								<span class="mr-3 text-sm font-medium text-gray-900"
									>Own only</span
								>
								<label class="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										class="sr-only peer"
										:checked="
											selectedFonction.Autorisations.find(
												(el) => el.id === a.id
											).autorisations_fonctions.type == 'own'
										"
										@change="
											changeAutType(
												selectedFonction.Autorisations.find(
													(el) => el.id === a.id
												),
												$event.target.checked ? 'own' : 'all'
											)
										"

									/>
									<div
										class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300  dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
									></div>
								</label>
								<span class="ml-3 text-sm font-medium text-gray-900">All</span>
								<!-- <div
									class="inline-flex space-x-1 w-full justify-center items-center"
								> -->
								<!-- <input
										type="radio"
										:id="a.nom + '-own'"
										:name="a.nom"
										:class="[
											'focus:outline-none focus:ring-0 rounded-md w-3 h-3',
										]"
										value="own"
										v-model="
											selectedFonction.Autorisations.find(
												(el) => el.id === a.id
											).autorisations_fonctions.type
										"
										@change="selectedFonction.updated = false"
									/>
									<label :for="a.nom + '-own'">Own Only</label>
								</div>
								<div
									class="inline-flex space-x-1 w-full justify-center items-center"
								>
									<input
										type="radio"
										v-model="
											selectedFonction.Autorisations.find(
												(el) => el.id === a.id
											).autorisations_fonctions.type
										"
										@change="selectedFonction.updated = false"
										:id="a.nom + '-all'"
										:name="a.nom"
										:class="[
											'focus:outline-none focus:ring-0 rounded-md w-3 h-3',
										]"
										value="all"
									/>
									<label :for="a.nom + '-all'">All</label>
								</div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- gestion des utilisateurs
			gestion des roles
			gestion des commandes
			gestion des clients
			gestion des payement
			gestion des produits
			gestion de la matiere premiere -->
		</div>
		<div class="h-16 inline-flex items-center justify-end space-x-1 pb-2 pr-2">
			<button
				@click="deleteFonction"
				:class="[
					'bg-red-500 text-white text-sm sm:text-base font-semibold rounded-md py-1.5 px-1 focus:outline-none focus:ring-2 focus:ring-red-500 md:hidden',
				]"
			>
				Archiver le Profile
			</button>
			<button
				@click="updateFonction"
				:class="[
					'bg-green-500 text-white font-semibold rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-green-500',
					selectedFonction?.updated && 'bg-opacity-50',
				]"
				:disable="!selectedFonction?.updated || false"
			>
				Enregistrer
			</button>
		</div>
	</div>
	<Modal ref="createModal" primaryColor="haja" @submit="saveFonction">
		<template v-slot:title>
			<div class="inline-flex items-center">
				<Icon icon="carbon:bookmark-add" class="w-5 h-5 mr-2" /> Ajouter une
				fonction
			</div>
		</template>
		<template v-slot:body>
			<div class="flex flex-col w-full space-y-2">
				<div class="w-full">
					<label
						class="block text-gray-700 text-sm font-semibold mb-2"
						for="nom"
						>Nom</label
					>
					<input
						type="text"
						name="nom"
						v-model="newFonction.nom"
						class="rounded-md w-full"
					/>
				</div>
				<div class="flex flex-col w-full">
					<label for="color">Choisissez une couleur: </label>
					<div class="w-full inline-flex items-center">
						<input
							class="rounded-md w-20"
							type="color"
							name="color"
							v-model="newFonction.couleur"
						/>
						<input
							v-model="newFonction.couleur"
							type="text"
							class="rounded-md border-none text-gray-400 w-24"
							disabled
						/>
					</div>
				</div>
				<div class="w-full flex flex-col">
					<label for="icon">Choisissez une icon :</label>
					<input
						type="text"
						v-model="newFonction.icon"
						class="rounded-md text-gray-400 w-full"
					/>
					<div
						v-if="icons.length != 0"
						class="grid grid-cols-6 border-1 border-blue-900 h-36 overflow-y-auto mt-2"
					>
						<Icon
							v-for="icon in icons"
							:icon="icon"
							:key="icon"
							@click="newFonction.icon = icon"
							class="w-12 h-12 p-0.5 rounded-md m-1 focus:border-indigo-900 focus:border hover:bg-gray-400"
						/>
					</div>
				</div>
				<div class="w-full">
					<label
						class="block text-gray-700 text-sm font-semibold mb-2"
						for="description"
						>Description</label
					>
					<textarea
						v-model="newFonction.description"
						name="description"
						class="resize-x-none rounded-md w-full"
					></textarea>
				</div>
			</div>
		</template>
		<template v-slot:submit>Ajouter</template>
	</Modal>
</template>

<script>
import Modal from "@/components/Modal";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
import _ from "lodash";
export default {
	name: "Fonctions",
	components: {
		Modal,
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		CheckIcon,
		SelectorIcon,
		Icon,
	},
	methods: {
		capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		},
		openCreateModal() {
			this.$refs.createModal.open = true;
		},
		opendeletemodal(fonction) {
			this.$refs.obj = fonction;
			this.$refs.deletedModal.open = true;
		},
		// eslint-disable-next-line no-unused-vars
		updateAutorisation(aut, type) {
			if (this.selectedFonction.Autorisations.find((el) => el.id === aut.id)) {
				this.selectedFonction.Autorisations =
					this.selectedFonction.Autorisations.filter(
						(autorisation) => autorisation.id != aut.id
					);
			} else {
				// aut.autorisations_fonctions?.type = type || 'all';

				this.selectedFonction.Autorisations.push({
					autorisations_fonctions: { type: type || "all" },
					...aut,
				});
			}
			this.selectedFonction.updated = false;
		},
		changeAutType(aut, type) {
			console.log("🚀 ~ file: Fonction.vue:383 ~ updateAutType ~ aut:", aut)
			console.log("🚀 ~ file: Fonction.vue:383 ~ updateAutType ~ type:", type)
			// aut.autorisations_fonctions.type = type;
			// this.selectedFonction.updated = false;
		},
		async updateFonction() {
			if (this.selectedFonction.updated) return;
			try {
				this.$store
					.dispatch("updateFonction", this.selectedFonction)
					.then((res) => {
						console.log(res);
						this.selectedFonction.updated = true;
					});
			} catch (e) {
				console.log(e);
			}
		},
		async saveFonction() {
			try {
				await this.$store.dispatch("addFonction", this.newFonction);
				this.$refs.createModal.open = false;
			} catch (e) {
				console.log(e);
			}
		},
		async deleteFonction(f) {
			console.log(f);
			try {
				await this.$store.dispatch(
					"deleteFonction",
					f.id || this.selectedFonction.id
				);
				// this.$refs.deletedModal.open = false;
			} catch (e) {
				console.log(e);
			}
		},
		changedColor(color) {
			this.newFonction.couleur = color;
		},
	},
	async beforeMount() {
		await this.$store.dispatch("getFonctions");
		await this.$store.dispatch("getAutorisations");
		// console.log("hey",)
		this.selectedFonction =
			this.fonctions[
				this.fonctions
					.map((el) => el.id)
					.indexOf(this.$store.state.users.user.Profile.id)
			];
	},
	data() {
		return {
			selectedFonction: null,
			newFonction: {},
			deletedFonction: {},
			icons: [],
			isMobile: false,
			showColorPicker: false,
		};
	},
	computed: {
		autorisations() {
			return this.$store.state.fonctions.autorisations;
		},
		categories() {
			return this.$store.state.fonctions.autorisations
				.map((autorisation) => autorisation.categorie)
				.filter((categorie, index, self) => self.indexOf(categorie) === index);
		},
		fonctions() {
			return this.$store.state.fonctions.fonctions;
		},
	},
	watch: {
		"newFonction.icon": _.debounce(async function () {
			this.icons = (
				await axios.get(
					`https://api.iconify.design/search?query=${this.newFonction.icon}`
				)
			).data.icons;
		}, 200),
		selectedFonction() {
			// this.$store.dispatch('getFonctions')

			if (this.selectedFonction.updated === undefined)
				this.selectedFonction.updated = true;
		},
		fonctions: function () {
			if (!this.fonctions.find((el) => el.id == this.selectedFonction)) {
				this.selectedFonction = this.fonctions.find(
					(el) => el.id == this.$store.state.users.user.Profile.id
				);
			}
		},
	},
};
</script>

<style scoped>
.diamond {
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	transform: rotate(45deg);
}
.diamond > div {
	transform: rotate(-45deg);
}
</style>
