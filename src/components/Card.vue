<template lang="pug">
.card(:class="{ 'shadow-custom': selected }") 
    .relative
        IconInfo.absolute.right-0
    img.mt-1(  src="../assets/car.png")
    h3.text-md.font-semibold.mt-2 {{class}}
    p.text-xs.mb-2.font-light {{ model}}
    .flex.items-center.gap-5.mt-1
        .flex.items-center
            IconUsers
            p.text-xs.ml-2 {{ passengers }} 
        .flex.items-center
            IconLaggage
            p.text-xs.ml-2 x {{ laggage }}
    .mt-8
        .flex.items-center.gap-3
            p.text-sm.font-bold SAR
            p.text-sm.font-bold {{ price }}
      
</template>
<script setup>
import IconLaggage from "../components/Icons/Luggage.vue";
import IconUsers from "../components/Icons/Users.vue";
import IconInfo from "../components/Icons/Info.vue";

const props = defineProps({
  class: {
    type: String,
    required: true,
    default: "Pure class",
  },
  model: {
    type: String,
    required: true,
    default: "Lucid Air Dream",
  },

  passengers: {
    type: Number,
    required: true,
    default: 2,
  },
  laggage: {
    type: Number,
    required: true,
    default: 4,
  },
  price: {
    type: Number,
    required: true,
    default: 50600.0,
  },
  selected: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
<style>
.card {
  @apply px-3 py-4 bg-white  rounded-[10px] border border-[#B9B9B9] transition hover:border-black cursor-pointer;
}
</style>
