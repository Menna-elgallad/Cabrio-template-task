<template lang="pug">
.home( class=" h-[100vh] overflow-hidden")
    .form-modal
      Form
    .img-container
        img(src="../assets/map.png")
    
</template>
<script setup>
import Form from "../components/Form.vue";
</script>
<style scoped>
.form-modal {
  @apply bg-white absolute  shadow-xl py-5  rounded-lg max-w-[450px]  md:top-[100px] top-[80px] left-[100px];
}
@media screen and (max-width: 960px) {
  .form-modal {
    @apply left-[5%] right-[5%];
  }
}
.img-container {
  @apply h-full w-full;
  img {
    @apply object-cover  w-full h-full;
  }
}
</style>
