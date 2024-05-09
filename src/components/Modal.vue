<template lang="pug">
vue-final-modal(classes="modal-container" content-class="modal-content" v-model="showModal" )
    .close(@click="showModal = false" ) 
        Close
    .mt-4
       slot
</template>

<script setup>
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import Close from "./Icons/Close.vue";
const showModal = defineModel();
</script>

<style scoped>
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.modal-content) {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 20px;
  padding-right: 0 !important;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  background: #fff;
  min-width: 400px;
}
</style>
