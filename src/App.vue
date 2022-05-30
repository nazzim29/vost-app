<template>
  <nav-bar v-if="loggedIn" :extended="true" />
  <div
    class="flex-1 w-full overflow-x-hidden h-screen"
    :class="{ 'pl-1/6 md:pl-16 bg': loggedIn }"
  >
    <router-view />
  </div>
</template>
<style>
body {
  background-color: rgba(55, 65, 81);
  font-family: Roboto;
}
.bg {
  background-color: rgba(55, 65, 81);
}
.pl-1\/6 {
  padding-left: 16.666%;
}
@media (min-width: 768px) {
  .md\:pl-16 {
    padding-left: 3.5rem /* 64px */;
  }
}
</style>
<script>
export default {
  name: "App",
  computed: {
    loggedIn() {
      return this.$store.state.users.authenticated;
    },
  },
};
</script>

<style></style>
