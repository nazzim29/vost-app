
<template>
	<div class="flex flex-row bg-gray-500 rounded-full py-1 px-2" @mouseover="open = true;mouseover=true" @mouseleave="mouseleave">
		<TransitionRoot as="div" :show="open"
			enter="transition-all duration-150"
			enter-from="w-0"
			enter-to="w-full"
			leave="transition-all duration-300"
			leave-from="w-full"
			leave-to="w-0"

		>
			<input
				v-model="search"
				type="search"
				name="serch"
				placeholder="Search"
				class="
					text-white
					bg-gray-500
					h-full
					w-full
					text-sm
					focus:outline-none
					outline-none
					focus:ring-0
					border-none
				"
				@focus="focused = true"
				@blur="blur"
			/>
		</TransitionRoot>
				<button type="submit" class="px-2" @click="searchfn" >
					<svg
						class="h-9 w-4 fill-current fill-white"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						version="1.1"
						id="Capa_1"
						x="0px"
						y="0px"
						viewBox="0 0 56.966 56.966"
						style="enable-background: new 0 0 56.966 56.966"
						xml:space="preserve"
						width="512px"
						height="512px"
					>
						<path
							d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
						/>
					</svg>
				</button>
	</div>
</template>

<script>
import {TransitionRoot} from "@headlessui/vue"
export default {
	components:{
		TransitionRoot,
	},
	name: "SearchBar",
	props: ["_search"],
	data() {
		return {
			search: "",
			open: false,
			focused:false,
			mouseover:false
		};
	},
	methods:{
		async searchfn(){
			if(!this.open){
				return this.open = true
			}else{
				this.$emit('search',this.search)
			}
		},
		mouseleave(){
			this.mouseover=false
			if(this.focused)return
			this.open=false
		},
		blur(){
			this.focused = false
			if(!this.mouseover && this.search==""){
				this.open=false
			}

		}
	},
	watch:{
		search(value){
			this.$emit('search',value)

		}
	}
};
</script>

<style scoped>
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }

</style>
