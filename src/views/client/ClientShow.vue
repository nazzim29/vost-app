<template>
  <div class="flex flex-col w-full h-screen bg-gray-700 space-y-1">
    <div
      class="flex self-start w-full items-center space-x-0 md:space-x-3 h-16 px-16 md:items-center"
    ></div>
    <div class="flex card bg-base-100 shadow-xl m-4 md:m-20 md:mt-96">
      <div class="card-body w-full">
        <h2 class="card-title">Profile client</h2>
        <div class="flex flex-col w-full p-0 md:px-3 overflow-hidden">
          <div class="flex flex-col space-y-3 mt-4 p-0 md:px-2">
            <div class="flex md:flex-row flex-col gap-6">
              <div class="flex flex-col space-y-2 w-full md:w-1/2">
                <label
                  class="flex items-center text-bold h-full rounded-l-md text-md"
                  >Raison Sociale</label
                >
                <div
                  class="flex flex-row items-cente w-full focus-within:ring-1 rounded-md"
                >
                  <input
                    type="text"
                    name="raison_social"
                    id="raison_social"
                    placeholder="Raison social"
                    class="rounded-md border-gray-200 w-full focus:ring-0"
                  />
                </div>
              </div>
              <div
                class="flex flex-col items-start w-full space-y-2 w-full md:w-1/2"
              >
                <label
                  for="passwordConfirm"
                  class="flex items-center text-bold h-full rounded-l-md text-md"
                  >Type</label
                >
                <Listbox>
                  <div class="relative w-full mx-1 space-x-auto">
                    <ListboxButton
                      class="h-10 relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm border-1"
                    >
                      <span class="block truncate">Type</span>
                      <span
                        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                      >
                        <SelectorIcon
                          class="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </ListboxButton>

                    <!-- <transition
                        leave-active-class="transition duration-100 ease-in"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                      >
                        <ListboxOptions
                          class="absolute mt-1 w-11/12 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-left"
                        >
                          <ListboxOption
                            v-slot="{ active, selected }"
                            v-for="f in types"
                            :key="f.id"
                            :value="f.id"
                            as="template"
                          >
                            <li
                              :class="[
                                active
                                  ? 'text-amber-900 bg-amber-100'
                                  : 'text-gray-900',
                                'cursor-default select-none relative py-2 pl-10 pr-4',
                              ]"
                            >
                              <span
                                :class="[
                                  selected ? 'font-medium' : 'font-normal',
                                  'block truncate',
                                ]"
                                >{{ f.type }}</span
                              >
                              <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                              >
                                <CheckIcon class="w-5 h-5" aria-hidden="true" />
                              </span>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition> -->
                  </div>
                </Listbox>
              </div>
            </div>
            <div class="flex md:flex-row flex-col gap-6">
              <div class="flex flex-col space-y-2 w-full md:w-1/2">
                <label
                  for="numero"
                  class="flex items-center text-bold h-full rounded-l-md text-md"
                  >Numero</label
                >
                <div
                  class="flex flex-row items-cente w-full focus-within:ring-1 rounded-md ring-blue-600 border"
                >
                  <label
                    for="numero"
                    class="flex items-center uppercase text-bold rounded-l-md px-2 bg-gray-200 text-gray-800 text-md border-t border-l border-b"
                    >+213</label
                  >

                  <input
                    type="tel"
                    name="numero"
                    id="numero"
                    placeholder="Numero de telephone"
                    class="rounded-r-md border-0 focus:ring-0"
                  />
                </div>
              </div>
              <div class="flex flex-col w-full space-y-2 w-full md:w-1/2">
                <label
                  for="numero"
                  class="flex items-center text-bold h-full rounded-l-md text-md"
                  >Numero secondaire</label
                >
                <div
                  class="flex flex-row items-cente w-full focus-within:ring-1 rounded-md ring-blue-600 border"
                >
                  <label
                    for="numero"
                    class="flex items-center uppercase text-bold rounded-l-md px-2 bg-gray-200 text-gray-800 text-md border-t border-l border-b"
                    >+213</label
                  >
                  <input
                    type="tel"
                    name="numero_secondaire"
                    id="numero_secondaire"
                    placeholder="Numero de telephone (optionel)"
                    class="rounded-r-md border-0 focus:ring-0 w-full"
                  />
                </div>
              </div>
            </div>

            <div class="flex md:flex-row flex-col gap-6">
              <div class="flex flex-col items-start space-y-2 w-full md:w-1/2">
                <label
                  for="password"
                  class="flex items-center text-bold h-full rounded-l-md px-2"
                  >Mot de passe</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Mot de passe"
                  class="rounded-md border-gray-200 w-full"
                />
              </div>
              <div
                class="flex flex-col items-start w-max space-y-2 w-full md:w-1/2"
              >
                <label
                  for="passwordConfirm"
                  class="flex items-center text-bold h-full rounded-l-md text-md"
                  >Confirmation</label
                >
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="Confirmation"
                  class="rounded-md border-gray-200 w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Modifier</button>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-md p-2">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
        >
          <span>Details de la commande</span>
          <ChevronUpIcon
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5 text-blue-500 transition-transform duration-100"
          />
        </DisclosureButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <DisclosurePanel class="w-full p-5 space-y-3 bg-white flex flex-col">
            <div v-if="isEditing" class="flex flex-row space-x-3">
              <button
                class="btn self-end btn-sm btn-primary"
                @click="isEditing = false"
              >
                <label>Enregistrer</label>
              </button>
              <button
                class="btn self-end btn-sm btn-primary"
                @click="addProduct"
              >
                <PlusIcon class="w-8 h-8 cursor-pointer text-white" />
                <label>Ajouter</label>
              </button>
            </div>
            <div
              v-if="
                currentUser.Profile.Autorisations.find(
                  (el) => el.nom == 'update-commande'
                )
              "
              class="flex flex-row space-x-3 justify-end"
            >
              <button class="btn btn-secondary btn-sm" @click="startEditMode">
                <label>Modifier</label>
              </button>
            </div>
            <table
              class="w-full table items-center"
              v-if="commande.Produits.length != 0 || isEditing"
            >
              <thead class="w-full flex flex-col">
                <tr
                  v-if="isEditing"
                  class="grid grid-cols-1 md:grid-cols-5 items-center"
                >
                  <td
                    class="h-full whitespace-pre-wrap text-center md:col-span-2"
                  >
                    <Listbox v-model="newProduct.produit" v-slot="{ open }">
                      <div class="relative w-full">
                        <ListboxButton
                          @focus="onOpen"
                          @blur="onClose"
                          class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
                        >
                          <span class="block truncate">{{
                            newProduct.produit?.nom || "Produits..."
                          }}</span>
                          <span
                            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                          >
                            <SelectorIcon
                              class="w-5 h-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            static
                            v-show="open"
                            @scroll="scrolllist"
                            class="absolute w-max py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
                          >
                            <ListboxOption
                              v-slot="{ active, selected }"
                              v-for="product in paginated"
                              :key="product.id"
                              :value="product"
                              as="template"
                            >
                              <li
                                :class="[
                                  active
                                    ? 'text-amber-900 bg-amber-100'
                                    : 'text-gray-900',
                                  'cursor-default select-none relative py-2 pl-10 pr-4',
                                ]"
                              >
                                <span
                                  :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate',
                                  ]"
                                  >{{ product.nom }} ({{
                                    product.contenance
                                  }}kg)</span
                                >
                                <span
                                  v-if="selected"
                                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                                >
                                  <CheckIcon
                                    class="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </li>
                            </ListboxOption>
                            <ListboxOption v-show="hasNextPage">
                              <span ref="load"> loading</span>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </td>
                  <td class="h-full whitespace-pre-wrap text-center">
                    <input
                      disabled
                      class="w-full h-full p-2 border-2 border-gray-200 rounded-md text-md"
                      :value="(newProduct.produit?.contenance || 0) + ' Da'"
                    />
                  </td>
                  <td class="h-full whitespace-pre-wrap text-center">
                    <input
                      type="number"
                      class="w-full p-2 border-2 border-gray-200 rounded-md text-md"
                      v-model="newProduct.produits_commande.prix"
                      placeholder="Prix..."
                    />
                  </td>
                  <td class="h-full whitespace-pre-wrap text-center">
                    <input
                      type="number"
                      class="w-full p-2 border-2 border-gray-200 rounded-md text-md"
                      v-model="newProduct.produits_commande.quantite"
                      placeholder="Quantité..."
                    />
                  </td>
                </tr>
                <tr class="md:grid grid-cols-5 hidden">
                  <td class="whitespace-pre-wrap text-center"></td>
                  <td class="whitespace-pre-wrap text-center">prix initiale</td>
                  <td class="whitespace-pre-wrap text-center">prix</td>
                  <td class="whitespace-pre-wrap text-center">quantité</td>
                  <td class="whitespace-pre-wrap text-center">remise</td>
                </tr>
              </thead>
              <tbody class="grid gap-3">
                <tr
                  v-for="produit in [...commande.Produits, ...addedProducts]"
                  :key="produit"
                  class="grid relative md:grid-cols-5 border-gray-400 border rounded-md bg-gray-200 shadow-md mt-5"
                >
                  <td class="col-span-1">
                    <span
                      class="whitespace-pre-wrap text-center flex items-center justify-center"
                      >{{ produit.nom }} ({{ produit.contenance }}Kg)</span
                    >
                  </td>
                  <td
                    class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
                  >
                    <span class="md:hidden font-semibold">Prix Initiale: </span>
                    <span
                      class="whitespace-pre-wrap text-center flex items-center justify-center"
                      >{{ produit.prix }} DA</span
                    >
                  </td>

                  <td
                    v-if="isEditing"
                    class="col-span-1 text-center flex flex-row py-4 form-control items-center justify-center"
                  >
                    <span class="md:hidden font-semibold md:mr-0 mr-2"
                      >Prix :
                    </span>
                    <input
                      v-model="produit.produits_commande.prix"
                      @change="updateProduit(produit)"
                      class="input input-primary w-20 h-6 focus:outline-none text-center"
                    />
                    <label class="label items-center">DA</label>
                  </td>
                  <td
                    v-else
                    class="col-span-1 whitespace-pre-wrap flex justify-center items-center"
                  >
                    <span class="md:hidden font-semibold">Prix: </span>
                    {{ produit.produits_commande.prix }} DA
                  </td>

                  <td
                    v-if="isEditing"
                    class="col-span-1 text-center flex flex-row py-4 form-control items-center justify-center"
                  >
                    <span class="md:hidden font-semibold mr-2 md:mr-0"
                      >Quantité:
                    </span>
                    <label
                      class="inline-flex overflow-hidden rounded-lg bg-gray-400 justify-evenly"
                      :class="{}"
                    >
                      <MinusIcon
                        class="cursor-pointer h-8 w-8 flex-1"
                        @click="
                          produit.produits_commande.quantite-- &&
                            updateProduit(produit)
                        "
                      />
                      <input
                        :value="produit.produits_commande.quantite"
                        @focus="inputgroupfocushandler"
                        @blur="inputgroupblurhandler"
                        @input="numbersOnly"
                        @change="updateProduit(produit)"
                        class="input focus:outline-none flex-2 w-16 h-auto text-center peer rounded-none focus:border-0 focus:shadow-none focus:ring-0"
                      />
                      <PlusIcon
                        class="w-8 h-8 cursor-pointer flex-1"
                        @click="
                          produit.produits_commande.quantite++ &&
                            updateProduit(produit)
                        "
                      />
                    </label>
                  </td>
                  <td
                    v-else
                    class="col-span-1 whitespace-pre-wrap text-center flex items-center justify-center"
                  >
                    <span class="md:hidden font-semibold">Quantité: </span>
                    {{ produit.produits_commande.quantite }} KG
                  </td>

                  <td
                    class="col-span-1 whitespace-pre-wrap text-center flex justify-center items-center"
                  >
                    <span class="md:hidden font-semibold">Remise: </span>
                    {{ produit.prix - produit.produits_commande.prix }} DA
                  </td>
                  <div
                    class="absolute -top-4 -right-4 w-8 h-8 text-red-600 rounded-full bg-white"
                  >
                    <Icon
                      class="w-full h-full"
                      icon="dashicons:remove"
                      @click="deleteProduit(produit.id)"
                    />
                  </div>
                </tr>
              </tbody>
            </table>
            <h4 v-else class="font-semibold text-center">
              Cette commande ne contient aucun produit
            </h4>
          </DisclosurePanel>
        </transition>
      </Disclosure>
    </div>
  </div>
</template>

<script>
import {} from "@heroicons/vue/solid";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/vue";
import {
  CheckIcon,
  SelectorIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/vue/solid";
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
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
    ChevronUpIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MinusIcon,
    PlusIcon,
    Icon,
  },
  beforeMount() {
    if (this.$route.params.id != "new")
      this.$store.dispatch("showCommande", this.$route.params.id);
    else {
      this.$store.dispatch("showCommande", "new");
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

<style lang="scss" scoped></style>
