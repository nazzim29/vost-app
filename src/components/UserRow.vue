<template>
	<li
		class="overflow-hidden flex flex-col divide-y-2 space-y-1 bg-white rounded-xl mx-2 shadow-2xl items-center max-h-32"
	>
		<div class="flex flex-row space-x-2 w-full order-2 -mt-3 px-2">
			<img
				class="w-10 h-10 rounded-md overflow-hidden"
				src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
			/>
			<div class="flex flex-col flex-1">
				<label
					class="text-bold w-32 whitespace-nowrap overflow-hidden text-ellipsis"
					>{{ user.nom.toUpperCase() }} {{ user.prenom.toLowerCase() }}</label
				>
				<h3 class="text-light text-gray-400 text-sm">@{{ user.username }}</h3>
			</div>
		</div>
		<div
			class="w-full inline-flex space-x-2 items-center justify-center order-3"
		>
			<Icon
				:icon="user?.Profile?.icon"
				class="h-5 w-5"
				:style="{ color: user?.Profile?.couleur }"
			/>
			<label class="">{{ user?.Profile?.nom }}</label>
		</div>
		<div class="w-full flex items-center justify-center order-4">
			<label> {{ user.numero }} </label>
		</div>
		<div
			class="order-1 w-4 flex justify-center items-center self-end border-none h-5"
		>
			<Menu
				as="div"
				class="h-full"
				v-if="
					currentUser.Profile.Autorisations.find(
						(el) => el.nom == 'update-utilisateur'
					) ||
					currentUser.Profile.Autorisations.find(
						(el) => el.nom == 'delete-utilisateur'
					)
				"
			>
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
							<!-- as="button"
									:to="{ name: 'UserEdit', params: { id: user.id } }" -->
							<MenuItem v-if="currentUser.Profile.Autorisations.find(el=>el.nom == 'update-utilisateur')">
								<button
									@click="$refs.editModal.open = true"
									class="w-full hover:bg-gray-300 flex flex-row justify-start items-center px-2 rounded-sm"
								>
									<PencilIcon
										class="h-5 w-5 ml-2 mr-2 text-bold text-blue-800"
									/>
									Editer
								</button>
							</MenuItem>
							<MenuItem v-if="currentUser.Profile.Autorisations.find(el=>el.nom == 'delete-utilisateur')">
								<button
									class="w-full hover:bg-gray-300 flex flex-row justify-start items-center px-2 rounded-sm"
									@click="$refs.deleteModal.open = true"
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
								class="
									w-full
									hover:bg-gray-300
									flex flex-row
									justify-start
									items-center
									px-2
									rounded-sm
								"
								:to="{ name: 'UserProfile', params: { id: user.id } }"
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
	</li>
	<Modal ref="deleteModal" primaryColor="red-400" @submit="deleteUser">
		<template v-slot:title>Supprimer un utilisateur</template>
		<template v-slot:body
			>Etes-vous sur de vouloir supprimer l'utilisateur
			{{ user.nom.toUpperCase() }}
			{{ user.prenom.toLowerCase() }}</template
		>
		<template v-slot:submit>Supprimer</template>
	</Modal>
	<Modal ref="editModal" primaryColor="haja" @submit="updateUser">
		<template v-slot:title>Ajouter un utilisateur</template>
		<template v-slot:body>
			<div class="flex flex-col w-full py-10">
				<div class="relative mt-20 self-center w-28 h-28">
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
						@change="avatarChanged"
					/>
				</div>
				<div class="flex flex-col space-y-3 mt-4 px-2">
					<div class="flex flex-col w-full space-y-2 space-x-2">
						<label
							class="flex items-center text-bold h-full rounded-l-md text-md"
							>Username</label
						>
						<div
							class="flex flex-row items-cente focus-within:ring-1 rounded-md ring-blue-600 overflow-hidden"
						>
							<label
								for="username"
								class="flex items-center uppercase text-bold rounded-l-md px-2 bg-gray-200 text-gray-800 text-xl border-t border-l border-b"
								>@</label
							>
							<input
								type="text"
								name="username"
								id="username"
								v-model="newUser.username"
								placeholder="Username"
								class="rounded-r-md border-0 focus:ring-0 h-fit"
							/>
						</div>
					</div>
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
								v-model="newUser.nom"
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
								>Prenom</label
							>
							<input
								type="text"
								name="prenom"
								id="prenom"
								v-model="newUser.prenom"
								placeholder="Prenom"
								class="rounded-md border-0 w-3/4"
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
							class="flex flex-row items-cente w-3/4 focus-within:ring-1 rounded-md ring-blue-600"
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
								v-model="newUser.numero"
								placeholder="Numero de telephone"
								class="rounded-r-md border-0 focus:ring-0"
							/>
						</div>
					</div>
					<div class="flex flex-col w-full">
						<div class="flex flex-col items-start w-full space-y-2 space-x-2">
							<label
								for="passwordConfirm"
								class="flex items-center text-bold h-full rounded-l-md text-md"
								>Fonction</label
							>
							<Listbox v-model="newUser.ProfileId">
								<div class="relative w-3/4">
									<ListboxButton
										class="h-10 relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm border-1"
									>
										<span class="block truncate">{{
											fonctions.find(el=>el.id == newUser.ProfileId)?.nom || "Fonction"
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
											class="absolute w-full py-1 mt-1 mb-3 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-left"
										>
											<ListboxOption
												v-slot="{ active, selected }"
												v-for="f in fonctions"
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
														>{{ f.nom }}</span
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
								class="flex items-center text-bold h-full rounded-l-md px-2text-xl"
								>Mot de passe</label
							>
							<input
								type="password"
								name="password"
								id="password"
								v-model="newUser.password"
								placeholder="Mot de passe"
								class="rounded-md border-0 w-3/4"
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
								v-model="newUser.passwordConfirm"
								placeholder="Confirmation"
								class="rounded-md border-0"
							/>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-slot:submit>Enregistrer
		</template>
	</Modal>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/vue";
import {
	CheckIcon,
	SelectorIcon,
} from "@heroicons/vue/solid";
import Modal from "./Modal.vue";
import { Icon } from "@iconify/vue";
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
		UserRemoveIcon,
		// UserCircleIcon,
		Icon,
		Modal,
		PencilIcon,
		CheckIcon,
		SelectorIcon,
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
	},
	data() {
		return {
			extended: false,
			newUser: this.user
		};
	},
	mounted() {},
	props: ["user"],
	methods: {
		async deleteUser() {
			this.$store.dispatch("deleteUser", this.user.id).then(()=>{
				this.$refs.deleteModal.open = false;
				this.$store.dispatch('getUsers')
			});
		},
		updateUser(){
			this.$store.dispatch("updateUser", this.newUser);
			this.$refs.editModal.open = false;

		},
		pencilCLick() {
			this.$refs.fileInput.click();
		},
		avatarChanged() {
			this.$refs.avatarDisplay.src = URL.createObjectURL(
				this.$refs.fileInput.files[0]
			);
		},
	},
	computed: {
		currentUser() {
			return this.$store.getters.getCurrentUser;
		},
		fonctions() {
			return this.$store.getters.getFonctions;
		},
	},
};
</script>

<style></style>
