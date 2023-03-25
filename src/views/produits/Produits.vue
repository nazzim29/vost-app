<template>
	<div
		:class="['flex flex-col w-full justify-center items-center h-full bg-gray-700 overflow-hidden']"
		
	>
		<div class="flex self-start w-full items-center space-x-3 h-16 py-1 px-2">
			<SearchBar ref="searchbar" @search="searchfn" />
			<div
				class="rounded-full py-2 px-2 bg-gray-500"
				:class="{ hidden: $refs?.searchbar?.open }"
			>
				<FilterIcon
					@click="mobileFiltersOpen = !mobileFiltersOpen"
					class="h-7 fill-current text-white"
				/>
			</div>
			<div class="rounded-full py-2 px-2 bg-gray-500" v-if="currentUser?.Profile.Autorisations.find(el=>el.nom == 'add-produit')">
				<Icon
					icon="bx:bx-paint-roll"
					@click="openCreateModal"
					class="h-7 w-7 fill-current text-white"
				/>
			</div>
		</div>
		<div class="bg-blue-900">
			<div>
				<!-- Mobile filter dialog -->
				<TransitionRoot as="template" :show="mobileFiltersOpen">
					<Dialog
						as="div"
						class="fixed inset-0 flex z-40"
						@close="mobileFiltersOpen = false"
					>
						<TransitionChild
							as="template"
							enter="transition-opacity ease-linear duration-300"
							enter-from="opacity-0"
							enter-to="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leave-from="opacity-100"
							leave-to="opacity-0"
						>
							<DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
						</TransitionChild>

						<TransitionChild
							as="template"
							enter="transition ease-in-out duration-300 transform"
							enter-from="translate-x-full"
							enter-to="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leave-from="translate-x-0"
							leave-to="translate-x-full"
						>
							<div
								class="ml-auto relative max-w-xs w-full h-full bg-gray-900 shadow-xl py-4 pb-12 flex flex-col overflow-y-auto"
							>
								<div class="px-4 flex items-center justify-between">
									<h2 class="text-lg font-medium text-gray-300">Filters</h2>
									<button
										type="button"
										class="-mr-2 w-7 h-7 bg-gray-800 p-1 rounded-md flex items-center justify-center text-gray-400"
										@click="mobileFiltersOpen = false"
									>
										<span class="sr-only text-white">Close menu</span>
										<XIcon class="h-6 w-6 text-gray-300" aria-hidden="true" />
									</button>
								</div>
								<Disclosure
									as="div"
									class="border-t border-gray-400 px-4 py-6"
									v-slot="{ open }"
								>
									<h3 class="-mx-2 -my-3 flow-root">
										<DisclosureButton as="template">
											<div
												class="px-2 py-3 bg-gray-700 w-full flex items-center justify-between text-gray-400 hover:text-gray-200"
											>
												<span class="font-medium text-gray-400"> Types </span>
												<span class="ml-6 flex items-center">
													<PlusSmIcon
														v-if="!open"
														class="h-5 w-5"
														aria-hidden="true"
													/>
													<MinusSmIcon
														v-else
														class="h-5 w-5"
														aria-hidden="true"
													/>
												</span>
											</div>
										</DisclosureButton>
									</h3>
									<DisclosurePanel class="pt-6">
										<div v-if="types.length > 0" class="space-y-6">
											<div
												v-for="type in types"
												:key="type.id"
												class="flex items-center"
											>
												<input
													:value="type.id"
													type="checkbox"
													:checked="type.checked"
													class="h-4 w-4 border-gray-400 rounded text-blue-600 focus:ring-blue-500"
													v-model="typesel"
												/>
												<label class="ml-3 min-w-0 flex-1 text-gray-500">
													{{ type.nom }}
												</label>
											</div>
										</div>
									</DisclosurePanel>
								</Disclosure>
								<Disclosure
									as="div"
									class="border-t border-gray-400 px-4 py-6"
									v-slot="{ open }"
								>
									<h3 class="-mx-2 -my-3 flow-root">
										<DisclosureButton as="template">
											<div
												class="px-2 py-3 bg-gray-700 w-full flex items-center justify-between text-gray-400 hover:text-gray-200"
											>
												<span class="font-medium text-gray-400">
													Couleurs
												</span>
												<span class="ml-6 flex items-center">
													<PlusSmIcon
														v-if="!open"
														class="h-5 w-5"
														aria-hidden="true"
													/>
													<MinusSmIcon
														v-else
														class="h-5 w-5"
														aria-hidden="true"
													/>
												</span>
											</div>
										</DisclosureButton>
									</h3>
									<DisclosurePanel class="pt-6">
										<div v-if="couleurs.length > 0" class="space-y-6">
											<div
												v-for="couleur in couleurs"
												:key="couleur.id"
												class="flex items-center"
											>
												<input
													:value="couleur.id"
													type="checkbox"
													:checked="couleur.checked"
													class="h-4 w-4 border-gray-400 rounded"
													:style="{
														'--tw-ring-color': `#${couleur.code}`,
														color: `#${couleur.code}`,
													}"
													v-model="couleursel"
												/>
												<label
													class="ml-3 min-w-0 flex-1"
													:style="{ color: `#${couleur.code}` }"
												>
													{{ couleur.nom }}
												</label>
											</div>
										</div>
									</DisclosurePanel>
								</Disclosure>
							</div>
						</TransitionChild>
					</Dialog>
				</TransitionRoot>
			</div>
		</div>
		<div class="flex-1 flex flex-col h-full w-full overflow-hidden">
			<div
				class="h-full md:justify-center aligned-center w-full flex flex-1 flex-col overflow-auto overflow-x-hidden py-3"
			>
				<ul
					class="w-full h-full grid grid-flow-row gap-4 grid-cols-1 p-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center items-center"
				>
					<ProductRow
						v-for="produit in showedProduits"
						:key="produit.id"
						:produit="produit"
						@delete="opendeletemodal"
						@show="showProduct"
					/>
				</ul>
			</div>
			<Pagination
				ref="Pagination"
				:currentPage="currentPage"
				:pageSize="nbperpage"
				:dataLength="produits.length"
				@page="currentPage = $event"
				@next="currentPage++"
				@prev="currentPage--"
				@first="currentPage = 1"
				@last="currentPage = $refs.Pagination.pageNumber"
			/>
		</div>
	</div>
	<Modal ref="createmodal" primaryColor="haja" @submit="create">
		<template v-slot:title>Ajouter un produit</template>
		<template v-slot:body>
			<div class="flex flex-col w-full pb-5 pt-28 overflow-y-auto">
				<div class="relative self-center mx-4 max-w-xs">
					<img
						ref="avatarDisplay"
						class="w-full object-fit h-full rounded-md overflow-hidden"
						:src="newProduit.image ||  `${api_url}/uploads/products/default.jpeg`"
					/>
					<PencilIcon
						class="absolute w-5 bottom-1 right-1"
						@click="pencilCLick"
					/>
					<input
						type="file"
						style="display: none"
						class="absolute w-5 bottom-1 right-1"
						ref="fileInput"
						@change="picturechanged"
					/>
				</div>
				<div class="flex flex-col space-y-3 mt-4 px-2">
					<div class="flex flex-col w-full">
						<div class="flex flex-col items-start space-y-2 space-x-2 w-full">
							<label
								for="nom"
								class="flex items-center text-bold h-full rounded-l-md text-md"
								>Nom</label
							>
							<input
								type="text"
								name="nom"
								id="nom"
								v-model="newProduit.nom"
								placeholder="Nom"
								class="rounded-md border-0 w-3/4"
							/>
						</div>
					</div>
					<div class="flex flex-col w-full">
						<div class="flex flex-col items-start w-full space-y-2 space-x-2">
							<label
								for="prenom"
								class="flex items-center text-bold h-full rounded-l-md px-2text-xl"
								>contenance</label
							>
							<input
								type="number"
								name="contenance"
								id="contenance"
								v-model="newProduit.contenance"
								placeholder="Contenance"
								class="rounded-md border-0 w-3/4"
							/>
						</div>
					</div>
					<div class="flex flex-col w-full">
						<div class="flex flex-col items-start w-full space-y-2 space-x-2">
							<label
								for="prenom"
								class="flex items-center text-bold h-full rounded-l-md px-2text-xl"
								>Prix</label
							>
							<input
								type="number"
								name="prix"
								id="prix"
								v-model="newProduit.prix"
								placeholder="Prix"
								class="rounded-md border-0 w-3/4"
							/>
						</div>
					</div>
					<!-- <div class="flex flex-col w-full">
						<label for="color">Choisissez une couleur: </label>
						<div class="w-full inline-flex items-center">
							<input
								class="rounded-md w-20"
								type="color"
								name="color"
								v-model="newProduit.couleur"
							/>
							<input
								v-model="newProduit.couleur"
								type="text"
								class="rounded-md border-none text-gray-400 w-24"
								disabled
							/>
						</div>
					</div> -->
					<div class="flex flex-col w-full">
						<div class="flex flex-col items-start w-full space-y-2 space-x-2">
							<label
								for="passwordConfirm"
								class="flex items-center text-bold h-full rounded-l-md text-md"
								>Type</label
							>
							<Listbox v-model="newProduit.TypeProduit">
								<div class="relative w-3/4">
									<ListboxButton
										class="h-10 relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm border-1"
									>
										<span class="block truncate">{{
											newProduit?.TypeProduit?.nom || "Type"
										}}</span>
										<span
											class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
										>
											<SelectorIcon
												class="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</ListboxButton>

									<transition
										leave-active-class="transition duration-100 ease-in"
										leave-from-class="opacity-100"
										leave-to-class="opacity-0"
									>
										<ListboxOptions
											class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-left z-50"
										>
											<ListboxOption
												v-slot="{ active, selected }"
												v-for="t in types"
												:key="t.id"
												:value="t"
												as="template"
											>
												<li
													:class="[
														active
															? 'text-amber-900 bg-amber-100'
															: 'text-gray-900',
														'cursor-default select-none relative py-2 pl-10 pr-4',
													]"
												>
													<span
														:class="[
															selected ? 'font-medium' : 'font-normal',
															'block truncate',
														]"
														>{{ t.nom }}</span
													>
													<span
														v-if="selected"
														class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
													>
														<CheckIcon class="w-5 h-5" aria-hidden="true" />
													</span>
												</li>
											</ListboxOption>
										</ListboxOptions>
									</transition>
								</div>
							</Listbox>
						</div>
					</div>
					<div class="flex flex-col w-full">
						<div class="flex flex-col items-start w-full space-y-2 space-x-2">
							<label
								for="passwordConfirm"
								class="flex items-center text-bold h-full rounded-l-md text-md"
								>Couleur</label
							>
							<Listbox v-model="newProduit.Couleur">
								<div class="relative w-3/4">
									<ListboxButton
										class="h-10 relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm border-1"
									>
										<span class="block truncate">{{
											newProduit?.Couleur?.nom || "Couleur"
										}}</span>
										<span
											class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
										>
											<SelectorIcon
												class="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</ListboxButton>

									<transition
										leave-active-class="transition duration-100 ease-in"
										leave-from-class="opacity-100"
										leave-to-class="opacity-0"
									>
										<ListboxOptions
											class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-left"
										>
											<ListboxOption
												v-slot="{ active, selected }"
												v-for="t in couleurs"
												:key="t.id"
												:value="t"
												as="template"
											>
												<li
													:class="[
														active
															? 'text-amber-900 bg-amber-100'
															: 'text-gray-900',
														'cursor-default select-none relative py-2 pl-10 pr-4',
													]"
												>
													<span
														:class="[
															selected ? 'font-medium' : 'font-normal',
															'block truncate',
														]"
														>{{ t.nom }}</span
													>
													<span
														v-if="selected"
														class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
													>
														<CheckIcon class="w-5 h-5" aria-hidden="true" />
													</span>
												</li>
											</ListboxOption>
										</ListboxOptions>
									</transition>
								</div>
							</Listbox>
						</div>
					</div>
					<div class="flex flex-col w-full">
						<div class="flex flex-col items-start w-full space-x-2">
							<label
								for="prenom"
								class="flex items-center text-bold h-full rounded-l-md px-2text-xl"
								>Description</label
							>
							<div>
								<QuillEditor
									v-model:content="newProduit.description"
									contentType="html"
									ref='quill'
									placeholder="Description ..."
									theme="snow"
									@focus="focus"
								></QuillEditor>
							</div>
						</div>
					</div>
					<div class="flex flex-col w-full">
						<div class="flex flex-row items-center w-full space-x-2">
							<input
								type="checkbox"
								name="featured"
								id="featured"
								v-model="newProduit.featured"
								class="rounded-md w-5 h-5 focus:outline-none focus:ring-0"
							/>
							<label
								for="prenom"
								class="flex items-center text-bold h-full rounded-l-md px-2text-xl"
								>Mettre a la une</label
							>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-slot:submit>Ajouter</template>
	</Modal>
</template>

<script>
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import { debounce } from "lodash";
import {
	Dialog,
	DialogOverlay,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	TransitionChild,
	TransitionRoot,
} from "@headlessui/vue";
import {
	MinusSmIcon,
	PlusSmIcon,
	FilterIcon,
	SelectorIcon,
	CheckIcon,
} from "@heroicons/vue/solid";
import { XIcon, PencilIcon } from "@heroicons/vue/outline";
import SearchBar from "@/components/SearchBar";
import ProductRow from "@/components/ProductRow";
import { Icon } from "@iconify/vue";
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/vue";
import { QuillEditor } from "@vueup/vue-quill";
export default {
	name: "Produits",
	components: {
		QuillEditor,
		SelectorIcon,
		CheckIcon,
		Pagination,
		Icon,
		PencilIcon,
		ProductRow,
		SearchBar,
		Dialog,
		DialogOverlay,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		TransitionChild,
		TransitionRoot,
		FilterIcon,
		MinusSmIcon,
		PlusSmIcon,
		XIcon,
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		Modal,
	},
	async beforeMount() {
		// document.body.addEventListener('resize',function(){
		// 	console.log("this")
		// })
		// console.log("saha", window)
		await this.$store.dispatch("getMatieres")
		await this.$store.dispatch("getProduits");
		await this.$store.dispatch("getCouleurs");
		await this.$store.dispatch("getTypeproduits");
		// this.couleurs = (await ProduitService.getCouleurs()).data;
		// this.types = (await ProduitService.getTypes()).data;
		// this.getUsers();
	},
	data() {
		return {
			currentPage: 1,
			couleursel: [],
			typesel: [],
			newProduit: {
				description: ''
			},
			mobileFiltersOpen: false,
			api_url: process.env.VUE_APP_API_URL
		};
	},
	methods: {
		
		picturechanged(event) {
			this.newProduit.image = URL.createObjectURL(event.target.files[0]);
		},
		getImageUrl(image) {
			let a = process.env.VUE_APP_API_URL + "uploads/products" + image;
			console.error({ a });
			return a;
		},
		async create() {
			await this.$store.dispatch("addProduit", {
				...this.newProduit,
				image: this.$refs.fileInput.files[0],
			});
			this.$refs.createmodal.open = false;
		},
		pencilCLick() {
			this.$refs.fileInput.click();
		},
		openCreateModal() {
			this.$refs.createmodal.open = true;
		},

		searchfn: debounce(async function (e) {
			this.$store.dispatch("getProduits", {
				nom: e,
				contenance: e,
				CouleurId: this.couleursel,
				TypeProduitId: this.typesel,
			});
		}, 500),
		opendeletemodal(produit) {
			this.$refs.deletemodal.open = true;
			this.$refs.deletemodal.produit = produit;
		},
	},
	computed: {
		currentUser(){
			return this.$store.getters.getCurrentUser;
		},
		txt(){
			return this.newProduit.description?.getText()||true;
		},
		couleurs() {
			return this.$store.getters.getCouleurs;
		},
		types() {
			return this.$store.getters.getTypeproduits;
		},
		produits() {
			return this.$store.getters.getProduits;
		},
		nbperpage() {
			if (window.innerWidth >= 640 && window.innerWidth < 768) return 2 * 5;
			else if (window.innerWidth >= 768 && window.innerWidth < 1280)
				return 3 * 5;
			else if (window.innerWidth > 1280) return 4 * 5;
			else return 6;
		},
		showedProduits() {
			let produits = this.produits;
			if (
				produits.length % this.nbperpage != 0 &&
				parseInt(produits.length / this.nbperpage) == this.currentPage - 1
			)
				return produits.slice((this.currentPage - 1) * this.nbperpage);
			return produits.slice(
				(this.currentPage - 1) * this.nbperpage,
				(this.currentPage - 1) * this.nbperpage + this.nbperpage
			);
		},
	},
	watch: {
		couleursel() {
			this.$store.dispatch("getProduits", {
				nom: this.$refs.searchbar.search,
				contenance: this.$refs.searchbar.search,
				couleur: this.couleursel,
				TypeProduitId: this.typesel,
			});
		},
		typesel() {
			this.$store.dispatch("getProduits", {
				nom: this.$refs.searchbar.search,
				contenance: this.$refs.searchbar.search,
				couleur: this.couleursel,
				TypeProduitId: this.typesel,
			});
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
.diamond.hidden {
	display: none;
}
@media screen and (min-width: 640px) {
	.diamond.sm\:flex {
		display: flex;
	}
}
</style>
