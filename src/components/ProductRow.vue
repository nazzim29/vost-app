<template>
	<div
		:class="[
			'h-72 w-full bg-white mx-auto rounded-md  flex flex-row overflow-hidden xl:max-h-80 transition-all duration-200 ease-linear',
			extended && 'md:col-span-2',
		]"
	>
		<div :class="['flex flex-col h-full transition-all duration-200 ease-linear', extended ? 'w-1/4' : 'w-full']">
			<img
				:src="imageUrl"
				@click="toggleExtended"
				class="w-full h-1/2 object-cover flex-1 xl:object-center "
			/>
			<div class="w-full rounded-t-md transition-all duration-200 ease-linear">
				<div
					:style="{ 'background-color': `#${produit.Couleur.code}` }"
					class="w-full object-fit relative flex flex-col"
				>
					<div class="w-full flex p-1 flex-row justify-between">
						<Icon
							v-if="currentUser.Profile.Autorisations.find(el=>el.nom == 'update-produit')"
							icon="ic:baseline-favorite"
							class="h-5 w-5"
							:class="{
								'text-red-400': produit.featured,
								'text-gray-300': !produit.featured,
							}"
							@click="togglefeatured"
						/>
						<Icon
							v-if="currentUser.Profile.Autorisations.find(el=>el.nom == 'update-produit')"
							icon="bi:brush"
							class="h-5 w-5 text-gray-600"
							@click="this.$refs.editmodal.open = true"
						/>
						<Icon
							v-if="currentUser.Profile.Autorisations.find(el=>el.nom == 'delete-produit')"
							icon="clarity:archive-line"
							class="h-5 w-5 text-red-600"
							@click="this.$refs.deletemodal.open = true"
						/>
					</div>
					<span class="font-bold w-full text-lg text-center transition-all duration-200 ease-linear">{{
						produit.nom
					}}</span>
				</div>
			</div>
			<div class="flex flex-row w-full p-2 divide-x-2 h-1/4">
				<div class="flex flex-col h-full w-1/3 justify-center items-center">
					<label class="text-xl font-bold text-black antialiased">{{
						produit.prix || "0"
					}}</label>
					<label class="text-sm font-light text-gray-500 antialiased"
						>DZD</label
					>
				</div>
				<div class="flex flex-col h-full w-1/3 justify-center items-center">
					<label class="text-xl font-bold text-black antialiased">{{
						produit.contenance
					}}</label>
					<label class="text-sm font-light text-gray-500 antialiased"
						>Litres</label
					>
				</div>
				<div class="flex flex-col h-full w-1/3 justify-center items-center">
					<label class="text-xl font-bold text-black antialiased">{{
						produit.quantite || "0"
					}}/{{produit.quantiteCommande || 0}}</label>
					<label class="text-sm font-light text-gray-500 antialiased"
						>Unités</label
					>
				</div>
			</div>
		</div>
		<div class="flex-1 w-3/4 transition-all duration-700 ease-linear" v-if="extended">
			<div class="w-full flex-row flex justify-between p-2">
				<h1 class="font-semibold font-md ml-2 ">Formule</h1>
				<button class="btn btn-sm btn-primary" @click="isEditingFormule = !isEditingFormule" v-if="!isEditingFormule && currentUser.Profile.Autorisations.find(el=>el.nom == 'update-formule')">Modifier</button>
				<div class="flex flex-row space-x-2" v-if="isEditingFormule">
					<!-- save btn an cancel btn -->
					<button
						class="btn btn-sm btn-primary"
						@click="saveFormule"
					>Enregistrer</button>

				</div>
			</div>
			<table class="table w-full">
				<!--show matiere,matiere -->
				<thead>
					<tr>
						<th>Matiere</th>
						<th>quantité</th>
						<th v-if="isEditingFormule">Actions</th>
					</tr>
				</thead>
				<tbody class="overflow-y-auto">
					<tr v-for="(matiere, index) in produit.Matieres" :key="index">
						<td>{{ matiere.designation }}</td>
						<td class="w-16">{{ matiere.Formule.quantite }}</td>
						<td v-if="isEditingFormule" class="">
							<button
								class="btn btn-sm btn-error"
								@click="removeMatiere(matiere)"
							>
								Supprimer
							</button>
						</td>
					</tr>
					<tr v-if="isEditingFormule">
						<td class="form-control">
							<select
								v-model="newFormule.MatiereId"
								class="select select-sm select-bordered px-3 py-0 w-32"
							>
								<option v-for="matiere in matieres.filter(el=> !produit.Matieres.find(p=>p.id == el.id) && !newProduit.Matieres.find(p=>p.id == el.id))" :key="matiere.id" :value="matiere.id">
									{{ matiere.designation }}
								</option>
							</select>
						</td>
						<td class="">
							<input type="number" class="input input-sm input-bordered w-20" v-model="newFormule.quantite" />
						</td>
						<td>
							<button
								class="btn btn-sm btn-primary"
								@click="addMatiere"
							>
								Ajouter
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<Modal ref="deletemodal" primaryColor="haja" @submit="deleteproduit">
			<template v-slot:title>Archiver un produit</template>
			<template v-slot:text
				>Etes-vous sur de vouloir archiver le produit {{ produit.id }}</template
			>
			<template v-slot:submit>archiver</template>
		</Modal>
		<Modal ref="editmodal" primaryColor="haja" @submit="update">
			<template v-slot:title>Modifier un produit</template>
			<template v-slot:body>
				<div class="flex flex-col w-full pb-5 overflow-y-auto">
					<div class="relative mt-5 self-center mx-4">
						<img
							ref="avatarDisplay"
							class="w-full object-fit h-full rounded-md overflow-hidden"
							src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
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
									for="prix"
									class="flex items-center text-bold h-full rounded-l-md px-2text-xl"
									>Prix</label
								>
								<input
									type="number"
									name="Prix"
									id="Prix"
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
									<div class="relative w-full">
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
										ref="quill"
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
			<template v-slot:submit>Enregistrer</template>
		</Modal>
	</div>
</template>

<script>
import { Icon } from "@iconify/vue";
import Modal from "./Modal";
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/vue";
import { QuillEditor } from "@vueup/vue-quill";
export default {
	name: "ProductRow",
	props: ["produit"],
	components: {
		QuillEditor,
		Icon,
		Modal,
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
	},
	data() {
		return {
			newProduit: this.produit,
			extended: false,
			isEditingFormule:false,
			newFormule:{}
		};
	},
	methods: {
		toggleExtended() {
			console.log("extended");
			if(this.extended){
				this.isEditingFormule = false;
			}
			this.extended = !this.extended;
		},
		saveFormule(){
			if(this.isEditingFormule){
				this.isEditingFormule = false;
			}
		},
		addMatiere(){
			console.log(this.newProduit.id)
			if(this.newFormule.MatiereId && this.newFormule.quantite){
				this.$store.dispatch("addFormule",{
					MatiereId:this.newFormule.MatiereId,
					quantite:this.newFormule.quantite,
					ProduitId:this.newProduit.id
				})
				this.newFormule = {}
			}
		},
		removeMatiere({Formule}){
			this.$store.dispatch('removeFormule',{MatiereId:Formule.MatiereId,ProduitId:Formule.ProduitId})
		},
		deleteproduit() {
			console.log(this.produit.id);
			this.$store.dispatch("deleteProduit", this.produit.id);
			this.$refs.modal.open = false;
			this.searchfn("");
		},
		async togglefeatured() {
			this.newProduit.featured = !this.newProduit.featured;
			this.$store.dispatch("updateProduit", this.newProduit);
		},
		async update() {
			this.$store.dispatch("updateProduit", this.newProduit);
			this.$refs.editmodal.open = false;
		},
	},
	computed: {
		imageUrl() {
			console.log(process.env);
			return (
				process.env.VUE_APP_API_URL +
				"/uploads/products/" +
				this.newProduit.image
			);
		},
		matieres(){
			return this.$store.getters.getMatieres;
		},
		couleurs() {
			return this.$store.getters.getCouleurs;
		},
		types() {
			return this.$store.getters.getTypeproduits;
		},
		currentUser() {
			return this.$store.getters.getCurrentUser;
		},
	},
};
</script>

<style></style>
