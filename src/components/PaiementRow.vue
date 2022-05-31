<template>
<tr class="grid grid-cols-4">
  <td class="px-4 py-2 col-span-1 ">
    <span class="font-medium">{{ paiement?.id }}</span>
  </td>
  <td class="px-4 py-2 col-span-1">
    <span class="font-medium">{{ formatDate }}</span>
  </td>
  <td class="px-4 py-2 col-span-1">
    <span class="font-medium">{{ paiement?.Client?.raisonSociale }}</span>
  </td>
  <td class="px-4 py-2 col-span-1">
    <span class="font-medium">{{ paiement?.montant || 0 }} DZD</span>
  </td>
</tr>
</template>

<script>
import moment from "moment";
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
  computed:{
    formatDate(){
      return moment(this.paiement.date).format("DD/MM/YYYY");
    }
  }
};
</script>

<style></style>
