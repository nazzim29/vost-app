<template>
  <li
    class="border-b border-gray-400 w-full grid grid-flow-col grid-cols-3 md:grid-cols-4 items-center justify-center text-center odd:bg-slate-200 text-black"
  >
    <td class="px-2 py-2 col-span-1">
      <div class="flex items-center space-x-1">
        <div class="avatar hidden md:block">
          <div class="mask mask-squircle w-16 h-16">
            <img
              :src="api_url + production.Produit.image"
              alt="product Image"
            />
          </div>
        </div>
        <div>
          <div class="font-bold">{{ production.Produit.nom }}</div>
          <div class="text-sm opacity-50">
            {{ production.Produit.TypeProduit.nom }}
          </div>
        </div>
      </div>
    </td>
    <td class="px-4 py-2 col-span-1">
      <span class="font-medium">{{ production?.User.username }}</span>
    </td>
    <td class="px-4 py-2 col-span-1">
      <span class="font-medium">{{ production?.quantite }}</span>
    </td>
    <td class="px-4 py-2 col-span-1 hidden md:block">
      <span class="font-medium">{{ formatDate(production.date) }}</span>
    </td>
  </li>
</template>

<script>
export default {
  name: "ProductionRow",
  props: {
    production: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      api_url: process.env.VUE_APP_API_URL + "/uploads/Products/",
    };
  },
  methods: {
    formatDate(date) {
      date = new Date(date);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return day + "/" + month + "/" + year;
    },
  },
  mounted() {
    console.log(this.production);
  },
};
</script>

<style></style>
