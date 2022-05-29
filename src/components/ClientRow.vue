<template>
	<li
		class="md:w-48 w-64 overflow-hidden flex flex-col divide-y-2 bg-white rounded-md shadow-xs shadow-gray-500 items-center max-h-32 justify-evenly"
	>
		<div
			class="w-4 flex justify-center items-center self-end justify-self-start border-none z-20"
		>
			<Menu as="div" class="h-full" v-if="currentUser.Profile.Autorisations.find(el=>el.nom == 'update-client') || currentUser.Profile.Autorisations.find(el=>el.nom == 'delete-client')">
				<MenuButton class="h-full" @click="extended = !extended">
					<DotsVerticalIcon
						class="h-6 w-6 text-black focus:outline-none transform rotate-90 mr-4"
					/>
				</MenuButton>
				<transition
					enter-active-class="transition duration-100 ease-out"
					enter-from-class="transform scale-95 opacity-0"
					enter-to-class="transform scale-100 opacity-100"
					leave-active-class="transition duration-200 ease-out"
					leave-from-class="transform scale-100 opacity-100"
					leave-to-class="transform scale-95 opacity-0"
				>
					<MenuItems
						class="fixed -ml-28 bg-white shadow-2xl border space-y-2 divide-y divide-gray-300 devide-solid rounded-md py-2 px-0 flex flex-col"
					>
						<div>
							<MenuItem v-if="currentUser.Profile.Autorisations.find(el=>el.nom == 'update-client')">
								<span
									@click="$refs.updateModal.open = true"
									class="w-full hover:bg-gray-300 flex flex-row justify-start items-center px-2 rounded-sm"
								>
									<PencilIcon
										class="h-5 w-5 ml-2 mr-2 text-bold text-blue-800"
									/>
									Editer
								</span>
							</MenuItem>
							<MenuItem v-if="currentUser.Profile.Autorisations.find(el=>el.nom == 'delete-client')">
								<button
									class="w-full hover:bg-gray-300 flex flex-row justify-start items-center px-2 rounded-sm"
									@click="this.$refs.deleteModal.open = true"
								>
									<UserRemoveIcon
										class="h-5 w-5 ml-2 mr-2 text-bold text-red-800"
									/>
									Supprimer
								</button>
							</MenuItem>
						</div>
						<!-- <MenuItem>
							<router-link
								as="button"
								class="w-full hover:bg-gray-300 flex flex-row justify-start items-center px-2 rounded-sm"
								:to="{ name: 'ClientShow', params: { id: client.id } }"
							>
								<UserCircleIcon
									class="h-5 w-5 ml-2 mr-2 text-bold text-blue-800"
								/>
								Profile
							</router-link>
						</MenuItem> -->
					</MenuItems>
				</transition>
			</Menu>
		</div>
		<div class="flex flex-row space-x-2 w-full order-2 -mt-3 px-2">
			<div class="flex flex-col flex-1 items-center">
				<label
					class="text-bold w-full text-center whitespace-nowrap overflow-hidden text-ellipsis"
					>{{ client.raisonSociale }}</label
				>
				<h3 class="text-light text-gray-400 text-sm">
					{{ client.TypeClient.type }}
				</h3>
			</div>
		</div>
		<div class="w-full flex items-center justify-center order-4">
			<label> {{ client.numero }} </label>
		</div>
	</li>
	<Modal ref="updateModal" primaryColor="haja" @submit="updateClient">
		<template v-slot:title>Modifier un client</template>
		<template v-slot:body>
			<div class="flex flex-col w-full pt-16 pb-5 overflow-hidden">
				<div class="flex flex-col space-y-3 mt-4 px-2">
					<div class="flex flex-col w-full space-y-2 space-x-2">
						<label
							class="flex items-center text-bold h-full rounded-l-md text-md"
							>Raison Sociale</label
						>
						<div
							class="flex flex-row items-cente w-auto focus-within:ring-1 rounded-md ring-blue-600 overflow-hidden"
						>
							<input
								type="text"
								name="raison_social"
								id="raison_social"
								v-model="newClient.raisonSociale"
								placeholder="Raison social"
								class="rounded-r-md border-0 focus:ring-0"
							/>
						</div>
					</div>
					<div class="flex flex-col w-full space-y-2 space-x-2">
						<label
							for="numero"
							class="flex items-center text-bold h-full rounded-l-md text-md"
							>Numero</label
						>
						<div
							class="flex flex-row items-cente w-auto focus-within:ring-1 rounded-md ring-blue-600 overflow-hidden"
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
								v-model="newClient.numero"
								placeholder="Numero de telephone"
								class="rounded-r-md border-0 focus:ring-0"
							/>
						</div>
					</div>
					<div class="flex flex-col w-full space-y-2 space-x-2">
						<label
							for="numero"
							class="flex items-center text-bold h-full rounded-l-md text-md"
							>Numero secondaire</label
						>
						<div
							class="flex flex-row items-cente w-auto focus-within:ring-1 rounded-md ring-blue-600"
						>
							<label
								for="numero"
								class="flex items-center uppercase text-bold flex-1 rounded-l-md px-2 bg-gray-200 text-gray-800 text-md border-t border-l border-b"
								>+213</label
							>
							<input
								type="tel"
								name="numero_secondaire"
								id="numero_secondaire"
								v-model="newClient.numeroSecondaire"
								placeholder="Numero de telephone (optionel)"
								class="rounded-r-md border-0 focus:ring-0"
							/>
						</div>
					</div>
					<div class="flex flex-col w-full">
						<div class="flex flex-col items-start w-full space-y-2 space-x-2">
							<label
								for="passwordConfirm"
								class="flex items-center text-bold h-full rounded-l-md text-md"
								>Type</label
							>
							<Listbox v-model="newClient.TypeClientId">
								<div class="relative w-full mx-1 space-x-auto">
									<ListboxButton
										class="h-10 relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm border-1"
									>
										<span class="block truncate">{{
											types.find((el) => el.id == newClient.TypeClientId)
												?.type || "Type"
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
														>{{ f.type }}</span
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
						<div class="flex flex-col items-start space-y-2 space-x-2 w-full">
							<label
								for="password"
								class="flex items-center text-bold h-full rounded-l-md px-2"
								>Mot de passe</label
							>
							<input
								type="password"
								name="password"
								id="password"
								v-model="newClient.password"
								placeholder="Mot de passe"
								class="rounded-md border-0 w-auto"
							/>
						</div>
					</div>
					<div class="flex flex-col w-full">
						<div class="flex flex-col items-start w-max space-y-2 space-x-2">
							<label
								for="passwordConfirm"
								class="flex items-center text-bold h-full rounded-l-md text-md"
								>Confirmation</label
							>
							<input
								type="password"
								name="passwordConfirm"
								id="passwordConfirm"
								v-model="newClient.passwordConfirm"
								placeholder="Confirmation"
								class="rounded-md border-0 w-auto"
							/>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-slot:submit>Ajouter</template>
	</Modal>
	<Modal ref="deleteModal" primaryColor="red-400" @submit="deleteClient">
		<template v-slot:title>Supprimer un client</template>
		<template v-slot:body
			>Etes-vous sur de vouloir supprimer le client
			{{ client.raisonSocial }}</template
		>
		<template v-slot:submit>Supprimer</template>
	</Modal>
</template>

<script>
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/vue";
import Modal from "./Modal.vue";
import {
	DotsVerticalIcon,
	PencilIcon,
	UserRemoveIcon,
	// UserCircleIcon,
} from "@heroicons/vue/outline";
export default {
	components: {
		MenuItems,
		Menu,
		MenuButton,
		MenuItem,
		DotsVerticalIcon,
		PencilIcon,
		UserRemoveIcon,
		// UserCircleIcon,
		Modal,
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
	},
	data() {
		return {
			extended: false,
			newClient: this.client,
		};
	},
	mounted() {},
	props: ["client"],
	methods: {
		async deleteClient() {
			this.$store.dispatch("deleteClient", this.client.id).then(()=>{
				this.$refs.deleteModal.open = false;
				this.$store.dispatch('getClients');
			});
		},
		updateClient(){
			this.$store.dispatch('updateClient',this.newClient)
			this.$refs.updateModal.open = false;
		},
	},
	computed: {
		types() {
			return this.$store.getters.getTypeClients;
		},
		currentUser(){
			return this.$store.getters.getCurrentUser;
		}
	},
};
</script>

<style></style>
