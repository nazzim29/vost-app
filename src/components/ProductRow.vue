<template>
    <div class="h-32 w-11/12 bg-white mx-auto rounded-md flex flex-col overflow-hidden max-h-28 xl:max-h-40 max-w-xs">
        <div class="w-full h-1/2 rounded-t-md">
            <div :style="{'background-color': `#${produit.Couleur.code}`}" class="w-full h-full object-fit flex flex-col p-1 space-y-2">
                <div class="w-full flex flex-row justify-between">
                    <Icon icon="ic:baseline-favorite" class="h-5 w-5" :class="{'text-red-400' : produit.featured,'text-gray-300':!produit.featured}" @click="fav"/>
                    <Icon icon="bx:bx-edit-alt" class="h-5 w-5 text-gray-600" @click="this.emmit('edit',produit)" />
                    <Icon icon="clarity:archive-line" class="h-5 w-5 text-red-600" @click="this.$emmit('delete')" />
                </div>
                <span class="font-bold w-full text-lg text-center">{{produit.TypeProduit.nom}}</span>
            </div>
        </div>
        <div class="flex flex-row w-full p-2 divide-x-2 h-1/2">
            <div class="flex flex-col h-full w-1/3 justify-center items-center">
                <label class="text-xl font-bold text-black antialiased">{{produit.prix}}</label>
                <label class="text-sm font-light text-gray-500 antialiased">DZD</label>
            </div>
            <div class="flex flex-col h-full w-1/3 justify-center items-center">
                <label class="text-xl font-bold text-black antialiased">{{produit.contenance}}</label>
                <label class="text-sm font-light text-gray-500 antialiased">Litres</label>
            </div>
            <div class="flex flex-col h-full w-1/3 justify-center items-center">
                <label class="text-xl font-bold text-black antialiased">{{produit.quantite}}</label>
                <label class="text-sm font-light text-gray-500 antialiased">Unités</label>
            </div>

        </div>
    </div>
</template>

<script>
import {Icon} from '@iconify/vue'
export default {
    name:"ProductRow",
    props:["produit"],
    components:{
        Icon
    },
    data(){
        return{
            
        }
    },


}
</script>

<style>

</style>