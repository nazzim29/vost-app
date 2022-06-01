<template>
	<div
		class="h-full w-full items-center justify-center p-2 space-y-5"
		style="font-family: Roboto"
	>
		<div class="flex flex-row justify-end items-center p-1 h-16">
      <!-- <button
					class="btn self-end btn-primary"
					@click="downloadBon"
				>
					<label>Bon d'encaissement</label>
				</button> -->
    </div>
		<div class="card glass overflow-visible">
			<div class="card-body">
				<!-- <h2 class="card-title">#{{ commande.id }}</h2> -->
				<div class="flex md:flex-row flex-col h-full gap-3">
					<div
						class="rounded-md w-full md:w-16 h-16 flex flex-row py-2 px-1 hover:scale-110 hover:shadow-2xl hover:mx-3 transition-all duration-300 items-center"
						style="background-color: #ffee00"
						v-if="!isNew"
					>
						<span class="text-md font-semibold text-gray-600 mx-auto">
							{{ paiement.id }}
						</span>
					</div>
					<div
						class="rounded-md w-full md:w-2/6 h-16 flex flex-row py-2 px-1 hover:scale-110 hover:shadow-2xl hover:mx-3 transition-all duration-300 items-center"
						style="background-color: #ffee00"
					>
						<div
							class="p-2 rounded-full bg-white justify-self-start"
							style="background-color: rgba(255, 255, 255, 0.4)"
						>
							<Icon icon="akar-icons:person" class="w-10 h-10 text-gray-600" />
						</div>
						<Combobox v-if="isNew" v-model="newPaiement.Client">
							<div class="relative mt-1">
								<div
									class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
								>
									<ComboboxInput
										class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
										:displayValue="(person) => person.raisonSociale"
										@change="queryClient = $event.target.value"
									/>
									<ComboboxButton
										class="absolute inset-y-0 right-0 flex items-center pr-2"
									>
										<SelectorIcon
											class="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</ComboboxButton>
								</div>
								<TransitionRoot
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
									@after-leave="queryClient = ''"
								>
									<ComboboxOptions
										class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
									>
										<div
											v-if="filtredClients.length === 0 && queryClient !== ''"
											class="relative cursor-default select-none py-2 px-4 text-gray-700"
										>
											Nothing found.
										</div>

										<ComboboxOption
											v-for="person in filtredClients"
											as="template"
											:key="person.id"
											:value="person"
											v-slot="{ selected, active }"
										>
											<li
												class="relative cursor-default select-none py-2 pl-10 pr-4"
												:class="{
													'bg-teal-600 text-white': active,
													'text-gray-900': !active,
												}"
											>
												<span
													class="block truncate"
													:class="{
														'font-medium': selected,
														'font-normal': !selected,
													}"
												>
													{{ person.raisonSociale }}
												</span>
												<span
													v-if="selected"
													class="absolute inset-y-0 left-0 flex items-center pl-3"
													:class="{
														'text-white': active,
														'text-teal-600': !active,
													}"
												>
													<CheckIcon class="h-5 w-5" aria-hidden="true" />
												</span>
											</li>
										</ComboboxOption>
									</ComboboxOptions>
								</TransitionRoot>
							</div>
						</Combobox>
						<span v-else class="text-md font-semibold text-gray-600 mx-auto">
							{{ paiement.Client?.raisonSociale }}
						</span>
					</div>
					
					<div
						class="rounded-md w-full md:w-1/4 h-16 flex flex-row py-2 px-1 hover:scale-110 hover:shadow-2xl transition-all duration-300 hover:mx-3 items-center"
						style="background-color: #ffee00"
					>
						<div
							class="p-2 rounded-full bg-white justify-self-start"
							style="background-color: rgba(255, 255, 255, 0.4)"
						>
							<Icon
								icon="fa-solid:cash-register"
								class="w-9 h-9 text-gray-600"
							/>
						</div>
						<span class="text-md font-semibold text-gray-600 mx-auto">
							{{ montantTotal || 0 }}
							DZD</span
						>
					</div>
				</div>
				<button
					class="btn self-end btn-primary"
					v-if="isEditing"
					@click="savePaiement"
				>
					<label>Enregistrer</label>
				</button>
			</div>
		</div>
		<div class="w-full">
			<div class="bg-white rounded-md p-2">
				<Disclosure v-slot="{ open }">
					<DisclosureButton
						class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
					>
						<span>Liste des ventes</span>
						<ChevronUpIcon
							:class="open ? 'rotate-180 transform' : ''"
							class="h-5 w-5 text-purple-500"
						/>
					</DisclosureButton>
					<DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
						<transition
							enter-active-class="transition duration-100 ease-out"
							enter-from-class="transform scale-95 opacity-0"
							enter-to-class="transform scale-100 opacity-100"
							leave-active-class="transition duration-75 ease-out"
							leave-from-class="transform scale-100 opacity-100"
							leave-to-class="transform scale-95 opacity-0"
						>
							<DisclosurePanel
								class="w-full p-5 space-y-3 bg-white flex flex-col"
							>
								<table class="w-full table items-center">
									<thead class="w-full flex flex-col">
										<tr class="md:grid grid-cols-4 hidden" v-if="isNew">
											<td class="whitespace-pre-wrap text-center col-span-1">
												<Listbox v-model="newVente">
													<div class="relative mt-1 h-full">
														<ListboxButton
															class="relative h-full w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
														>
															<span class="block truncate">{{
																newVente.id
															}}</span>
															<span
																class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
															>
																<SelectorIcon
																	class="h-5 w-5 text-gray-400"
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
																class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
															>
																<ListboxOption
																	v-slot="{ active, selected }"
																	v-for="person in ventes"
																	:key="person.id"
																	:value="{...person,ventes_payement:{montant:0},}"
																	as="template"
																>
																	<li
																		:class="[
																			active
																				? 'bg-amber-100 text-amber-900'
																				: 'text-gray-900',
																			'relative cursor-default select-none py-2 pl-10 pr-4',
																		]"
																	>
																		<span
																			:class="[
																				selected
																					? 'font-medium'
																					: 'font-normal',
																				'block truncate',
																			]"
																			>{{ person.id }}</span
																		>
																		<span
																			v-if="selected"
																			class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
																		>
																			<CheckIcon
																				class="h-5 w-5"
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
											<td class="whitespace-pre-wrap text-center">
												<input
													type="number"
													v-model="newVente.ventes_payement.montant"
													class="w-full text-center"
                          :max="newVente.montant - newVente.versement"
                          min="0"
												/>
											</td>
											<td class="whitespace-pre-wrap text-center">
												<div class="align-middle">
													{{
														newVente.montant -
															(newVente.versement +
																newVente.ventes_payement.montant) || 0
													}}
													DZD
												</div>
											</td>
											<td class="whitespace-pre-wrap text-center">
												<button
													class="btn self-end btn-primary"
													@click="newPaiement.Ventes.push(newVente); newVente = {ventes_payement:{montant:0},};"
												>
													<label>Ajouter</label>
												</button>
											</td>
										</tr>
										<tr class="md:grid grid-cols-4 hidden">
											<td class="whitespace-pre-wrap text-center"></td>
											<td class="whitespace-pre-wrap text-center">Montant</td>
											<td class="whitespace-pre-wrap text-center">
												Reste a payer
											</td>
											<td class="whitespace-pre-wrap text-center">Etat</td>
										</tr>
									</thead>
									<tbody class="grid gap-3">
										<tr
											class="grid md:grid-cols-4 border-gray-400 border rounded-md bg-gray-200 shadow-md"
											v-for="vente in isNew
												? newPaiement.Ventes
												: paiement.Ventes"
											:key="vente.id"
										>
											<td class="col-span-1">
												<span
													class="whitespace-pre-wrap text-center flex items-center justify-center"
													>{{ vente?.id }}</span
												>
											</td>

											<td
												class="col-span-1 whitespace-pre-wrap flex justify-center items-center"
											>
												<span class="font-semibold">
													{{ vente?.montant }} DZD
												</span>
											</td>

											<td
												class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
											>
												<span class="font-semibold"
													>{{ vente.montant - vente.versement }} DZD</span
												>
											</td>
											<td
												class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
											>
												<span class="font-semibold">{{ vente.etat }}</span>
											</td>
										</tr>
										<tfoot>
								<tr class="grid md:grid-cols-4">
									<td class="whitespace-pre-wrap text-center"></td>
									<td class="whitespace-pre-wrap text-center"></td>
									<td class="whitespace-pre-wrap text-center">Total</td>
									<td class="whitespace-pre-wrap text-center text-md">{{montantTotal}} DZD</td>
								</tr>
							</tfoot>
									</tbody>
								</table>
							</DisclosurePanel>
						</transition>
						<!-- <div class="flex-1 flex flex-col h-full w-full overflow-hidden">
              <div
                class="h-full md:justify-center aligned-center w-full flex flex-1 flex-col overflow-auto overflow-x-hidden py-3"
              >
                <table
                  class="bg-white rounded-md mx-1 grid grid-flow-row overflow-hidden text-black my-auto"
                >
                  <thead>
                    <tr class="w-full grid grid-flow-col">
                      <th class="px-2 py-2 col-span-1 hidden md:block"></th>
                      <th class="px-4 py-2 col-span-1">Montant</th>
                      <th class="px-4 py-2 col-span-1">Reste a payer</th>
                      <th class="px-4 py-2 col-span-1">Etat</th>
                    </tr>
                  </thead>
                  <tbody class="w-full grid grid-flow-row overflow-auto">
                    <router-link
                      :to="{ name: 'Vente', params: { id: 41 } }"
                      class="border-b border-gray-400 w-full grid grid-flow-col grid-cols-3 md:grid-cols-4 items-center justify-center text-center odd:bg-slate-200 text-black"
                    >
                      <td class="px-4 py-2 col-span-1 hidden md:block">
                        <span class="font-medium"> vente?.id </span>
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium">
                          vente?.Client?.raisonSociale
                        </span>
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium">vente?.montant</span>
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium"> vente?.etat </span>
                      </td>
                    </router-link>
                    <router-link
                      v-for="vente in showedVentes"
                      :key="vente.id"
                      :to="{ name: 'Vente', params: { id: vente.id } }"
                      class="border-b border-gray-400 w-full grid grid-flow-col grid-cols-3 md:grid-cols-4 items-center justify-center text-center odd:bg-slate-200 text-black"
                    >
                      <td class="px-4 py-2 col-span-1 hidden md:block">
                        <span class="font-medium">{{ vente?.id }}</span>
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium">{{
                          vente?.Client?.raisonSociale
                        }}</span>
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium"
                          >{{ vente?.montant || 0 }} Da</span
                        >
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium">{{ vente?.etat }}</span>
                      </td>
                    </router-link>
                  </tbody>
                </table>
              </div>
              <Pagination
                ref="Pagination"
                :currentPage="currentPage"
                :pageSize="nbperpage"
                :dataLength="ventes.length"
                @page="currentPage = $event"
                @next="currentPage++"
                @prev="currentPage--"
                @first="currentPage = 1"
                @last="currentPage = $refs.Pagination.pageNumber"
              />
            </div> -->
					</DisclosurePanel>
				</Disclosure>
			</div>
		</div>
	</div>
</template>

<script>
// import {} from "@heroicons/vue/solid";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOptions,
	ComboboxOption,
  Listbox,
  
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { ChevronUpIcon,CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { Icon } from "@iconify/vue";
// import fileDownload from "js-file-download";
// import Api from "@/services/api";
// import { Buffer } from "buffer";
export default {
	data() {
		return {
			errorFileModal: false,
			queryClient: "",
			newPaiement: {
				Ventes: [],
			},
			newVente: {
				ventes_payement: {
					montant: 0,
				},
			},
			isEditing: false,
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
    downloadBon(){

    },
		startEditMode() {
			this.isEditing = true;
		},
    savePaiement(){
      this.$store.dispatch("addPaiement",this.newPaiement).then(()=>{
        this.$router.goBack()
      })
    }
	},
	components: {
		ChevronUpIcon,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Icon,
		Combobox,
		ComboboxButton,
		ComboboxInput,
		ComboboxOptions,
		ComboboxOption,
    Listbox,
  
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  CheckIcon, SelectorIcon
	},
	beforeMount() {
		if (!this.isNew)
			this.$store.dispatch("showPaiement", this.$route.params.id);
		else {
			this.isEditing = true;
		}
		this.$store.dispatch("getClients");
	},
	watch: {
		"newPaiement.Client": function () {
			this.$store.dispatch("getVentes", {
				ClientId: this.newPaiement.Client.id,
			});
		},
	},
	computed: {
		currentUser() {
			return this.$store.getters.getCurrentUser;
		},
    montantTotal(){
      if(!this.isNew) {
        console.log('heu')
        return this.paiement.Ventes.reduce((acc,vente)=>{
          return acc + vente.montant
        },0)
      }
      return this.newPaiement.Ventes.reduce((acc,vente)=>{
        return acc + vente.ventes_payement.montant
      },0)
      
    },
		filtredClients() {
			return this.$store.getters.getClients.filter((client) => {
				return client.raisonSociale
					.toLowerCase()
					.includes(this.queryClient.toLowerCase());
			});
		},
		ventes() {
			return this.$store.getters.getVentes.filter((vente) => {
				return vente.montant - vente.versement > 0 && this.newPaiement.Ventes.some(ventePayement=>ventePayement.id == vente.id) == false;
			});
		},
		isNew() {
			return this.$route.params.id == "new";
		},
    paiement(){
      return this.$store.getters.getPaiement
    }
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
