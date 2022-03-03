<template>
	<div
		class="flex flex-col w-full h-screen bg-gray-700 overflow-hidden space-y-1"
	>
		<div
			class="flex self-start w-full items-center space-x-3 h-16 py-1 px-2 md:items-center"
		>
			<SearchBar ref="searchbar" @search="searchfn" />
			<div class="rounded-full py-2 px-2 bg-gray-500">
				<FilterIcon
					@click="mobileFiltersOpen = !mobileFiltersOpen"
					class="h-7 fill-current text-white"
				/>
			</div>
			<div class="rounded-full py-2 px-2 bg-gray-500">
				<Icon
					icon="ant-design:user-add-outlined"
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

								<!-- Filters -->
								<form class="mt-4 border-t border-gray-400">
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
														Fonctions
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
											<div v-if="fonctions?.length > 0" class="space-y-6">
												<div
													v-for="fonction in fonctions"
													:key="fonction.id"
													class="flex items-center"
												>
													<input
														:value="fonction.id"
														type="checkbox"
														:checked="fonction.checked"
														class="h-4 w-4 border-gray-400 rounded text-blue-600 focus:ring-blue-500"
														v-model="fonctionsel"
													/>
													<label class="ml-3 min-w-0 flex-1 text-gray-500">
														{{ fonction.nom }}
													</label>
												</div>
											</div>
										</DisclosurePanel>
									</Disclosure>
								</form>
							</div>
						</TransitionChild>
					</Dialog>
				</TransitionRoot>
			</div>
		</div>
		<div class="flex-1 flex flex-col overflow-hidden">
			<div
				v-if="showedusers?.length != 0"
				class="w-full flex flex-1 flex-col overflow-y-auto"
			>
				<ul
					class="w-full h-full grid grid-rows-10 md:grid-cols-4 space-y-2 md:space-y-0 items-center"
				>
					<UserRow
						v-for="user in showedusers"
						:key="user.id"
						:user="user"
						@delete="openModal"
					/>
				</ul>
			</div>
			<Pagination
				ref="Pagination"
				:currentPage="currentPage"
				:pageSize="nbperpage"
				:dataLength="users.length"
				@page="currentPage = $event"
				@next="currentPage++"
				@prev="currentPage--"
				@first="currentPage = 1"
				@last="currentPage = $refs.Pagination.pageNumber"
			/>
		</div>
	</div>
	<Modal ref="createModal" primaryColor="haja" @submit="addUser">
		<template v-slot:title>Ajouter un utilisateur</template>
		<template v-slot:body>
			<div class="flex flex-col w-full pb-5 overflow-y-auto">
				<div class="relative mt-5 self-center w-28 h-28">
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
							class="flex flex-row items-cente w-3/4 focus-within:ring-1 rounded-md ring-blue-600"
						>
							<label
								for="username"
								class="flex items-center uppercase text-bold h-full rounded-l-md px-2 bg-gray-200 text-gray-800 text-xl border-t border-l border-b"
								>@</label
							>
							<input
								type="text"
								name="username"
								id="username"
								v-model="newUser.username"
								placeholder="Username"
								class="rounded-r-md border-0 focus:ring-0"
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
								class="flex items-center uppercase text-bold h-full rounded-l-md px-2 bg-gray-200 text-gray-800 text-md border-t border-l border-b"
								>+213</label
							>
							<input
								type="text"
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
											newUser?.fonction?.nom || "Fonction"
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
		<template v-slot:submit>Ajouter</template>
	</Modal>
</template>

<script>
import Modal from "@/components/Modal";
import { debounce } from "lodash";
import Pagination from "@/components/Pagination";
import {
	Dialog,
	DialogOverlay,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	TransitionChild,
	TransitionRoot,
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/vue";
import {
	MinusSmIcon,
	PlusSmIcon,
	FilterIcon,
	CheckIcon,
	SelectorIcon,
} from "@heroicons/vue/solid";
import { XIcon, PencilIcon } from "@heroicons/vue/outline";
import SearchBar from "@/components/SearchBar";
// import UserService from "@/services/UserService";
import UserRow from "@/components/UserRow";
import { Icon } from "@iconify/vue";
export default {
	name: "UsersIndex",
	components: {
		Pagination,
		SearchBar,
		Dialog,
		DialogOverlay,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		UserRow,
		TransitionChild,
		TransitionRoot,
		FilterIcon,
		MinusSmIcon,
		PlusSmIcon,
		XIcon,
		Modal,
		Icon,
		PencilIcon,
		CheckIcon,
		SelectorIcon,
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
	},
	async beforeMount() {
		// $(window).on('resize',this.)
		await this.$store.dispatch("getUsers");
		await this.$store.dispatch("getFonctions");
	},
	data() {
		return {
			newUser: {},
			fonctionsel: [],
			currentPage:1,
			mobileFiltersOpen: false,
			subCategories: [],
			subcategorytitle: "hey",
		};
	},
	methods: {
		searchfn: debounce(function (e) {
			this.$store.dispatch("getUsers", {
				ProfileId: this.fonctionsel,
				nom: e,
				prenom: e,
				username: e,
				numero: e,
			});
		}, 500),
		openModal(user) {
			this.$refs.modal.open = true;
			this.$refs.modal.user = user;
		},
		
		pencilCLick() {
			this.$refs.fileInput.click();
		},
		avatarChanged() {
			this.$refs.avatarDisplay.src = URL.createObjectURL(
				this.$refs.fileInput.files[0]
			);
		},
		openCreateModal() {
			this.$refs.createModal.open = true;
		},
		addUser() {
			this.$store.dispatch("addUser", this.newUser);
			this.$refs.createModal.open = false;
		},
	},
	computed: {
		users() {
			return this.$store.getters.getUsers;
		},
		nbperpage() {
			if (window.innerWidth >= 640 && window.innerWidth < 768) return 2 * 5;
			else if (window.innerWidth >= 768 && window.innerWidth < 1280) return 16;
			else if (window.innerWidth > 1280) return 4 * 5;
			else return 1 * 5;
		},
		filters() {
			return [
				{
					id: "nom",
					name: "Fonctions",
					options: this.fonctions,
				},
			];
		},
		showedusers() {
			let cp = this.$refs?.Pagination?.currentPage || 1;
			let users = this.users;
			if (!users) return [];
			return users.slice((cp - 1) * this.nbperpage, cp * this.nbperpage);
		},

		fonctions() {
			return this.$store.getters.getFonctions;
		},
	},
	watch: {
		fonctionsel: function () {
			this.$store.dispatch("getUsers", {
				...(this.fonctionsel.length != 0 && { ProfileId: this.fonctionsel }),
				...(this.$refs.searchbar.search != "" && {
					nom: this.$refs.searchbar.search,
				}),
				...(this.$refs.searchbar.search != "" && {
					prenom: this.$refs.searchbar.search,
				}),
				...(this.$refs.searchbar.search != "" && {
					username: this.$refs.searchbar.search,
				}),
				...(this.$refs.searchbar.search != "" && {
					numero: this.$refs.searchbar.search,
				}),
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
</style>
