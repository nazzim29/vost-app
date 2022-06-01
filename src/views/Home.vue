<template>
  <div class="flex flex-col w-full h-screen items-center bg-gray-700 space-y-1">
    <div class="flex self-start w-full items-center space-x-3 h-16 py-1 px-2">
      <div class="text-white text-2xl mt-4 mb-2 font-bold"></div>
    </div>
    <div
      class="flex flex-col md:grid gap-4 md:grid-cols-4 md:grid-rows-1 w-full p-8"
    >
      <div class="card md:card-side bg-base-100 shadow-xl">
        <div class="card-body p-0">
          <div class="mx-10 mt-10">
            <h2 class="card-title">Total client</h2>
            <span class="text-2xl">25000</span>
          </div>
          <img src="/img/stat1.png" alt="" />
        </div>
      </div>
      <div class="card md:card-side bg-base-100 shadow-xl">
        <div class="card-body p-0">
          <div class="mx-10 mt-10">
            <h2 class="card-title">Total utilisateur</h2>
            <span class="text-2xl">200</span>
          </div>
          <img src="/img/stat3.png" alt="" />
        </div>
      </div>
      <div class="card md:card-side bg-base-100 shadow-xl">
        <div class="card-body p-0">
          <div class="mx-10 mt-10">
            <h2 class="card-title">Total commandes</h2>
            <span class="text-2xl">1850144</span>
          </div>
          <img src="/img/stat4.png" alt="" />
        </div>
      </div>
      <div class="card md:card-side bg-base-100 shadow-xl">
        <div class="card-body p-0">
          <div class="mx-10 mt-10">
            <h2 class="card-title">Commandes en attente</h2>
            <span class="text-2xl">10000.</span>
          </div>
          <img src="/img/stat5.png" alt="" />
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row w-full">
      <div class="flex flex-col gap-10 p-8 w-full md:w-1/2">
        <div class="card md:card-side bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Paiements</h2>
            <pie-chart
              :colors="['#67AE7B', '#FED23D']"
              :data="[
                ['Payé', 44],
                ['Reste à Payer', 23],
              ]"
            ></pie-chart>
          </div>
        </div>
        <div class="card md:card-side bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Nombre de ventes</h2>
            <column-chart
              :colors="['#75388D']"
              :data="[
                ['JAN', 32],
                ['FEV', 46],
                ['MARS', 28],
                ['AVR', 28],
                ['MAI', 28],
                ['JUIN', 28],
                ['JUI', 28],
                ['AOUT', 28],
                ['SEP', 28],
                ['OCT', 28],
                ['NOV', 28],
                ['DEC', 28],
              ]"
            ></column-chart>
          </div>
        </div>
        <!-- <div class="card md:card-side bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Chiffre d'affaire</h2>
            <line-chart
              :colors="['#7CAEDE']"
              :data="{
                '2017-05-13': 2,
                '2017-05-14': 5,
                '2017-05-15': 3,
                '2017-05-16': 8,
              }"
            ></line-chart>
          </div>
        </div> -->
      </div>
      <div class="flex flex-col gap-10 p-8 w-full md:w-1/2">
        <div class="card md:card-side bg-base-100 shadow-xl">
          <div class="card-body p-0">
            <div class="mx-10 mt-10">
              <h2 class="card-title">Produits en rupture de stock</h2>
              <span class="text-2xl">10000.</span>
            </div>
            <img src="/img/stat6.png" alt="" />
          </div>
        </div>
        <div class="card md:card-side bg-base-100 shadow-xl">
          <div class="card-body p-0">
            <div class="mx-10 mt-10">
              <h2 class="card-title">Matieres premieres en rupture de stock</h2>
              <span class="text-2xl">10000.</span>
            </div>
            <img src="/img/stat2.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
