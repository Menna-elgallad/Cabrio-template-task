<template lang="pug">
.wrapper

  .logo
    .menuToggle(class="hidden h-[30px] w-[30px] cursor-pointer border-2 border-transparent rounded-full transition flex items-center justify-center hover:!border-[#bfbfbf]" @click="openMenu = true")
        IconsMenu(class="iconMenu hidden" )
    Logo
    .nav 
    
      router-link.route(to="/") Home
      router-link.route(to="/" @click="showBookArideForm = true") Book a Ride
      router-link.route(to="/") Rides
  .settings
    .balance-container
      .px-6 
        p.text-xs Balance
        h3.font-semibold 50,600.0 SAR
    .profile-container.cursor-pointer.relative 
      div.relative(@click="isOpen = !isOpen" )
        .profile-info
          img(src="../assets/profile.png" alt="profile")
          div
            p.font-medium Khuzimah A.
            p.text-xs Cabrio Co.
      .profile-icon 
          IconsArrowDown.cursor-pointer.trasnition(:class="{ 'transform rotate-180': isOpen } "  )

      transition(name='slide')
        ul.absolute.mt-2.w-full.rounded-lg.shadow-lg.bg-white.ring-1.ring-black.ring-opacity-5.top-14.py-3( class='z-[100]' v-if='isOpen' @click='closeDropdown')
          div.py-4.font-medium.border-b.pl-3( class="hover:border-b-black transition cursor-pointer " @click='closeDropdown'  )
              .flex.justify-between
                  .flex.gap-4
                      IconSettings
                      p.text-black Profile Settings
          div.py-4.font-medium.pl-3( class="border-b border-b-transparent hover:!border-b-black cursor-pointer    " @click='closeDropdown'  )
              .flex.justify-between
                  .flex.gap-4
                      IconLang
                      p.text-black العربية
          .px-3
               button.bg-white.font-semibold.w-full.text-black.px-4.py-2.rounded-lg.mt-4.border-2.border-black( @click='closeDropdown'    class="transition hover:opacity-60" ) Logout
  .mobile-menu(:class='[openMenu ? "!opacity-100 !z-50" : "!opacity-0 !z-[-1]"]' ) 
    MobileMenu(@close="openMenu = false")

</template>

<script setup>
import { ref } from "vue";
import Logo from "./Logo.vue";
import LogoProfile from "./LogoProfile.vue";
import IconsArrowDown from "./Icons/ArrowDown.vue";
import IconsMenu from "./Icons/Menu.vue";
import IconSettings from "./Icons/Settings.vue";
import IconLang from "./Icons/Lang.vue";
import MobileMenu from "./MobileMenu.vue";
const showBookArideForm = ref(false);
const isOpen = ref(false);
const openMenu = ref(false);
const closeDropdown = () => {
  isOpen.value = false;
};
</script>

<style scoped>
.wrapper {
  @apply flex absolute items-center  w-full justify-between  bg-black;
}
.logo {
  @apply flex  items-center justify-center  pl-12 gap-20;
}
.nav {
  @apply flex  items-center justify-center gap-10 text-sm;
}
.settings {
  @apply flex  items-center py-[14px] pr-12 justify-between;
}
.balance-container {
  @apply text-white border-r-[0.5px] border-white border-opacity-30;
}
.profile-container {
  @apply flex text-white  items-center gap-16 justify-between ml-6;
}
.profile-info {
  @apply flex  items-center gap-3;
}
.mobile-menu {
  @apply hidden fixed  transition-all w-[100vw]  h-[100vh] top-0 left-0;
}
@media screen and (max-width: 960px) {
  .nav {
    @apply hidden;
  }
  .wrapper {
    @apply py-4;
  }

  .settings {
    @apply hidden;
  }
  .iconMenu {
    @apply !block;
  }
  .logo {
    @apply gap-4 pl-4;
  }
  .mobile-menu {
    @apply !block;
  }
  .menuToggle {
    @apply !block;
  }
}
</style>
