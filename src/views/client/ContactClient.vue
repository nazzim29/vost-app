<template>
	<div
		class="flex flex-col w-full h-screen items-center bg-gray-700 overflow-hidden space-y-1"
	>
		<div class="flex self-start w-full items-center space-x-3 h-16 py-1 px-2 mb-10">
			<SearchBar ref="searchbar" @search="searchfn" />
		</div>
		<template v-if="messages.length != 0">
			<ContactCard
				v-for="message in messages"
				:key="message.id"
				:message="message"
			/>
		</template>
		<template v-else>
			<div class="flex flex-col flex-1 items-center justify-center">
				<div class="text-center text-gray-400">
					<h1 class="text-4xl font-bold">Aucun message a afficher !</h1>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { debounce } from "lodash";
import ContactCard from "@/components/ContactCard";
import SearchBar from "@/components/SearchBar";
export default {
	name: "ContactClient",
	components: {
		ContactCard,
		SearchBar
	},
	beforeMount() {
		this.$store.dispatch("getFeedbacks");
	},
	data() {
		return {};
	},
	computed: {
		messages() {
			return this.$store.getters.getFeedbacks;
		},
	},
	methods:{
		searchfn: debounce(async function () {
			this.$store.dispatch("getFeedbacks", {
				nom: this.$refs.searchbar.search,
				prenom: this.$refs.searchbar.search,
				message: this.$refs.searchbar.search,
				adresse: this.$refs.searchbar.search,	
			});
		}, 500),
	}
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
