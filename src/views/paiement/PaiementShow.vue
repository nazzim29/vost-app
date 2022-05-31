<template>
  <div
    class="h-full w-full items-center justify-center p-2 space-y-5"
    style="font-family: Roboto"
  >
    <div class="flex flex-row justify-end items-center p-1 space-x-2">
      <div class="text-white text-2xl m-2 mb-4 font-bold">
        <h1>Détails paiement</h1>
      </div>
    </div>
    <div class="card glass">
      <div class="card-body">
        <!-- <h2 class="card-title">#{{ commande.id }}</h2> -->
        <div class="flex md:flex-row flex-col h-full gap-3">
          <div
            class="rounded-md w-full md:w-16 h-16 flex flex-row py-2 px-1 hover:scale-110 hover:shadow-2xl hover:mx-3 transition-all duration-300 items-center"
            style="background-color: #ffee00"
          >
            <span class="text-md font-semibold text-gray-600 mx-auto">
              paiement.id
            </span>
          </div>
          <div
            class="rounded-md w-full md:w-1/4 h-16 flex flex-row py-2 px-1 hover:scale-110 hover:shadow-2xl hover:mx-3 transition-all duration-300 items-center"
            style="background-color: #ffee00"
          >
            <div
              class="p-2 rounded-full bg-white justify-self-start"
              style="background-color: rgba(255, 255, 255, 0.4)"
            >
              <Icon icon="akar-icons:person" class="w-10 h-10 text-gray-600" />
            </div>
            <span class="text-md font-semibold text-gray-600 mx-auto">
              paiement.Client.raisonSociale
            </span>
          </div>
          <div
            class="rounded-md w-full md:w-1/4 h-16 flex flex-row py-2 px-1 hover:scale-110 hover:shadow-2xl hover:mx-3 transition-all duration-300 items-center"
            style="background-color: #ffee00"
          >
            <div
              class="p-2 rounded-full bg-white justify-self-start"
              style="background-color: rgba(255, 255, 255, 0.4)"
            >
              <Icon icon="akar-icons:check" class="w-10 h-10 text-gray-600" />
            </div>
            <span class="text-md font-semibold text-gray-600 mx-auto">
              paiement.etat
            </span>
          </div>
          <div
            class="rounded-md w-full md:w-1/4 h-16 flex flex-row py-2 px-1 hover:scale-110 hover:shadow-2xl transition-all duration-300 hover:mx-3 items-center"
            style="background-color: #ffee00"
          >
            <div
              class="p-2 rounded-full bg-white justify-self-start"
              style="background-color: rgba(255, 255, 255, 0.4)"
            >
              <Icon
                icon="fa-solid:cash-register"
                class="w-9 h-9 text-gray-600"
              />
            </div>
            <span class="text-md font-semibold text-gray-600 mx-auto">
              paiement.montant DZD</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="bg-white rounded-md p-2">
        <Disclosure v-slot="{ open }">
          <DisclosureButton
            class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
          >
            <span>Liste des ventes</span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-purple-500"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            <div>
              <div class="flex-1 flex flex-col h-full w-full overflow-hidden">
                <div
                  class="h-full md:justify-center aligned-center w-full flex flex-1 flex-col overflow-auto overflow-x-hidden py-3"
                >
                  <table
                    class="bg-white rounded-md mx-1 grid grid-flow-row overflow-hidden text-black my-auto"
                  >
                    <thead>
                      <tr class="w-full grid grid-flow-col">
                        <th class="px-2 py-2 col-span-1 hidden md:block"></th>
                        <th class="px-4 py-2 col-span-1">Montant</th>
                        <th class="px-4 py-2 col-span-1">Reste a payer</th>
                        <th class="px-4 py-2 col-span-1">Etat</th>
                      </tr>
                    </thead>
                    <tbody class="w-full grid grid-flow-row overflow-auto">
                      <router-link
                        :to="{ name: 'Vente', params: { id: 41 } }"
                        class="border-b border-gray-400 w-full grid grid-flow-col grid-cols-3 md:grid-cols-4 items-center justify-center text-center odd:bg-slate-200 text-black"
                      >
                        <td class="px-4 py-2 col-span-1 hidden md:block">
                          <span class="font-medium"> vente?.id </span>
                        </td>
                        <td class="px-4 py-2 col-span-1">
                          <span class="font-medium">
                            vente?.Client?.raisonSociale
                          </span>
                        </td>
                        <td class="px-4 py-2 col-span-1">
                          <span class="font-medium">vente?.montant</span>
                        </td>
                        <td class="px-4 py-2 col-span-1">
                          <span class="font-medium"> vente?.etat </span>
                        </td>
                      </router-link>
                      <!-- <router-link
                        v-for="vente in showedVentes"
                        :key="vente.id"
                        :to="{ name: 'Vente', params: { id: vente.id } }"
                        class="border-b border-gray-400 w-full grid grid-flow-col grid-cols-3 md:grid-cols-4 items-center justify-center text-center odd:bg-slate-200 text-black"
                      >
                        <td class="px-4 py-2 col-span-1 hidden md:block">
                          <span class="font-medium">{{ vente?.id }}</span>
                        </td>
                        <td class="px-4 py-2 col-span-1">
                          <span class="font-medium">{{
                            vente?.Client?.raisonSociale
                          }}</span>
                        </td>
                        <td class="px-4 py-2 col-span-1">
                          <span class="font-medium"
                            >{{ vente?.montant || 0 }} Da</span
                          >
                        </td>
                        <td class="px-4 py-2 col-span-1">
                          <span class="font-medium">{{ vente?.etat }}</span>
                        </td>
                      </router-link> -->
                    </tbody>
                  </table>
                </div>
                <!-- <Pagination
                  ref="Pagination"
                  :currentPage="currentPage"
                  :pageSize="nbperpage"
                  :dataLength="ventes.length"
                  @page="currentPage = $event"
                  @next="currentPage++"
                  @prev="currentPage--"
                  @first="currentPage = 1"
                  @last="currentPage = $refs.Pagination.pageNumber"
                /> -->
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  </div>
</template>

<script>
import {} from "@heroicons/vue/solid";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";
import { Icon } from "@iconify/vue";
import fileDownload from "js-file-download";
import Api from "@/services/api";
// import { Buffer } from "buffer";
export default {
  data() {
    return {
      errorFileModal: false,
      query: "",
      isEditing: false,
      newProduct: {
        produit: null,
        produits_commande: {
          prix: null,
          quantite: null,
        },
      },
      observer: null,
      limit: 10,
      search: "",
      addedProducts: [],
    };
  },
  methods: {
    handleBDC() {
      if (this.commande.bonDeCommande != null) {
        //todo
        //
        return Api.get(
          `/commande/${this.commande.id}/document`,
          {},
          {
            responseType: "arraybuffer",
            reponseEncoding: "binary",
            // headers: { "Accept-Encoding": "gzip, deflate, br" },
          }
        )
          .then((response) => {
            fileDownload(
              response.data,
              `Bon De Commande ${this.commande.id}.pdf`,
              "application/pdf"
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
      var input = document.createElement("input");
      input.type = "file";
      input.click();
      input.onchange = this.uploadFile;
      // const formData = new FormData();
      //open file selector and get file
    },
    async uploadFile(event) {
      var file = event.target.files[0];
      if (file.type != "application/pdf") {
        console.log("File is not a pdf");
        this.errorFileModal = true;
        return;
      }
      var formData = new FormData();
      formData.append("file", file);
      this.$store.dispatch("uploadBonDeCommande", {
        formData,
        id: this.$route.params.id,
      });
    },
    numbersOnly(event) {
      if (isNaN(parseInt(event.data)))
        event.target.value = event.target.value.slice(
          0,
          event.target.value.length - 1
        );
    },
    scrolllist(e) {
      if (
        e.target.scrollHeight - e.target.scrollTop == e.target.clientHeight &&
        this.hasNextPage
      )
        this.limit += 10;
    },
    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick();
        this.observer.observe(this.$refs.load);
      }
    },
    onClose() {
      this.observer.disconnect();
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      console.log(isIntersecting);
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.limit += 10;
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },
    inputgroupfocushandler(e) {
      e.target.parentNode.classList.add("border");
      e.target.parentNode.classList.add("border-primary");
      // e.target.parentNode.classList.add('border-blue-500')
    },
    inputgroupblurhandler(e) {
      e.target.parentNode.classList.remove("border");
      e.target.parentNode.classList.remove("border-primary");
      // e.target.parentNode.classList.add('border-blue-500')
    },
    startEditMode() {
      this.isEditing = true;
    },

    deleteCommande() {
      this.$store.dispatch("deleteCommande", this.commande.id);
      this.$router.go(-1);
    },
    saveCommande() {
      if (this.$route.params.id == "new") {
        this.$store.dispatch("addCommande", this.commande);
      } else {
        this.$store.dispatch("updateCommande", this.commande);
        this.isEditing = false;
      }
    },
    addProduct() {
      if (
        this.newProduct.produit == null ||
        this.newProduct.produits_commande.prix == null
      )
        return;
      if (!this.newProduct.produits_commande.quantite)
        this.newProduct.produits_commande.quantite = 1;
      //make api call /commandes/:id/addProduct
      this.$store.dispatch("commande/addProducts", {
        commandeId: this.commande.id,
        product: this.newProduct,
      });
      // this.addedProducts.push({
      // 	...this.newProduct.produit,
      // 	produits_commande: this.newProduct.produits_commande,
      // });
      this.newProduct = {
        produit: null,
        produits_commande: {
          prix: null,
          quantite: null,
        },
      };
    },
    updateProduit(product) {
      console.log(product);
      this.$store.dispatch("commande/updateProduit", {
        commandeId: this.commande.id,
        product,
      });
    },
    deleteProduit(id) {
      this.$store.dispatch("commande/deleteProduit", {
        commandeId: this.commande.id,
        productId: id,
      });
      this.$store.dispatch("showCommande", this.commande.id);
    },
    validerCommande() {
      this.$store.dispatch("commande/validate", {
        idCommande: this.commande.id,
        next: this.$router,
      });
    },
    save() {
      // if(this.$route.params.id == 'new'){}
      // this.$store.dispatch("commande/addProducts", {
      // 	commandeId: this.commande.id,
      // 	products: this.addedProducts,
      // });
      // this.addedProducts = [];
      // this.isEditing = false;
    },
  },
  components: {
    ChevronUpIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Icon,
  },
  beforeMount() {
    if (this.$route.params.id != "new")
      this.$store.dispatch("showPaiement", this.$route.params.id);
    else {
      this.$store.dispatch("showPaiement", "new");
      this.isEditing = true;
    }
    console.log(this.commande);
    this.$store.dispatch("getClients");
    this.$store.dispatch("getProduits");
  },
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },

  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
    commande: {
      get() {
        return this.$store.getters.getCommande;
      },
      set(v) {
        this.$store.dispatch("setCommande", v);
      },
    },
    clients() {
      const r = this.$store.getters.getClients;
      return r.sort(function compare(a, b) {
        if (a.raisonSociale < b.raisonSociale) {
          return -1;
        }
        if (a.raisonSociale > b.raisonSociale) {
          return 1;
        }
        return 0;
      });
    },
    paginated() {
      return this.canAddProducts.slice(0, this.limit);
    },
    hasNextPage() {
      return this.paginated.length < this.canAddProducts.length;
    },
    products() {
      return this.$store.getters.getProduits;
    },
    canAddProducts() {
      let i = this.products.filter((el) => {
        // console.log(thi)
        if (
          this.commande.Produits.find((d) => d.nom == el.nom) ||
          this.addedProducts.includes((d) => d.nom == el.nom)
        )
          return false;
        if (
          this.search != "" &&
          el.nom.toLowerCase().indexOf(this.search.toLowerCase()) == -1
        )
          return false;
        return true;
      });
      console.log({ i });
      return i;
    },
  },
};
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}
</style>
