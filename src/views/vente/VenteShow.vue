<template>
	<div class="h-full w-full items-center justify-center p-2 space-y-5">
		<div class="bg-white rounded-md p-2">
			<Disclosure v-slot="{ open }">
				<DisclosureButton
					class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
				>
					<span>Details de la vente</span>
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
							>Identifiant: {{ isNew ? "Nouvelle vente" : vente.id }}</label
						>
						<div class="flex flex-row items-center space-x-3 w-full">
							<label class="text-md font-semibold">Client:</label>

							
							<span class="text-sm font-medium">
								{{ vente.Client?.raisonSociale }}
							</span>
						</div>
						<div v-if="!isNew">
							<label class="text-md font-semibold"
								>Etat: {{ vente.etat }}</label
							>
						</div>
						<div>
							<label class="text-md font-semibold"
								>Montant: {{ vente.montant }} DZD</label
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
					<span>Details de la vente</span>
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
						
						<table class="w-full table items-center">
							<thead class="w-full flex flex-col">
								
								<tr class="md:grid grid-cols-4 hidden">
									<td class="whitespace-pre-wrap text-center"></td>
									<td class="whitespace-pre-wrap text-center">prix</td>
									<td class="whitespace-pre-wrap text-center">quantité</td>
									<td class="whitespace-pre-wrap text-center"></td>
								</tr>
							</thead>
							<tbody class="grid gap-3">
								<tr
									v-for="produit in [
										...vente.Produits
									]"
									:key="produit"
									class="grid md:grid-cols-4 border-gray-400 border rounded-md bg-gray-200 shadow-md"
								>
									<td class="col-span-1">
										<span
											class="whitespace-pre-wrap text-center flex items-center justify-center"
											>{{ produit.nom }} ({{ produit.contenance }}Kg)</span
										>
									</td>

									<td
										class="col-span-1 whitespace-pre-wrap flex justify-center items-center"
									>
										<span class="md:hidden font-semibold">Prix: </span>
										{{ produit.produits_vente.prix }} DZD
									</td>

									<td
										class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
									>
										<span class="md:hidden font-semibold">Quantité: </span>
										x {{ produit.produits_vente.quantite }}
									</td>
									<td
										class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
									>
										<span class="md:hidden font-semibold">Quantité: </span>
										{{ produit.produits_vente.quantite * produit.produits_vente.quantite }} DZD
									</td>
								</tr>
							<tfoot>
								<tr class="grid md:grid-cols-4">
									<td class="whitespace-pre-wrap text-center"></td>
									<td class="whitespace-pre-wrap text-center"></td>
									<td class="whitespace-pre-wrap text-center">Total</td>
									<td class="whitespace-pre-wrap text-center text-md">{{vente.montant}} DZD</td>
								</tr>
							</tfoot>
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
						<div class="flex flex-row space-x-3">
							<button class="btn self-end btn-primary" @click="addPaiement">
								<PlusIcon class="w-8 h-8 cursor-pointer text-white" />
								<label>Ajouter</label>
							</button>
						</div>
						<table class="w-full table items-center">
							<thead class="w-full flex flex-col">
								<tr v-if="isEditing" class="grid grid-cols-5">
									
									<td class="whitespace-pre-wrap text-center">
										<input
											class="w-full h-full p-2 border-2 border-gray-200 rounded-md text-md"
											v-model="newPaiement.montant"
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
									v-for="produit in vente.Produits"
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
											v-model="produit.produits_vente.prix"
											class="input input-primary w-20 h-6 focus:outline-none text-center"
										/>
										<label class="label items-center">DA</label>
									</td>
									<td
										v-else
										class="col-span-1 whitespace-pre-wrap flex justify-center items-center"
									>
										{{ produit.produits_vente.prix }} DA
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
												@click="produit.produits_vente.quantite--"
											/>
											<input
												:value="produit.produits_vente.quantite"
												@focus="inputgroupfocushandler"
												@blur="inputgroupblurhandler"
												@input="numbersOnly"
												class="input focus:outline-none flex-2 w-16 h-auto text-center peer rounded-none focus:border-0 focus:shadow-none focus:ring-0"
											/>
											<PlusIcon
												class="w-8 h-8 cursor-pointer flex-1"
												@click="produit.produits_vente.quantite++"
											/>
										</label>
									</td>
									<td
										v-else
										class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
									>
										{{ produit.produits_vente.quantite }} KG
									</td>

									<td
										class="col-span-1 whitespace-pre-wrap text-center flex justify-center items-center"
									>
										{{ produit.prix - produit.produits_vente.prix }} DA
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
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/vue";
import {
	ChevronUpIcon,
	// MinusIcon,
	// PlusIcon,
} from "@heroicons/vue/solid";
export default {
	data() {
		return {
			
		};
	},
	methods: {
		numbersOnly(event) {
			if (isNaN(parseInt(event.data)))
				event.target.value = event.target.value.slice(
					0,
					event.target.value.length - 1
				);
		},
		
	},
	components: {
		ChevronUpIcon,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		// MinusIcon,
		// PlusIcon,
	},
	beforeMount() {
			this.$store.dispatch("showVente", this.$route.params.id);
		this.$store.dispatch("getClients");
		this.$store.dispatch("getProduits");
	},
	mounted() {},
	computed: {
		vente() {
			return this.$store.getters.getVente;
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

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type="number"] {
	-moz-appearance: textfield;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
	background: #dfe5fb;
	border: none;
	color: #394066;
	text-transform: lowercase;
	font-variant: small-caps;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
	fill: #394066;
}
</style>
