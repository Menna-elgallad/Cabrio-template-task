<template lang="pug">
.mobile-wrapper

    .mobile-logo
        Logo
        .menuToggle( @click="$emit('close')" class="h-[30px] w-[30px] cursor-pointer border-2 border-transparent rounded-full transition flex items-center justify-center hover:!border-[#bfbfbf]")
            IconClose(class="h-[18px]" )
    .mobile-nav(class="mt-[30vh]")
        
          router-link.route.text-3xl(to="/") Home
          router-link.route.text-3xl(to="/" @click="showBookArideForm = true") Book a Ride
          router-link.route.text-3xl(to="/") Rides
    
          
</template>

<script setup>
import { ref } from "vue";
import Logo from "./Logo.vue";

import IconClose from "./Icons/CloseMenu.vue";
</script>

<style scoped>
.mobile-wrapper {
  @apply text-white bg-black h-full flex flex-col p-5;
}
.mobile-logo {
  @apply flex  items-center justify-between;
}

.mobile-nav {
  @apply flex  items-center justify-center flex-col gap-20 text-lg;
}
</style>
