<template>
	<div class="flex flex-col w-full bg-gray-700 gap-3">
		<div class="flex card bg-base-100 shadow-xl md:mt-16 md:mx-12 mx-2 mt-8">
			<div class="card-body w-full">
				<h2 class="card-title">Profile client</h2>
				<div
					class="grid md:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-1 w-full p-0 md:px-3"
				>
					<div class="flex flex-col space-y-0.5 w-full">
						<label class="flex items-center text-bold rounded-l-md text-md"
							>Raison Sociale</label
						>
						<div
							class="flex flex-row items-cente w-full focus-within:ring-1 rounded-md"
						>
							<input
								type="text"
								name="raison_social"
								id="raison_social"
								placeholder="Raison social"
								v-model="client.raisonSociale"
								v-if="isEditing"
								class="rounded-md border-gray-200 w-full focus:ring-0"
							/>
							<label
								class="rounded-md font-semibold border-gray-200 w-full focus:ring-0"
								v-else
								>{{ client.raisonSociale }}</label
							>
						</div>
					</div>
					<div class="flex flex-col items-start space-y-0.5 w-full">
						<label
							for="TypeClient"
							class="flex items-center text-bold rounded-l-md text-md"
							>Type</label
						>
						<Listbox v-model="client.TypeClient.id" v-if="isEditing">
							<div class="relative w-full mx-1 space-x-auto">
								<ListboxButton
									class="h-10 relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm border-1"
								>
									<span class="block truncate">{{
										types.find((el) => el.id == client.TypeClientId)?.type ||
										"Type"
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
										class="absolute mt-1 w-11/12 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-left"
									>
										<ListboxOption
											v-slot="{ active, selected }"
											v-for="f in types"
											:key="f.id"
											:value="f.id"
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
													>{{ f?.type }}</span
												>
												<span
													v-if="selected"
													class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
												>
													<!-- <CheckIcon class="w-5 h-5" aria-hidden="true" /> -->
												</span>
											</li>
										</ListboxOption>
									</ListboxOptions>
								</transition>
							</div>
						</Listbox>
						<label
							class="rounded-md font-semibold border-gray-200 w-full focus:ring-0"
							v-else
							>{{ client.TypeClient?.type }}</label
						>
					</div>
					<div class="flex flex-col space-y-0.5 w-full">
						<label
							for="numero"
							class="flex items-center text-bold h-full rounded-l-md text-md"
							>Numero</label
						>
						<div
							class="flex flex-row items-cente w-full focus-within:ring-1 rounded-md ring-blue-600 border"
							v-if="isEditing"
						>
							<label
								for="numero"
								class="flex items-center uppercase text-bold rounded-l-md px-2 bg-gray-200 text-gray-800 text-md border-t border-l border-b"
								>+213</label
							>

							<input
								type="tel"
								name="numero"
								id="numero"
								v-model="client.numero"
								placeholder="Numero de telephone"
								class="rounded-r-md border-0 focus:ring-0"
							/>
						</div>
						<label
							v-else
							class="rounded-md font-semibold border-gray-200 w-full focus:ring-0"
						>
							<a :href="'tel:' + client.numero">{{ client.numero }}</a>
							{{ client.numeroSecondaire ? " / " : "" }}
							<a
								v-if="client.numeroSecondaire"
								:href="'tel:' + client.numeroSecondaire"
								>{{ client.numeroSecondaire }}</a
							>
						</label>
					</div>
					<div class="flex flex-col space-y-0.5 w-full">
						<label
							class="flex items-center text-bold h-full rounded-l-md text-md"
							>NIF</label
						>
						<div
							class="flex flex-row items-cente w-full focus-within:ring-1 rounded-md"
						>
							<input
								type="text"
								v-if="isEditing"
								name="nif"
								id="nif"
								placeholder="NIF"
								v-model="client.nif"
								class="rounded-md border-gray-200 w-full focus:ring-0"
							/>
							<span
								class="rounded-md font-semibold border-gray-200 w-full focus:ring-0"
								v-else
								>{{ client.nif }}</span
							>
						</div>
					</div>
					<div class="flex flex-col space-y-0.5 w-full">
						<label
							class="flex items-center text-bold h-full rounded-l-md text-md"
							>NIS</label
						>
						<div
							class="flex flex-row items-cente w-full focus-within:ring-1 rounded-md"
						>
							<input
								type="text"
								v-if="isEditing"
								name="nis"
								id="nis"
								placeholder="NIS"
								v-model="client.nis"
								class="rounded-md border-gray-200 w-full focus:ring-0"
							/>
							<span
								class="rounded-md font-semibold border-gray-200 w-full focus:ring-0"
								v-else
								>{{ client.nis }}</span
							>
						</div>
					</div>
					<div class="flex flex-col space-y-0.5 w-full">
						<label
							class="flex items-center text-bold h-full rounded-l-md text-md"
							>Nom d'utilisateur</label
						>
						<div
							class="flex flex-row items-cente w-full focus-within:ring-1 rounded-md"
						>
							<input
								type="text"
								v-if="isEditing"
								name="username"
								id="username"
								placeholder="Nom d'utilisateur"
								v-model="client.username"
								class="rounded-md border-gray-200 w-full focus:ring-0"
							/>
							<span
								class="rounded-md font-semibold border-gray-200 w-full focus:ring-0"
								v-else
								>{{ client.username }}</span
							>
						</div>
					</div>
					<div
						class="flex flex-col items-start space-y-1 w-full"
						v-if="isEditing"
					>
						<label
							for="password"
							class="flex items-center text-bold h-full rounded-l-md px-2"
							>Mot de passe</label
						>
						<input
							type="password"
							name="password"
							id="password"
							v-model="client.password"
							placeholder="Mot de passe"
							class="rounded-md border-gray-200 w-full"
						/>
					</div>
					<div
						class="flex flex-col items-start space-y-1 w-full"
						v-if="isEditing"
					>
						<label
							for="passwordConfirm"
							class="flex items-center text-bold h-full rounded-l-md text-md"
							>Confirmation</label
						>
						<input
							type="password"
							name="passwordConfirm"
							id="passwordConfirm"
							v-model="client.passwordConfirm"
							placeholder="Confirmation"
							class="rounded-md border-gray-200 w-full"
						/>
					</div>
					<div
						class="flex flex-col items-start space-y-1 w-full"
						v-if="client.id && !isEditing"
					>
						<label
							for="passwordConfirm"
							class="flex items-center text-bold h-full rounded-l-md text-md"
							>Solde Actuelle</label
						>
						<label
							class="rounded-md font-semibold border-gray-200 w-full focus:ring-0"
							>{{ client.dettes }}</label
						>
					</div>
				</div>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" @click="submit">
						{{
							client.id ? (isEditing ? "enregistrer" : "modifier") : "ajouter"
						}}
					</button>
				</div>
			</div>
		</div>
		<div class="md:mx-12 mx-2" v-if="client.id && !isEditing">
			<div class="bg-white rounded-xl p-2 mb-10">
				<Disclosure v-slot="{ open }">
					<DisclosureButton
						class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
					>
						<span>Liste des paiements</span>
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
										<tr class="md:grid grid-cols-3 hidden">
											<td class="whitespace-pre-wrap text-center"></td>
											<td class="whitespace-pre-wrap text-center">
												Date de paiement
											</td>
											<td class="whitespace-pre-wrap text-center">Montant</td>
											<!-- <td class="whitespace-pre-wrap text-center">
												Reste a payer
											</td> -->
										</tr>
									</thead>
									<tbody class="grid gap-3">
										<tr
											class="grid md:grid-cols-3 border-gray-400 border rounded-md bg-gray-200 shadow-md"
											v-for="paiement in client.Payements"
											:key="paiement.id"
										>
											<td class="col-span-1">
												<span
													class="whitespace-pre-wrap text-center flex items-center justify-center"
													>{{ paiement?.id }}</span
												>
											</td>

											<td
												class="col-span-1 whitespace-pre-wrap flex justify-center items-center"
											>
												<span class="font-semibold">
													{{ formatDate(paiement?.date) }}
												</span>
											</td>

											<td
												class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
											>
												<span class="font-semibold"
													>{{ paiement?.montant_total }} DZD</span
												>
											</td>
											<!-- <td
												class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
											>
												<span class="font-semibold">reste a p calcul</span>
											</td> -->
										</tr>

										<!-- <tfoot>
								<tr class="grid md:grid-cols-4">
									<td class="whitespace-pre-wrap text-center"></td>
									<td class="whitespace-pre-wrap text-center"></td>
									<td class="whitespace-pre-wrap text-center">Total</td>
									<td class="whitespace-pre-wrap text-center text-md">{{paiement.montant}} DZD</td>
								</tr>
							</tfoot> -->
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
                        <span class="font-medium"> paiement?.id </span>
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium">
                          paiement?.Client?.raisonSociale
                        </span>
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium">paiement?.montant</span>
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium"> paiement?.etat </span>
                      </td>
                    </router-link>
                    <router-link
                      v-for="paiement in showedVentes"
                      :key="paiement.id"
                      :to="{ name: 'Vente', params: { id: paiement.id } }"
                      class="border-b border-gray-400 w-full grid grid-flow-col grid-cols-3 md:grid-cols-4 items-center justify-center text-center odd:bg-slate-200 text-black"
                    >
                      <td class="px-4 py-2 col-span-1 hidden md:block">
                        <span class="font-medium">{{ paiement?.id }}</span>
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium">{{
                          paiement?.Client?.raisonSociale
                        }}</span>
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium"
                          >{{ paiement?.montant || 0 }} Da</span
                        >
                      </td>
                      <td class="px-4 py-2 col-span-1">
                        <span class="font-medium">{{ paiement?.etat }}</span>
                      </td>
                    </router-link>
                  </tbody>
                </table>
              </div>
              <Pagination
                ref="Pagination"
                :currentPage="currentPage"
                :pageSize="nbperpage"
                :dataLength="paiements.length"
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
		<div class="md:mx-12 mx-2" v-if="client.id && !isEditing">
			<div class="bg-white rounded-xl p-2 mb-10">
				<div class="inline-flex items-center justify-evenly w-full">

					<h3 class="text-lg font-bold text-center my-2">
						Nombre de Bon {{ client.stats?.count_vente }}
					</h3>
					<h3 class="text-lg font-bold text-center my-2">
						Total Versement {{ client.stats?.totalVersement }} DA
					</h3>
					<h3 class="text-lg font-bold text-center my-2">
						Solde {{ client.stats?.solde }} DA
					</h3>
				</div>
				<div class="inline-flex gap-2 p-2 items-center justify-evenly w-full">
					<div class="inline-flex gap-2 items-center">
						<label>Debut:</label>
						<input
							type="date"
							v-model="startDate"
							@change="updateStat"
							class="rounded-md"
						/>
					</div>
					<div class="inline-flex gap-2 items-center">
						<label>Fin: </label>
						<input
							type="date"
							v-model="endDate"
							@change="updateStat"
							class="rounded-md"
						/>
					</div>
				</div>
				<div
					class="flex flex-wrap -m-2 gap-3 px-4 py-2 divide-x-2 divide-dashed divide-slate-900"
				>
					<ul
						v-for="column in statsColumns"
						:key="column.id"
						class="flex flex-col gap-2 max-w-max pl-3"
					>
						<il class="text-xl font-semibold text-gray-500 uppercase">{{
							column.nom
						}}</il>
						<li
							v-for="p in client.stats.produits.filter(
								(el) => el.TypeProduitId == column.id
							)"
							:key="p.id"
						>
							{{ p.nom }} x {{ p.quantite }}
						</li>
						<li class="text-gray-400 font-bold text-md">
							Total:
							{{
								client.stats.produits
									.filter((el) => el.TypeProduitId == column.id)
									.reduce((sum, e) => sum + e.quantite, 0)
							}}
						</li>
					</ul>
				</div>
			</div>
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
import moment from "moment";
import { SelectorIcon, ChevronUpIcon } from "@heroicons/vue/solid";
export default {
	data() {
		return {
			isEditing: false,
			startDate: null,
			endDate: null,
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
		submit() {
			// add client
			if (this.isEditing)
				if (!this.client.id)
					this.$store.dispatch("addClient", this.client).then((res) => {
						console.log({ res });
						this.$router.push(`/clients/${res.data.id}`);
					});
				else
					this.$store.dispatch("updateClient", this.client).then(() => {
						this.isEditing = false;
					});
			else this.isEditing = true;
		},
		updateStat() {
			this.$store.dispatch("fetchStat", {
				id: this.client.id,
				startDate: moment(this.startDate).toISOString(),
				endDate: moment(this.endDate).toISOString(),
			});
		},
		// format date using moment
		formatDate(date) {
			return moment(date).format("DD/MM/YYYY");
		},
	},
	components: {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		SelectorIcon,
		ChevronUpIcon,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
	},
	beforeMount() {
		this.$store.dispatch("getTypeClients");
		this.startDate = moment().startOf("M").format("YYYY-MM-DD");
		this.endDate = moment().endOf("M").format("YYYY-MM-DD");
		const id = this.$route.params.id;
		if (!id) {
			this.isEditing = true;
		} else {
			this.$store.dispatch("showClient", id);
		}
	},
	// mounted() {
	// 	console.log("client",this.client)

	// },

	computed: {
		currentUser() {
			return this.$store.getters.getCurrentUser;
		},
		types() {
			return this.$store.getters.getTypeClients;
		},
		client: {
			set: function (value) {
				this.$store.commit("showClient", value);
			},
			get: function () {
				return this.$store.getters.getClient;
			},
		},
		statsColumns() {
			let columns = [];
			this.client.stats.produits.forEach((elem) => {
				if (columns.includes(elem.TypeProduit)) return;
				columns.push(elem.TypeProduit);
			});
			console.log({ columns });
			return columns;
		},
	},
};
</script>
<style lang="scss" scoped></style>
