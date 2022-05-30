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
        @click="$router.push({ name: 'Paiement', params: { id: 'new' } })"
        v-if="
          currentUser.Profile.Autorisations.find(
            (el) => el.nom == 'add-paiement'
          )
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
                <div class="px-4 flex items-center justify-between mb-3">
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
                <div class="border-gray-400 px-4 py-3">
                  <label for="" class="text-white">Date de début</label>
                  <input
                    class="w-full px-2 py-3 mt-2 bg-gray-700 w-full flex items-center justify-between text-gray-400 hover:text-gray-200"
                    type="date"
                    name=""
                    id=""
                  />
                </div>
                <div class="border-gray-400 px-4 py-3">
                  <label for="" class="text-white">Date de fin</label>
                  <input
                    class="w-full px-2 py-3 mt-2 bg-gray-700 w-full flex items-center justify-between text-gray-400 hover:text-gray-200"
                    type="date"
                    name=""
                    id=""
                  />
                </div>
              </div>
            </TransitionChild>
          </Dialog>
        </TransitionRoot>
      </div>
    </div>
    <div class="flex-1 flex flex-col h-full w-full overflow-hidden">
      <div
        class="h-full md:justify-center aligned-center m-4 overflow-auto overflow-x-hidden py-3"
      >
        <div class="text-white text-2xl m-2 mb-4 font-bold">
          <h1>Liste des paiements</h1>
        </div>
        <table
          class="bg-white rounded-md mx-1 grid grid-flow-row overflow-hidden text-black top-0"
        >
          <thead>
            <tr class="w-full grid grid-flow-col">
              <th class="px-2 py-2 col-span-1 hidden md:block"></th>
              <th class="px-4 py-2 col-span-1">Date de paiement</th>
              <th class="px-4 py-2 col-span-1">Client</th>
              <th class="px-4 py-2 col-span-1">Montant Total</th>
            </tr>
          </thead>
          <tbody class="w-full grid grid-flow-row overflow-auto">
            <PaiementRow
              v-for="paiement in showedPaiements"
              :key="paiement.id"
              :paiement="paiement"
            />
          </tbody>
        </table>
      </div>
      <Pagination
        ref="Pagination"
        :currentPage="currentPage"
        :pageSize="nbperpage"
        :dataLength="paiements.length"
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
import PaiementRow from "@/components/PaiementRow";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import SearchBar from "@/components/SearchBar";
import { Icon } from "@iconify/vue";
import { FilterIcon } from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/outline";
export default {
  name: "Paiements",
  beforeMount() {
    this.$store.dispatch("getPaiements");
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
    PaiementRow,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    SearchBar,
    Icon,
    FilterIcon,
    XIcon,
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
      let nb = this.paiements.length / this.nbperpage;
      if (this.paiements.length % this.nbperpage != 0) nb++;
      return parseInt(nb);
    },
    paiements() {
      return this.$store.getters.getPaiements;
    },
    showedPaiements() {
      let start = (this.currentPage - 1) * this.nbperpage;
      let end = start + this.nbperpage;
      return this.paiements.slice(start, end);
    },
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {
    searchfn: debounce(async function () {
      console.log(this.search);
      this.$store.dispatch("getPaiements", {
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
