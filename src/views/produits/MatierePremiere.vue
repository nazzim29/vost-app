<template>
	<div
		class="flex flex-col w-full justify-center items-center h-full bg-gray-700 overflow-hidden"
	>
		<div class="flex self-start w-full items-center space-x-3 h-16 py-1 px-2">
			<SearchBar ref="searchbar" @search="searchfn" />
			<div
				class="rounded-full py-2 px-2 bg-gray-500"
				:class="{ hidden: $refs?.searchbar?.open }"
			>
				<FilterIcon
					@click="this.$refs.arrivagemodal.open = true"
					class="h-7 fill-current text-white"
				/>
			</div>
			<div class="rounded-full py-2 px-2 bg-gray-500">
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
					class="w-full h-full grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center items-center"
				>
					<MatiereRow
						v-for="matiere in showedMatieres"
						:key="matiere.id"
						:matiere="matiere"
						@delete="opendeletemodal"
						@show="showProduct"
					/>
				</ul>
			</div>
			<Pagination
				ref="Pagination"
				:currentPage="currentPage"
				:pageSize="nbperpage"
				:dataLength="matieres.length"
				@page="currentPage = $event"
				@next="currentPage++"
				@prev="currentPage--"
				@first="currentPage = 1"
				@last="currentPage = $refs.Pagination.pageNumber"
			/>
		</div>
	</div>
	<Modal ref="createmodal" primaryColor="haja" @submit="create">
		<template v-slot:title>Ajouter une matiere premiere</template>
		<template v-slot:body>
			<div class="flex flex-col w-full flex-1">
				<div class="flex flex-col mt-4 px-2 py-3">
					<div class="flex flex-col w-full">
						<div class="flex flex-col items-start space-y-2 space-x-2 w-ful">
							<label
								for="nom"
								class="flex items-center text-bold h-full rounded-l-md text-md"
								>Nom</label
							>
							<input
								type="text"
								name="designation"
								id="designation"
								v-model="newMatiere.designation"
								placeholder="Nom"
								class="rounded-md border-0 w-3/4"
							/>
						</div>
					</div>
					
				</div>
			</div>
		</template>
		<template v-slot:submit>Ajouter</template>
	</Modal>
    <Modal ref="arrivagemodal" primaryColor="haja" @submit="achat">
        <template v-slot:title>Arrivage Matiere premiere</template>
        <template v-slot:body>
            <!-- show a table with columns matiere,prix unitaire,quantite, total -->
            <table class="table">
                <thead>
                    <tr>
                        <th>Matiere</th>
                        <th>Prix unitaire</th>
                        <th>Quantite</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(matiere,index) in arrivage" :key="index">
                        <td>{{ matieres.find(el=>el.id == matiere.MatiereId).designation}}</td>
                        <td>{{ matiere.prixUnitaire }} Da</td>
                        <td>{{ matiere.quantite }}</td>
                        <td>{{ matiere.prixUnitaire * matiere.quantite }} Da</td>
                    </tr>
                    <!-- add row for entring infos -->
                    <tr class="py-3">
                        <td class="form-control">
                            <select v-model="newArrivage.MatiereId" class="select select-sm py-0 align-middle">
                                <option v-for="matiere in matieres" :key="matiere.id" :value="matiere.id">
                                    {{ matiere.designation }}
                                </option>
                            </select>
                        </td>
                        <td>
                            <input type="number" name="prix" id="prix" v-model="newArrivage.prixUnitaire" placeholder="Prix unitaire" class="rounded-md border-0 w-3/4" />
                        </td>
                        <td>
                            <input type="number" name="quantite" id="quantite" v-model="newArrivage.quantite" placeholder="Quantite" class="rounded-md border-0 w-3/4" />
                        </td>
                        <td>
                           <!-- daisyui button -->
                            <button @click="addArrivage" class="btn btn-primary btn-sm">Ajouter</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template> 
            <template v-slot:submit>Enregistrer</template>

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
} from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/outline";
import SearchBar from "@/components/SearchBar";
import MatiereRow from "@/components/MatiereRow";
import { Icon } from "@iconify/vue";
export default {
	name: "MatieresPremiere",
	components: {
		Pagination,
		Icon,
		SearchBar,
		Dialog,
		DialogOverlay,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		TransitionChild,
		TransitionRoot,
		FilterIcon,
        MatiereRow,
		MinusSmIcon,
		PlusSmIcon,
		XIcon,
		Modal,
	},
	async beforeMount() {
		await this.$store.dispatch("getMatieres");
	},
	data() {
		return {
            arrivage:[],
            newArrivage:{},
			currentPage: 1,
			newMatiere: {
				designation: ''
			},
			mobileFiltersOpen: false,
		};
	},
	methods: {
        achat(){
            this.$store.dispatch("arrivageMatieres",this.arrivage).then(()=>{
                this.arrivage = [];
                this.$refs.arrivagemodal.open = false;
            })
        },
        addArrivage() {
            if(this.newArrivage.MatiereId && this.newArrivage.prixUnitaire && this.newArrivage.quantite){
                this.arrivage.push(this.newArrivage);
                this.newArrivage = {};
            }
        },
		create() {
			this.$store.dispatch("addMatiere", this.newMatiere);
			this.$refs.createmodal.open = false;
		},
		openCreateModal() {
			this.$refs.createmodal.open = true;
		},

		searchfn: debounce(async function (e) {
			this.$store.dispatch("getMatieres", {
				designation: e,
			});
		}, 500),
		opendeletemodal() {
			this.$refs.deletemodal.open = true;
		},
	},
	computed: {
		matieres() {
			return this.$store.getters.getMatieres;
		},
		nbperpage() {
			if (window.innerWidth >= 640 && window.innerWidth < 768) return 2 * 5;
			else if (window.innerWidth >= 768 && window.innerWidth < 1280)
				return 3 * 5;
			else if (window.innerWidth > 1280) return 4 * 5;
			else return 6;
		},
		showedMatieres() {
			let matieres = this.matieres;
			if (
				matieres.length % this.nbperpage != 0 &&
				parseInt(matieres.length / this.nbperpage) == this.currentPage - 1
			)
				return matieres.slice((this.currentPage - 1) * this.nbperpage);
			return matieres.slice(
				(this.currentPage - 1) * this.nbperpage,
				(this.currentPage - 1) * this.nbperpage + this.nbperpage
			);
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
	.diamond.sm\:flex {
		display: flex;
	}
}
</style>
