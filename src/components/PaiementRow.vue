<template>
  <td class="px-4 py-2 col-span-1 hidden md:block">
    <span class="font-medium">{{ paiement?.id }}</span>
  </td>
  <td class="px-4 py-2 col-span-1">
    <span class="font-medium">{{ paiement?.Client?.raisonSociale }}</span>
  </td>
  <td class="px-4 py-2 col-span-1">
    <span class="font-medium">{{ paiement?.montant || 0 }} Da</span>
  </td>
  <td class="px-4 py-2 col-span-1">
    <span class="font-medium">{{ paiement?.etat }}</span>
  </td>
</template>

<script>
export default {
  name: "paiementRow",
  props: {
    paiement: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    // console.log(this.paiement    )
  },
};
</script>

<style></style>
