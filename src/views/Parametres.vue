<template>
  <div
		class="flex flex-col w-full h-screen items-center bg-gray-700 overflow-hidden space-y-1"
	>
		<!-- setting page -->
        <div class="w-full py-4 px-3 flex flex-col space-y-5">
            <button @click="backupandDownload" class="btn btn-primary btn-sm"> Faire un Backup et telecharger </button>
            <button @click="Downloadlast" class="btn btn-primary btn-sm"> telecharger le dernier backup en date </button>
        </div>
	</div>
</template>

<script>
import Api from "@/services/api";
import fileDownload from "js-file-download";
export default {
    methods:{
        backupandDownload(e){
            e.target.disable = true;
            Api.get("/dump").then((res)=>{
                fileDownload(res.data, `${Date.now()}.sql`);
                e.target.disable = false;
            }).catch((err)=>{
                console.log(err)
                e.target.disable = false;
            })
        },
        Downloadlast(e){
            e.target.disable = true;
            Api.get("/lastdump").then((res)=>{
                console.log(res)
                fileDownload(res.data, `${Date.now()}.sql`);
                e.target.disable = false;
            }).catch((err)=>{
                console.log(err)
                e.target.disable = false;
            })
        },
    }
}
</script>

<style>

</style>