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
        @click="$router.push({ name: 'Vente', params: { id: 'new' } })"
        v-if="
          currentUser.Profile.Autorisations.find((el) => el.nom == 'add-vente')
        "
      >
        <Icon
          icon="ant-design:file-add-filled"
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
                    </div>
                    <div class="space-y-6">
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
          <h1>Liste des ventes</h1>
        </div>
        <table
          class="bg-white rounded-md mx-1 grid grid-flow-row overflow-hidden text-black my-auto"
        >
          <thead>
            <tr class="w-full grid grid-flow-col">
              <th class="px-2 py-2 col-span-1 hidden md:block"></th>
              <th class="px-4 py-2 col-span-1">Client</th>
              <th class="px-4 py-2 col-span-1">Totale</th>
              <th class="px-4 py-2 col-span-1">Etat</th>
            </tr>
          </thead>
          <tbody class="w-full grid grid-flow-row overflow-auto">
            <VenteRow
              v-for="vente in showedVentes"
              :key="vente.id"
              :vente="vente"
            />
          </tbody>
        </table>
      </div>
      <Pagination
        ref="Pagination"
        :currentPage="currentPage"
        :pageSize="nbperpage"
        :dataLength="ventes.length"
        @page="currentPage = $event"
        @next="currentPage++"
        @prev="currentPage--"
        @first="currentPage = 1"
        @last="currentPage = $refs.Pagination.pageNumber"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
import Pagination from "@/components/Pagination";
import VenteRow from "@/components/VenteRow";
import {
  Dialog,
  DialogOverlay,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import SearchBar from "@/components/SearchBar";
import { FilterIcon, PlusSmIcon, MinusSmIcon } from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/outline";
export default {
  name: "Ventes",
  beforeMount() {
    this.$store.dispatch("getVentes");
  },
  data() {
    return {
      mobileFiltersOpen: false,
      currentPage: 1,
      etatsel: [],
    };
  },
  components: {
    Dialog,
    Pagination,
    VenteRow,
    DialogOverlay,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    TransitionChild,
    TransitionRoot,
    SearchBar,
    FilterIcon,
    XIcon,
    PlusSmIcon,
    MinusSmIcon,
  },
  computed: {
    nbperpage() {
      if (window.innerWidth >= 640 && window.innerWidth < 768) return 13;
      else if (window.innerWidth >= 768 && window.innerWidth < 1280)
        return 3 * 5;
      else if (window.innerWidth > 1280) return 4 * 5;
      else return 8;
    },
    pageNumber() {
      let nb = this.ventes.length / this.nbperpage;
      if (this.ventes.length % this.nbperpage != 0) nb++;
      return parseInt(nb);
    },
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
    ventes() {
      return this.$store.getters.getVentes;
    },
    showedVentes() {
      let start = (this.currentPage - 1) * this.nbperpage;
      let end = start + this.nbperpage;
      return this.ventes.slice(start, end);
    },
  },
  methods: {
    searchfn: debounce(async function () {
      this.$store.dispatch("getVentes", {
        etat: this.etatsel,
        "$Client.raisonSociale$": this.$refs.searchbar.search,
      });
    }, 500),
    openCreateModal() {},
  },
  watch: {
    etatsel: function () {
      this.searchfn();
    },
  },
};
</script>

<style></style>
