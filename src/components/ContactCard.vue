<template>
	<div
		:class="[
			'alert w-11/12 bg-gray-300 shadow-md flex flex-col items-start transition-all duration-1000 ease-linear',
			extended ? 'h-fit' : 'h-14 overflow-x-clip',
		]"
	>
		<div class="flex flex-row w-full h-16" @click="extended = !extended">
			<Icon class="text-gray-600" icon="ion:notifications" />
			<span @click="extended = !extended">{{ message.nom }} </span>
		</div>
		<a :href="'mailto:'+message.adresse" class="text-sm font-semibold ">{{
			message.adresse
		}}</a>
		<p>
			{{ message.message }}
		</p>
		<div class="w-full flex flex-row justify-end space-x-3">
			<button
                v-if="currentUser.Profile.Autorisations.find(el=>el.nom == 'update-contactclient')"
				class="btn btn-success btn-sm"
				@click="$store.dispatch('validerFeedback', message)"
			>
				Traité
			</button>
		</div>
	</div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
    name:"ContactCard",
    props:['message'],
	components: {
		Icon,
	},
	data() {
		return {
			extended: false,
		};
	},
    computed:{
        currentUser() {
			return this.$store.getters.getCurrentUser;
		},
    }
};
</script>

<style></style>
