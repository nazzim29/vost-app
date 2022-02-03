<template>
	<div class="h-full w-full flex flex-col items-center justify-center">
		<div class="h-10"></div>
		<div class="flex flex-col bg-white h-5/6 w-11/12 rounded-md shadow-2xl">
			<div class="flex flex-row h-32 w-full justify-between items-center">
				<div class="w-1/3 flex justify-center">
					<div
						class="
							w-2/3
							h-20
							p-1
							justify-evenly
							align-center
							flex flex-row
							divide-x-2 divide-gray-600 divide-solid divide-opacity-40
							my-2
							rounded-md
							bg-gray-500 bg-opacity-20
						"
					>
						<div class="flex flex-col align-center justify-center w-1/3">
							<span class="font-bold text-4xl text-center">19</span>
							<span class="font-medium text-sm text-center uppercase"
								>message</span
							>
						</div>
						<div class="flex flex-col align-center justify-center w-1/3">
							<span class="font-bold text-4xl text-center">19</span>
							<span class="font-medium text-sm text-center uppercase"
								>message</span
							>
						</div>
						<div class="flex flex-col align-center justify-center w-1/3">
							<span class="font-bold text-4xl text-center">19</span>
							<span class="font-medium text-sm text-center uppercase"
								>message</span
							>
						</div>
					</div>
				</div>
				<div class="w-1/3 flex justify-center items-center pt-6">
					<div
						class="
							group
							absolute
							w-36
							h-36
							self-center
							transform
							-translate-y-1/2
							rounded-full
							shadow-xl
							p-2
							bg-gray-200
						"
					>
						<img
							src="https://via.placeholder.com/150"
							class="w-full h-full rounded-full shadow-inner"
						/>
						<div
							class="
								top-0
								left-0
								rounded-full
								w-full
								h-full
								bg-opacity-20 bg-black
								fixed
								z-50
								hidden
								group-hover:flex
								items-center
							"
						>
							<label
								for="pdp"
								class="
									text-sm text-white
									font-light
									text-center
									hover:underline
								"
								@click="pdpref.click()"
								>Changer la photo de profile</label
							>
							<input
								id="pdp"
								class="hidden"
								type="file"
								accept="image/*"
								ref="pdpref"
							/>
						</div>
					</div>
				</div>
				<div class="flex items-center justify-center w-1/3">
					<button
						class="
							rounded-md
							text-white text-xl
							uppercase
							font-bold
							py-1
							px-7
							bg-blue-700
							hover:bg-blue-900
						"
						@click="save"
					>
						{{ editing ? "Save" : "Edit" }}
					</button>
				</div>
			</div>
			<div class="w-full flex flex-row items-center justify-center">
				<h1 class="text-xl font-extrabold text-center" v-if="!editing">
					{{ nom.toUpperCase() }} {{ prenom.charAt(0).toUpperCase()
					}}{{ prenom.slice(1).toLowerCase() }}
				</h1>
				<input
					class="
						rounded-md
						border-0
						font-semibold
						bg-gray-200
						focus:ring-blue-800
						mr-3
					"
					type="text"
					v-model="nom"
					v-if="editing"
					:disabled="loading"
				/>
				<input
					class="
						rounded-md
						border-0
						font-semibold
						bg-gray-200
						focus:ring-blue-800
						mr-3
					"
					type="text"
					v-model="prenom"
					v-if="editing"
					:disabled="loading"
				/>
			</div>
			<span
				class="
					text-md
					font-semibold
					text-center text-gray-400
					flex
					items-center
					w-full
					justify-center
				"
				><Icon :icon="icon" class="mr-1" height="30" width="30" />
				{{ fonction }}</span
			>

			<div class="w-full flex flex-row items-center justify-center">
				<Icon icon="akar-icons:phone" class="mr-1" height="30" width="30" />
				<h1 class="text-md font-semibold text-center" v-if="!editing">
					{{ numero }}
				</h1>
				<input
					class="
						rounded-md
						border-0
						font-semibold
						bg-gray-200
						focus:ring-blue-800
						mr-3
					"
					type="tel"
					v-model="numero"
					v-if="editing"
					:disabled="loading"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import UserService from "@/services/UserService";
import { Icon } from "@iconify/vue";
export default {
	components: {
		Icon,
	},
	data() {
		return {
			nom: "",
			prenom: "admin",
			icon: "",
			fonction: "",
			editing: false,
			numero: "",
		};
	},
	async created() {
		if (this.$route.fullPath == "/me") {
			this.nom = this.$store.state.user.nom;
			this.prenom = this.$store.state.user.prenom;
			this.icon = "ph:crown-bold";
			this.fonction = this.$store.state.user.Fonction.nom;
			this.numero = this.$store.state.user.numero;
			this.username = this.$store.state.user.username;
		}
	},
	methods: {
		async save() {
			console.log(UserService);
			const id = this.$store.state.user.id;
			if (this.editing) {
				let rep = await UserService.update({
					id,
					nom: this.nom,
					prenom: this.prenom,
					numero: this.numero,
				});
				if (rep.status == 200) {
					rep = await UserService.show(id)
					if(rep.status == 200) this.$store.state.user = rep.data
				} else if (rep.status == 403) {
					this.$route.push("/login");
				}
				this.editing = false;
			} else {
				this.editing = true;
			}

		},
	},
};
</script>

<style></style>
