<template>
  <div
    class="flex flex-col w-full justify-center items-center h-full bg-gray-700 overflow-hidden"
  >
    <div class="flex self-start w-full items-center space-x-3 h-16 py-1 px-2">
      <SearchBar ref="searchbar" @search="searchfn" />
      <div
        class="rounded-full py-2 px-2 bg-gray-500"
        :class="{ hidden: refs?.searchbar?.open }"
      >
        <FilterIcon
          @click="mobileFiltersOpen = !mobileFiltersOpen"
          class="h-7 fill-current text-white"
        />
      </div>
      <div
        class="rounded-full py-2 px-2 bg-gray-500"
        v-if="
          currentUser.Profile.Autorisations.find(
            (el) => el.nom == 'add-production'
          )
        "
      >
        <Icon
          icon="ion:create"
          @click="openCreateModal"
          class="h-7 w-7 fill-current text-white"
        />
      </div>
    </div>
    <div class="bg-blue-900">
      <div>
        <!-- Mobile filter dialog -->
        <TransitionRoot as="template" :show="mobileFiltersOpen">
          <Dialog
            as="div"
            class="fixed inset-0 flex z-40"
            @close="mobileFiltersOpen = false"
          >
            <TransitionChild
              as="template"
              enter="transition-opacity ease-linear duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <div
                class="ml-auto relative max-w-xs w-full h-full bg-gray-900 shadow-xl py-4 pb-12 flex flex-col overflow-y-auto"
              >
                <div class="px-4 flex items-center justify-between">
                  <h2 class="text-lg font-medium text-gray-300">Filters</h2>
                  <button
                    type="button"
                    class="-mr-2 w-7 h-7 bg-gray-800 p-1 rounded-md flex items-center justify-center text-gray-400"
                    @click="mobileFiltersOpen = false"
                  >
                    <span class="sr-only text-white">Close menu</span>
                    <XIcon class="h-6 w-6 text-gray-300" aria-hidden="true" />
                  </button>
                </div>
                <Disclosure
                  as="div"
                  class="border-t border-gray-400 px-4 py-6"
                  v-slot="{ open }"
                >
                  <h3 class="-mx-2 -my-3 flow-root">
                    <DisclosureButton as="template">
                      <div
                        class="px-2 py-3 bg-gray-700 w-full flex items-center justify-between text-gray-400 hover:text-gray-200"
                      >
                        <span class="font-medium text-gray-400"> Etat </span>
                        <span class="ml-6 flex items-center">
                          <PlusSmIcon
                            v-if="!open"
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                          <MinusSmIcon
                            v-else
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel class="pt-6">
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input
                          value="en attente"
                          type="checkbox"
                          class="h-4 w-4 border-gray-400 rounded text-blue-600 focus:ring-blue-500"
                          v-model="etatsel"
                        />
                        <label class="ml-3 min-w-0 flex-1 text-gray-500">
                          En attente
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          value="valide"
                          type="checkbox"
                          class="h-4 w-4 border-gray-400 rounded text-blue-600 focus:ring-blue-500"
                          v-model="etatsel"
                        />
                        <label class="ml-3 min-w-0 flex-1 text-gray-500">
                          Validé
                        </label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure
                  as="div"
                  class="border-t border-gray-400 px-4 py-6"
                  v-slot="{ open }"
                >
                  <h3 class="-mx-2 -my-3 flow-root">
                    <DisclosureButton as="template">
                      <div
                        class="px-2 py-3 bg-gray-700 w-full flex items-center justify-between text-gray-400 hover:text-gray-200"
                      >
                        <span class="font-medium text-gray-400">
                          Couleurs
                        </span>
                        <span class="ml-6 flex items-center">
                          <PlusSmIcon
                            v-if="!open"
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                          <MinusSmIcon
                            v-else
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel class="pt-6">
                    <div v-if="couleurs.length > 0" class="space-y-6">
                      <div
                        v-for="couleur in couleurs"
                        :key="couleur.id"
                        class="flex items-center"
                      >
                        <input
                          :value="couleur.id"
                          type="checkbox"
                          :checked="couleur.checked"
                          class="h-4 w-4 border-gray-400 rounded"
                          :style="{
                            '--tw-ring-color': `#${couleur.code}`,
                            color: `#${couleur.code}`,
                          }"
                          v-model="couleursel"
                        />
                        <label
                          class="ml-3 min-w-0 flex-1"
                          :style="{ color: `#${couleur.code}` }"
                        >
                          {{ couleur.nom }}
                        </label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </TransitionChild>
          </Dialog>
        </TransitionRoot>
      </div>
    </div>
    <div class="flex-1 flex flex-col h-full w-full overflow-hidden">
      <div
        class="h-full md:justify-start align-center m-4 flex flex-1 flex-col overflow-auto overflow-x-hidden py-3"
      >
        <div class="text-white text-2xl m-2 mb-4 font-bold">
          <h1>Productions</h1>
        </div>
        <table
          class="bg-white rounded-md mx-1 grid grid-flow-row overflow-hidden text-black"
        >
          <thead>
            <tr class="w-full grid grid-flow-col">
              <th class="px-2 py-2 col-span-1">Produit</th>
              <th class="px-4 py-2 col-span-1">User</th>
              <th class="px-4 py-2 col-span-1">Quantité</th>
              <th class="px-4 py-2 col-span-1 hidden md:block">Date</th>
            </tr>
          </thead>
          <tbody class="w-full grid grid-flow-row overflow-auto">
            <ProductionRow
              v-for="production in showedProductions"
              :key="production.id"
              :production="production"
            />
          </tbody>
        </table>
      </div>
      <Pagination
        ref="Pagination"
        :currentPage="currentPage"
        :pageSize="nbperpage"
        :dataLength="productions.length"
        @page="currentPage = $event"
        @next="currentPage++"
        @prev="currentPage--"
        @first="currentPage = 1"
        @last="currentPage = $refs.Pagination.pageNumber"
      />
    </div>
    <Modal ref="createModal" @submit="addProd">
      <template v-slot:title>Ajouter un produit</template>
      <template v-slot:body>
        <div class="flex flex-col w-full pb-12 overflow-y-auto">
          <div class="flex flex-col space-y-3 mt-4 px-2">
            <div class="flex flex-col w-full">
              <div class="flex flex-col items-start space-y-2 space-x-2 w-full">
                <label
                  for="nom"
                  class="flex items-center text-bold h-full rounded-l-md text-md"
                  >Lot</label
                >
                <input
                  type="text"
                  name="lot"
                  id="lot"
                  v-model="newProduction.lot"
                  placeholder="Lot"
                  class="rounded-md border-0 w-3/4"
                />
              </div>
            </div>
            <div class="flex flex-col w-full">
              <div class="flex flex-col items-start w-full space-y-2 space-x-2">
                <label
                  for="passwordConfirm"
                  class="flex items-center text-bold h-full rounded-l-md text-md"
                  >Produit</label
                >
                <Listbox v-model="newProduction.Produit">
                  <div class="relative w-11/12">
                    <ListboxButton
                      @focus="onOpen"
                      @blur="onClose"
                      class="h-10 relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
                    >
                      <span class="block truncate">{{
                        newProduction.Produit?.nom || "Produits..."
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
                        @scroll="scrolllist"
                        class="absolute w-full max-h-48 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
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
                              'cursor-default select-none relative py-2 px-4',
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
                              <CheckIcon class="w-5 h-5" aria-hidden="true" />
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
              </div>
            </div>
            <div class="flex flex-col w-full">
              <div class="flex flex-col items-start w-full space-y-2 space-x-2">
                <label
                  for="quantite"
                  class="flex items-center text-bold h-full rounded-l-md px-2text-xl"
                  >Quantite</label
                >
                <input
                  type="number"
                  name="quantite"
                  id="quantite"
                  v-model="newProduction.quantite"
                  placeholder="Quantité"
                  class="rounded-md border-0 w-3/4"
                />
              </div>
            </div>
            <div class="flex flex-col w-full">
              <div class="flex flex-col items-start w-full space-y-2 space-x-2">
                <label
                  for="date"
                  class="flex items-center text-bold h-full rounded-l-md px-2text-xl"
                  >Date Production</label
                >
                <input
                  type="date"
                  name="date"
                  id="date"
                  v-model="newProduction.date"
                  placeholder="Date de production"
                  class="rounded-md border-0 w-3/4"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:submit>Ajouter</template>
    </Modal>
  </div>
</template>

<script>
import { debounce } from "lodash";
import Pagination from "@/components/Pagination";
import ProductionRow from "@/components/ProductionRow";
import {
  Dialog,
  DialogOverlay,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
  ListboxButton,
  Listbox,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import SearchBar from "@/components/SearchBar";
import { Icon } from "@iconify/vue";
import { FilterIcon, PlusSmIcon, MinusSmIcon } from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/outline";
import Modal from "@/components/Modal";
export default {
  name: "Productions",
  beforeMount() {
    this.$store.dispatch("getProductions");
    this.$store.dispatch("getProduits");
  },
  data() {
    return {
      mobileFiltersOpen: false,
      currentPage: 1,
      etatsel: [],
      newProduction: {},
      observer: null,
      limit: 10,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },
  components: {
    ListboxButton,
    Listbox,
    ListboxOptions,
    ListboxOption,
    Dialog,
    Pagination,
    ProductionRow,
    DialogOverlay,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    TransitionChild,
    TransitionRoot,
    SearchBar,
    Icon,
    FilterIcon,
    XIcon,
    PlusSmIcon,
    MinusSmIcon,
    Modal,
  },
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
    paginated() {
      return this.produits.slice(0, this.limit);
    },
    hasNextPage() {
      return this.paginated.length < this.produits.length;
    },
    nbperpage() {
      if (window.innerWidth >= 640 && window.innerWidth < 768) return 13;
      else if (window.innerWidth >= 768 && window.innerWidth < 1280)
        return 3 * 5;
      else if (window.innerWidth > 1280) return 4 * 5;
      else return 8;
    },
    pageNumber() {
      let nb = this.productions.length / this.nbperpage;
      if (this.productions.length % this.nbperpage != 0) nb++;
      return parseInt(nb);
    },
    productions() {
      return this.$store.getters.getProductions;
    },
    produits() {
      return this.$store.getters.getProduits;
    },
    showedProductions() {
      let start = (this.currentPage - 1) * this.nbperpage;
      let end = start + this.nbperpage;
      return this.productions.slice(start, end);
    },
  },
  methods: {
    searchfn: debounce(async function () {
      console.log(this.search);
      this.$store.dispatch("getProductions", {
        date: this.$refs.searchbar.search,
        "$Client.raisonSocial$": this.$refs.searchbar.search,
      });
    }, 500),
    openCreateModal() {
      this.$refs.createModal.open = true;
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
    addProd() {
      this.$store.dispatch("addProduction", {
        ...this.newProduction,
        ProduitId: this.newProduction.Produit.id,
      });
      this.$refs.createModal.open = false;
      this.newProduction = {};
    },
  },
  watch: {
    etatsel: function () {
      this.searchfn();
    },
  },
};
</script>

<style></style>
