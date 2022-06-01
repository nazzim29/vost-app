<template>
  <div
    class="flex flex-col w-full h-screen items-center bg-gray-700 overflow-hidden space-y-1"
  >
    <!-- setting page -->
    <div
      class="w-full py-4 px-3 flex flex-col md:flex-row space-y-5 space-x-5 h-full"
      style="align-items: center; display: flex; justify-content: center"
    >
      <div class="w-1/6"></div>
      <div
        class="card md:card-side bg-base-100 shadow-xl w-full md:w-2/6 h-80 p-12"
      >
        <div
          class="card-body p-0"
          style="align-items: center; display: flex; justify-content: center"
        >
          <img src="/img/upload.png" alt="" style="height: 200px" />
          <button @click="backupandDownload" class="btn btn-primary btn-sm">
            Faire un Backup et telecharger
          </button>
        </div>
      </div>
      <div
        class="card md:card-side bg-base-100 shadow-xl w-full md:w-2/6 h-80 p-12"
      >
        <div
          class="card-body p-0"
          style="align-items: center; display: flex; justify-content: center"
        >
          <img
            src="/img/backup.png"
            alt=""
            style="height: 200px; width: 250px"
          />
          <button @click="Downloadlast" class="btn btn-primary btn-sm">
            telecharger le dernier backup en date
          </button>
        </div>
      </div>
      <div class="w-1/6"></div>
    </div>
  </div>
</template>

<script>
import Api from "@/services/api";
import fileDownload from "js-file-download";
export default {
  methods: {
    backupandDownload(e) {
      e.target.disable = true;
      Api.get("/dump")
        .then((res) => {
          fileDownload(res.data, `${Date.now()}.sql`);
          e.target.disable = false;
        })
        .catch((err) => {
          console.log(err);
          e.target.disable = false;
        });
    },
    Downloadlast(e) {
      e.target.disable = true;
      Api.get("/lastdump")
        .then((res) => {
          console.log(res);
          fileDownload(res.data, `${Date.now()}.sql`);
          e.target.disable = false;
        })
        .catch((err) => {
          console.log(err);
          e.target.disable = false;
        });
    },
  },
};
</script>

<style></style>
