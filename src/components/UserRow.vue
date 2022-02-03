<template>
	<li
		class="
			overflow-hidden
			flex flex-col
			divide-y-2
			space-y-1
			bg-white
			rounded-xl
			mx-2
			shadow-2xl
			items-center
			max-h-32
		"
	>
		<div class="flex flex-row space-x-2 w-full order-2 -mt-3 px-2">
			<img
				class="w-10 h-10 rounded-md overflow-hidden"
				src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
			/>
			<div class="flex flex-col flex-1">
				<label class="text-bold"
					>{{ user.nom.toUpperCase() }} {{ user.nom.toLowerCase() }}</label
				>
				<h3 class="text-light text-gray-400 text-sm">@{{ user.username }}</h3>
			</div>
		</div>
		<div class="w-full inline-flex space-x-2 items-center justify-center order-3">
			<Icon :icon="user?.Profile?.icon" class="h-5 w-5" :style="{color: user?.Profile?.couleur}"  />
			<label class="">{{ user?.Profile?.nom }}</label>
		</div>
		<div class="w-full flex items-center justify-center order-4">
			<label> {{ user.numero }} </label>
		</div>
		<div
			class="order-1 w-4 flex justify-center items-center self-end border-none"
		>
			<Menu as="div" class="h-full">
				<MenuButton class="h-full" @click="extended = !extended">
					<DotsVerticalIcon
						class="
							h-6
							w-6
							text-black
							focus:outline-none
							transform
							rotate-90
							mr-4
						"
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
						class="
							fixed
							-ml-28
							bg-white
							shadow-2xl
							border
							space-y-2
							divide-y divide-gray-300
							devide-solid
							rounded-md
							py-2
							px-0
							flex flex-col
						"
					>
						<div>
							<MenuItem>
								<router-link
									as="button"
									:to="{ name: 'UserEdit', params: { id: user.id } }"
									class="
										w-full
										hover:bg-gray-300
										flex flex-row
										justify-start
										items-center
										px-2
										rounded-sm
									"
								>
									<PencilIcon
										class="h-5 w-5 ml-2 mr-2 text-bold text-blue-800"
									/>
									Editer
								</router-link>
							</MenuItem>
							<MenuItem>
								<button
									class="
										w-full
										hover:bg-gray-300
										flex flex-row
										justify-start
										items-center
										px-2
										rounded-sm
									"
									@click="this.$emit('delete', this.user)"
								>
									<UserRemoveIcon
										class="h-5 w-5 ml-2 mr-2 text-bold text-red-800"
									/>
									Supprimer
								</button>
							</MenuItem>
						</div>
						<MenuItem>
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
						</MenuItem>
					</MenuItems>
				</transition>
			</Menu>
		</div>
	</li>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {Icon} from "@iconify/vue";
import {
	DotsVerticalIcon,
	PencilIcon,
	UserRemoveIcon,
	UserCircleIcon,
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
		UserCircleIcon,
		Icon
	},
	data() {
		return {
			extended: false,
		};
	},
	mounted() {
		console.log(this.user);
	},
	props: ["user"],
	methods: {},
};
</script>

<style></style>
