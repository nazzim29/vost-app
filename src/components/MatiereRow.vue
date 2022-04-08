<template>
	<div
		class="h-fit min-h-max p-2 w-11/12 bg-white mx-auto rounded-md flex flex-col overflow-hidden max-w-xs"
	>
		<div class="w-full rounded-t-md space-x-3">
			<div
				class="w-full object-fit relative flex flex-col"
			>
				<div class="w-full flex pt-1 flex-row justify-between">
					
					<Icon
						icon="bi:brush"
						class="h-5 w-5 text-gray-600"
						@click="isEditing = !isEditing"
					/>
					<Icon
						icon="clarity:archive-line"
						class="h-5 w-5 text-red-600"
						@click="deletematiere"
					/>
				</div>
                <input
                    class="font-bold mx-10 rounded-md text-lg text-center border-0 "
                    type="text"
                    v-model="newMatiere.designation"
                    v-if="isEditing"
                    @blur="isEditing = false"
                />
				<span v-else class="font-bold w-full text-lg text-center">{{
					matiere.designation
				}}</span>
			</div>
		</div>
		<div class="flex flex-row w-full p-2 divide-x-2 min-h-max">
			<div class="flex flex-col h-full w-1/2 justify-center items-center">
				<label class="text-xl font-bold text-black antialiased">{{
					matiere.prix || 0
				}}</label>
				<label class="text-sm font-light text-gray-500 antialiased">DZD</label>
			</div>
			<div class="flex flex-col h-full w-1/2 justify-center items-center">
				<label class="text-xl font-bold text-black antialiased">{{
					matiere.quantite || 0
				}}</label>
				<label class="text-sm font-light text-gray-500 antialiased"
					>Unités</label
				>
			</div>
		</div>
	</div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
	name: "ProductRow",
	props: ["matiere"],
	components: {
		Icon,
	},
	data() {
		return {
			newMatiere: this.matiere,
            isEditing: false,
		};
	},
	methods: {
		show() {
			return this.$route.push({ name: "" });
		},
        deletematiere() {
			this.$store.dispatch("deleteMatiere", this.matiere.id);
			this.searchfn("");
		},
        save() {
			this.$store.dispatch("updateMatiere", this.newMatiere);
		},
	},
	computed: {
		
	},
    watch:{
        isEditing(val){
            if(!val){
                console.log('tbdlt')
                this.save()
            }
        }
    }
};
</script>

<style></style>
