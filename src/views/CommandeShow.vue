<template>
	<div class="h-full w-full items-center justify-center p-2 space-y-5">
		<div class="bg-white rounded-md p-2">
			<Disclosure v-slot="{ open }">
				<DisclosureButton
					class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
				>
					<span>Details de la commande</span>
					<ChevronUpIcon
						:class="open ? 'transform rotate-180' : ''"
						class="w-5 h-5 text-blue-500 transition-transform duration-100"
					/>
				</DisclosureButton>
				<transition
					enter-active-class="transition duration-100 ease-out"
					enter-from-class="transform scale-95 opacity-0"
					enter-to-class="transform scale-100 opacity-100"
					leave-active-class="transition duration-75 ease-out"
					leave-from-class="transform scale-100 opacity-100"
					leave-to-class="transform scale-95 opacity-0"
				>
					<DisclosurePanel
						class="flex flex-col flex-wrap w-full p-5 space-y-3 bg-white"
					>
						<label class="text-md font-semibold"
							>Identifiant: {{ commande.id }}</label
						>
						<div class="flex flex-row items-center space-x-3 w-full">
							<label class="text-md font-semibold">Client</label>
							<Listbox v-model="commande.Client">
								<div class="relative w-52">
									<ListboxButton
										class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
									>
										<span class="block truncate">{{
											commande.Client?.raisonSociale
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
											class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
										>
											<ListboxOption
												v-slot="{ active, selected }"
												v-for="client in clients"
												:key="client.id"
												:value="client"
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
														>{{ client.raisonSociale }}</span
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
						<div>
							<label class="text-md font-semibold"
								>Etat: {{ commande.etat }}</label
							>
						</div>
					</DisclosurePanel>
				</transition>
			</Disclosure>
		</div>
		<div class="bg-white rounded-md p-2">
			<Disclosure v-slot="{ open }">
				<DisclosureButton
					class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
				>
					<span>Details de la commande</span>
					<ChevronUpIcon
						:class="open ? 'transform rotate-180' : ''"
						class="w-5 h-5 text-blue-500 transition-transform duration-100"
					/>
				</DisclosureButton>
				<transition
					enter-active-class="transition duration-100 ease-out"
					enter-from-class="transform scale-95 opacity-0"
					enter-to-class="transform scale-100 opacity-100"
					leave-active-class="transition duration-75 ease-out"
					leave-from-class="transform scale-100 opacity-100"
					leave-to-class="transform scale-95 opacity-0"
				>
					<DisclosurePanel class="w-full p-5 space-y-3 bg-white flex flex-col">
						<div v-if="isEditing" class="flex flex-row space-x-3">
							<button class="btn self-end btn-primary" @click="save">
								<label>Enregistrer</label>
							</button>
							<button class="btn self-end btn-primary" @click="addProduct">
								<PlusIcon class="w-8 h-8 cursor-pointer text-white" />
								<label>Ajouter</label>
							</button>
						</div>
						<div v-else class="flex flex-row space-x-3 justify-end">
							<button class="btn btn-secondary" @click="startEditMode">
								<label>Modifier</label>
							</button>
						</div>
						<table class="w-full table items-center">
							<thead class="w-full flex flex-col">
								<tr v-if="isEditing" class="grid grid-cols-5">
									<td class="whitespace-pre-wrap text-center col-span-2">
										<Listbox v-model="newProduct.produit">
											<div class="relative w-full">
												<ListboxButton
													class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
												>
													<span class="block truncate">{{
														newProduct.produit?.nom || "Produits..."
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
														class="absolute w-max py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
													>
														<ListboxOption
															v-slot="{ active, selected }"
															v-for="product in products"
															:key="product.id"
															:value="product"
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
																	>{{ product.nom }} ({{
																		product.contenance
																	}}kg)</span
																>
																<span
																	v-if="selected"
																	class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
																>
																	<CheckIcon
																		class="w-5 h-5"
																		aria-hidden="true"
																	/>
																</span>
															</li>
														</ListboxOption>
													</ListboxOptions>
												</transition>
											</div>
										</Listbox>
									</td>
									<td class="whitespace-pre-wrap text-center ">
										<input
											disabled
											class="w-full h-full p-2 border-2 border-gray-200 rounded-md text-md"
											:value="(newProduct.produit?.contenance || 0) + ' Da'"
										/>
									</td>
									<td class="whitespace-pre-wrap text-center ">
										<input
											type="number"
											class="w-full p-2 border-2 border-gray-200 rounded-md text-md"
											v-model="newProduct.produits_commande.prix"
											placeholder="Prix..."
										/>
									</td>
									<td class="whitespace-pre-wrap text-center">
										<input
											type="number"
											class="w-full p-2 border-2 border-gray-200 rounded-md text-md"
											v-model="newProduct.produits_commande.quantite"
											placeholder="Quantité..."
										/>
									</td>
								</tr>
								<tr class="grid grid-cols-5">
									<td class="whitespace-pre-wrap text-center"></td>
									<td class="whitespace-pre-wrap text-center">prix initiale</td>
									<td class="whitespace-pre-wrap text-center">prix</td>
									<td class="whitespace-pre-wrap text-center">quantité</td>
									<td class="whitespace-pre-wrap text-center">remise</td>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="produit in commande.Produits"
									:key="produit"
									class="grid grid-cols-5"
								>
									<td
										class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
									>
										{{ produit.nom }} ({{ produit.contenance }}Kg)
									</td>
									<td
										class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
									>
										{{ produit.prix }} DA
									</td>

									<td
										v-if="isEditing"
										class="col-span-1 text-center flex flex-row py-4 form-control items-center justify-center"
									>
										<input
											v-model="produit.produits_commande.prix"
											class="input input-primary w-20 h-6 focus:outline-none text-center"
										/>
										<label class="label items-center">DA</label>
									</td>
									<td
										v-else
										class="col-span-1 whitespace-pre-wrap flex justify-center items-center"
									>
										{{ produit.produits_commande.prix }} DA
									</td>

									<td
										v-if="isEditing"
										class="col-span-1 text-center flex flex-row py-4 form-control items-center justify-center"
									>
										<label
											class="inline-flex overflow-hidden rounded-lg bg-gray-400 justify-evenly"
											:class="{}"
										>
											<MinusIcon
												class="cursor-pointer h-8 w-8 flex-1"
												@click="produit.produits_commande.quantite--"
											/>
											<input
												:value="produit.produits_commande.quantite"
												@focus="inputgroupfocushandler"
												@blur="inputgroupblurhandler"
												@input="isNaN(parseInt($event.data))?($event.target.value = $event.target.value.slice(0,$event.target.value.length - 1)): null"
												class="input focus:outline-none flex-2 w-16 h-auto text-center peer rounded-none focus:border-0 focus:shadow-none focus:ring-0"
											/>
											<PlusIcon
												class="w-8 h-8 cursor-pointer flex-1"
												@click="produit.produits_commande.quantite++"
											/>
										</label>
									</td>
									<td
										v-else
										class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
									>
										{{ produit.produits_commande.quantite }} KG
									</td>

									<td
										class="col-span-1 whitespace-pre-wrap text-center flex justify-center items-center"
									>
										{{ produit.prix - produit.produits_commande.prix }} DA
									</td>
								</tr>
							</tbody>
						</table>
					</DisclosurePanel>
				</transition>
			</Disclosure>
		</div>
		<div class="bg-white rounded-md p-2">
			<Disclosure v-slot="{ open }">
				<DisclosureButton
					class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
				>
					<span>Paiements</span>
					<ChevronUpIcon
						:class="open ? 'transform rotate-180' : ''"
						class="w-5 h-5 text-blue-500 transition-transform duration-100"
					/>
				</DisclosureButton>
				<transition
					enter-active-class="transition duration-100 ease-out"
					enter-from-class="transform scale-95 opacity-0"
					enter-to-class="transform scale-100 opacity-100"
					leave-active-class="transition duration-75 ease-out"
					leave-from-class="transform scale-100 opacity-100"
					leave-to-class="transform scale-95 opacity-0"
				>
					<DisclosurePanel class="w-full p-5 space-y-3 bg-white flex flex-col">
						<div v-if="isEditing" class="flex flex-row space-x-3">
							<button class="btn self-end btn-primary" @click="addPaiement">
								<PlusIcon class="w-8 h-8 cursor-pointer text-white" />
								<label>Ajouter</label>
							</button>
						</div>
						<table class="w-full table items-center">
							<thead class="w-full flex flex-col">
								<tr v-if="isEditing" class="grid grid-cols-5">
									<td class="whitespace-pre-wrap text-center col-span-2">
										<Listbox v-model="commande.produit">
											<div class="relative w-full">
												<ListboxButton
													class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
												>
													<span class="block truncate">{{
														newProduct.produit?.nom || "Produits..."
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
														class="absolute w-max py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
													>
														<ListboxOption
															v-slot="{ active, selected }"
															v-for="product in products"
															:key="product.id"
															:value="product"
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
																	>{{ product.nom }} ({{
																		product.contenance
																	}}kg)</span
																>
																<span
																	v-if="selected"
																	class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
																>
																	<CheckIcon
																		class="w-5 h-5"
																		aria-hidden="true"
																	/>
																</span>
															</li>
														</ListboxOption>
													</ListboxOptions>
												</transition>
											</div>
										</Listbox>
									</td>
									<td class="whitespace-pre-wrap text-center ">
										<input
											disabled
											class="w-full h-full p-2 border-2 border-gray-200 rounded-md text-md"
											:value="(newProduct.produit?.contenance || 0) + ' Da'"
										/>
									</td>
									<td class="whitespace-pre-wrap text-center ">
										<input
											type="number"
											class="w-full p-2 border-2 border-gray-200 rounded-md text-md"
											v-model="newProduct.produits_commande.prix"
											placeholder="Prix..."
										/>
									</td>
									<td class="whitespace-pre-wrap text-center">
										<input
											type="number"
											class="w-full p-2 border-2 border-gray-200 rounded-md text-md"
											v-model="newProduct.produits_commande.quantite"
											placeholder="Quantité..."
										/>
									</td>
								</tr>
								<tr class="grid grid-cols-5">
									<td class="whitespace-pre-wrap text-center"></td>
									<td class="whitespace-pre-wrap text-center">prix initiale</td>
									<td class="whitespace-pre-wrap text-center">prix</td>
									<td class="whitespace-pre-wrap text-center">quantité</td>
									<td class="whitespace-pre-wrap text-center">remise</td>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="produit in commande.Produits"
									:key="produit"
									class="grid grid-cols-5"
								>
									<td
										class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
									>
										{{ produit.nom }} ({{ produit.contenance }}Kg)
									</td>
									<td
										class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
									>
										{{ produit.prix }} DA
									</td>

									<td
										v-if="isEditing"
										class="col-span-1 text-center flex flex-row py-4 form-control items-center justify-center"
									>
										<input
											v-model="produit.produits_commande.prix"
											class="input input-primary w-20 h-6 focus:outline-none text-center"
										/>
										<label class="label items-center">DA</label>
									</td>
									<td
										v-else
										class="col-span-1 whitespace-pre-wrap flex justify-center items-center"
									>
										{{ produit.produits_commande.prix }} DA
									</td>

									<td
										v-if="isEditing"
										class="col-span-1 text-center flex flex-row py-4 form-control items-center justify-center"
									>
										<label
											class="inline-flex overflow-hidden rounded-lg bg-gray-400 justify-evenly"
											:class="{}"
										>
											<MinusIcon
												class="cursor-pointer h-8 w-8 flex-1"
												@click="produit.produits_commande.quantite--"
											/>
											<input
												:value="produit.produits_commande.quantite"
												@focus="inputgroupfocushandler"
												@blur="inputgroupblurhandler"
												@input="isNaN(parseInt($event.data))?($event.target.value = $event.target.value.slice(0,$event.target.value.length - 1)): null"
												class="input focus:outline-none flex-2 w-16 h-auto text-center peer rounded-none focus:border-0 focus:shadow-none focus:ring-0"
											/>
											<PlusIcon
												class="w-8 h-8 cursor-pointer flex-1"
												@click="produit.produits_commande.quantite++"
											/>
										</label>
									</td>
									<td
										v-else
										class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
									>
										{{ produit.produits_commande.quantite }} KG
									</td>

									<td
										class="col-span-1 whitespace-pre-wrap text-center flex justify-center items-center"
									>
										{{ produit.prix - produit.produits_commande.prix }} DA
									</td>
								</tr>
							</tbody>
						</table>
					</DisclosurePanel>
				</transition>
			</Disclosure>
		</div>
	</div>
</template>

<script>
import {} from "@heroicons/vue/solid";
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/vue";
import {
	CheckIcon,
	SelectorIcon,
	ChevronUpIcon,
	MinusIcon,
	PlusIcon,
} from "@heroicons/vue/solid";
export default {
	data() {
		return {
			query: "",
			isEditing: false,
			newProduct: {
				produit: null,
				produits_commande: {
					prix: null,
					quantite: null,
				},
			},
		};
	},
	methods: {
		inputgroupfocushandler(e) {
			e.target.parentNode.classList.add("border");
			e.target.parentNode.classList.add("border-primary");
			// e.target.parentNode.classList.add('border-blue-500')
		},
		inputgroupblurhandler(e) {
			e.target.parentNode.classList.remove("border");
			e.target.parentNode.classList.remove("border-primary");
			// e.target.parentNode.classList.add('border-blue-500')
		},
		startEditMode() {
			this.isEditing = true;
		},
	},
	components: {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		CheckIcon,
		SelectorIcon,
		ChevronUpIcon,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		MinusIcon,
		PlusIcon,
	},
	beforeMount() {
		this.$store.dispatch("showCommande", this.$route.params.id);
		this.$store.dispatch("getClients");
		this.$store.dispatch("getProduits");
	},
	mounted() {},
	computed: {
		commande() {
			return this.$store.getters.getCommande;
		},
		clients() {
			const r = this.$store.getters.getClients;
			return r.sort(function compare(a, b) {
				if (a.raisonSociale < b.raisonSociale) {
					return -1;
				}
				if (a.raisonSociale > b.raisonSociale) {
					return 1;
				}
				return 0;
			});
		},
		products() {
			return this.$store.getters.getProduits;
		},
	},
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type="number"] {
	-moz-appearance: textfield;
}
</style>
