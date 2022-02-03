<template>
	<div
		class="
			flex flex-col
			w-full
			justify-center
			items-center
			h-full
			bg-gray-700
			overflow-hidden
		"
	>
		<div class="flex self-start w-full items-center space-x-3">
			<SearchBar ref="searchbar" @search="searchfn" />
			<div class="rounded-full py-2 px-2 mt-4 bg-gray-500" :class="{hidden: refs?.searchbar?.open}">
				<FilterIcon
					@click="mobileFiltersOpen = !mobileFiltersOpen"
					class="h-7 fill-current text-white"
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
								class="
									ml-auto
									relative
									max-w-xs
									w-full
									h-full
									bg-gray-900
									shadow-xl
									py-4
									pb-12
									flex flex-col
									overflow-y-auto
								"
							>
								<div class="px-4 flex items-center justify-between">
									<h2 class="text-lg font-medium text-gray-300">Filters</h2>
									<button
										type="button"
										class="
											-mr-2
											w-7
											h-7
											bg-gray-800
											p-1
											rounded-md
											flex
											items-center
											justify-center
											text-gray-400
										"
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
												class="
													px-2
													py-3
													bg-gray-700
													w-full
													flex
													items-center
													justify-between
													text-gray-400
													hover:text-gray-200
												"
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
													class="
														h-4
														w-4
														border-gray-400
														rounded
														text-blue-600
														focus:ring-blue-500
													"
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
												class="
													px-2
													py-3
													bg-gray-700
													w-full
													flex
													items-center
													justify-between
													text-gray-400
													hover:text-gray-200
												"
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
													class="
														h-4
														w-4
														border-gray-400
														rounded
													"
                                                    :style="{'--tw-ring-color' : `#${couleur.code}`,color:`#${couleur.code}`}"
													v-model="couleursel"
												/>
												<label class="ml-3 min-w-0 flex-1 " :style="{color:`#${couleur.code}`}">
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
			<div class="h-full justify-center aligned-center w-full flex flex-1 flex-col overflow-auto overflow-x-hidden py-2">
				<ul class="w-full grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center items-center overflow-y-auto overflow-hidden">
					<!-- 
                        //todo: product row
                     -->
					<ProductRow
						v-for="produit in showedProduits"
						:key="produit.id"
						:produit="produit"
						@delete="opendeletemodal"
					/>
				</ul>
			</div>
			<div
				class="
                    py-1.5
					self-end
					flex flex-row
					w-full
					justify-center
					items-center
				"
			>
				<ul class="flex flex-row items-center justify-evenly space-x-3">
					<li class="diamond bg-blue-800 p-0.5 rounded-md text-white hidden sm:flex">
						<div>
							<ChevronDoubleLeftIcon
								class="h-5"
								@click="firstpage"
								:disabled="currentPage == 1"
							/>
						</div>
					</li>
					<li class="diamond bg-blue-800 p-0.5 rounded-md text-white">
						<div>
							<ChevronLeftIcon
								class="h-5"
								@click="prevpage"
								:disabled="currentPage == 1"
							/>
						</div>
					</li>
					<div v-if="!(nbperpage < 10 && i != currentPage)" class="flex flex-row space-x-3 items-center justify-center px-3 overflow-hidden">
						<li
							v-for="i in pageNumber"
							:key="i"
                            :class="{hidden: i != currentPage,'sm:flex': i != currentPage,'bg-blue-500': i == currentPage,'bg-blue-800': i!=currentPage}"
							class="diamond p-0.5 h-5 w-5 rounded-md text-white"
						>
							<div class="flex items-center justify-center">{{ i }}</div>
						</li>

					</div>
					<div v-else class="flex flex-row space-x-3 items-center justify-center px-3 overflow-hidden">
						<li
							class="diamond bg-blue-800 p-0.5 h-5 w-5 rounded-md text-white"
						>
							<div class="flex items-center justify-center">{{ currentPage }}</div>
						</li>
					</div>
					<li class="diamond bg-blue-800 p-0.5 rounded-md text-white">
						<div>
							<ChevronRightIcon
								class="h-5"
								@click="nextpage"
								:disabled="currentPage == pageNumber"
							/>
						</div>
					</li>
					<li class="diamond bg-blue-800 p-0.5 rounded-md text-white hidden sm:flex">
						<div>
							<ChevronDoubleRightIcon
								class="h-5"
								@click="lastpage"
								:disabled="currentPage == pageNumber"
							/>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<Modal ref="deletemodal" primaryColor="haja" @submit="deleteproduit">
		<template v-slot:title>Archiver un produit</template>
		<template v-slot:text="slotProps"
			>Etes-vous sur de vouloir archiver le produit
			{{ slotProps.produit.id }}</template
		>
		<template v-slot:submit>archiver</template>
	</Modal>
</template>

<script>
import Modal from "@/components/Modal";
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
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
} from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/outline";
import SearchBar from "@/components/SearchBar";
import ProduitService from "@/services/ProduitService";
import ProductRow from '@/components/ProductRow';
export default {
	name: "Produits",
	components: {
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
		ChevronDoubleLeftIcon,
		ChevronDoubleRightIcon,
		ChevronLeftIcon,
		ChevronRightIcon,
		Modal,
	},
	async mounted() {
		this.produits = (await ProduitService.get()).data;
		this.couleurs = (await ProduitService.getCouleurs()).data;
		this.types = (await ProduitService.getTypes()).data;
		// this.getUsers();
	},
	data() {
		return {
			currentPage: 1,
			produits: [],
			couleursel: [],
			typesel: [],
			mobileFiltersOpen: false,
			couleurs: [],
			types: [],
		};
	},
	methods: {
		prevpage(){
			if(this.currentPage == 1) return;
			this.currentPage--;
		},
		nextpage(){
			if(this.currentPage == this.pageNumber) return;
			this.currentPage++;
		},
		firstpage(){
			if(this.currentPage == 1) return;
			this.currentPage = 1;
		},
		lastpage(){
			if(this.currentPage == this.pageNumber) return;
			this.currentPage = this.pageNumber;
		},
		searchfn: debounce(async function (e) {
			this.users = (
				await ProduitService.get({
					TypeProduitId: this.typesel || "",
					CouleurId: this.couleursel || "",
					featured: e || "",
					contenance: e || "",
					prix: e || "",
					quantite: e || "",
				})
			).data;
		}, 500),
		opendeletemodal(produit) {
			this.$refs.deletemodal.open = true;
			this.$refs.deletemodal.produit = produit;
		},
		async deleteproduit(produit) {
			console.log(produit.id);
			await ProduitService.destroy(produit.id);
			this.$refs.modal.open = false;
			this.searchfn("");
		},
	},
	computed: {
        // searchopen(){
        //     console.log(this.$refs)
        //     return this.$refs.searchbar.open
        // },
        nbperpage(){
            if(window.innerWidth >= 640 && window.innerWidth < 768)
                return 2*5;
            else if(window.innerWidth >= 768 && window.innerWidth < 1280)
                return 3*5
            else if(window.innerWidth > 1280)
                return 4*5;
            else
                return 1*5
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
		pageNumber() {
			let nb = this.produits.length / this.nbperpage;
			if (this.produits.length % this.nbperpage != 0) nb++;
			return parseInt(nb);
		},
	},
	watch: {
	
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

    .diamond.sm\:flex{
        display:flex;
    }
}
</style>
