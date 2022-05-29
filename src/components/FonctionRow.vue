<template>
	<Disclosure
		as="li"
		class="bg-white rounded-xl shadow-2xl px-3 py-2 items-center w-10/12"
	>
		<div class="flex flex-row items-center space-x-4 justify-between">
			<div class="w-5 h-5 rounded-md items-start" :style="{'background-color': `#${fonction.couleur}`}"></div>
			<div class="flex flex-row items-center justify-center space-x-2">
				<Icon icon="mdi:account-cash" width="20" height="20" />
				<span class="font-semibold text-gray-800">{{fonction.nom}}</span>
			</div>
			<DisclosureButton v-slot="{ open }" class="">
				<Icon
					icon="entypo:chevron-up"
					:class="{ 'transform rotate-180': !open }"
					width="20"
					height="20"
				/>
			</DisclosureButton>
		</div>
		<TransitionRoot
			enter-active-class="transition-all duration-200 ease"
			enter-from-class="transform h-0 opacity-0"
			enter-to-class="transform h-auto opacity-100"
			leave-active-class="transition-all duration-100 ease"
			leave-from-class="transform h-auto opacity-100"
			leave-to-class="transform h-0 opacity-0"
		>
			<DisclosurePanel
				as="div"
				class="
					flex flex-col
					max-h-48
					w-full
					mt-2
					border-t border-opacity-25 border-gray-600
					items-cetner
					justify-center
				"
			>
				<div
					class="
						flex flex-row flex-wrap
						divide-x divide-blue-800 divide-solid divide-opacity-25
						py-2
					"
				>
					<template
						v-for="autorisation in autorisations"
						:key="autorisation.id"
					>
						<span>
							<input
								type="checkbox"
								v-model="checked"
								class="rounded-md w-4 h-4 focus:ring-0 mr-2"
								:checked="
									fonction.Autorisations?.some((el) => el.id == autorisation.id)
								"
							/>
							{{ autorisation.nom }}</span
						>
					</template>
				</div>
				<button
					class="
						rounded-md
						px-1
						bg-blue-700
						self-end
						w-24
						h-8
						text-center
						font-semibold
						text-white
					"
                    @click="submit"
				>
					Enregistrer
				</button>
			</DisclosurePanel>
		</TransitionRoot>
	</Disclosure>
</template>

<script>
import { Icon } from "@iconify/vue";
import { Disclosure, DisclosureButton, DisclosurePanel,TransitionRoot } from "@headlessui/vue";
export default {
	name: "FonctionRow",
	props: ["autorisations", "fonction"],
	components: {
		Disclosure,
		Icon,
		DisclosureButton,
		DisclosurePanel,
        TransitionRoot
	},
	data() {
		return {
			open: true,
		};
	},
	mounted() {},
    methods:{
        submit(){
            console.log(this.fonction)
        }
    }
};
</script>

<style></style>
