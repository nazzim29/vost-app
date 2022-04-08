<template>
	<router-link
        v-if="vente"
		:to="{ name: 'Vente', params: { id: vente.id } }"
		class="border-b border-gray-400 w-full grid grid-flow-col grid-cols-3 md:grid-cols-4 items-center justify-center text-center odd:bg-slate-200 text-black"
	>
		<td class="px-4 py-2 col-span-1 hidden md:block">
			<span class="font-medium">{{ vente?.id }}</span>
		</td>
		<td class="px-4 py-2 col-span-1">
			<span class="font-medium">{{ vente?.Client?.raisonSociale }}</span>
		</td>
		<td class="px-4 py-2 col-span-1">
			<span class="font-medium">{{ vente?.montant || 0 }} Da</span>
		</td>
		<td class="px-4 py-2 col-span-1">
			<span class="font-medium">{{ vente?.etat }}</span>
		</td>
	</router-link>
</template>

<script>
export default {
    name: 'CommandeRow',
    props: {
        vente: {
            type: Object,
            required: true,
        },
    },
    mounted(){
        console.log(this.showedVentes)
    }

};
</script>

<style></style>
