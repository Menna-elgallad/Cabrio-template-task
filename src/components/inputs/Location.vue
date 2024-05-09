<template lang="pug">
.relative.inline-block.cursor-pointer
    .input-wrapper(:class='{ "border-error": errorMessage }' class="border-transparent" @click="showModal = true")
            .label.text-xs.mb-0.leading-3( :for='name') {{label}}
            input.font-medium.text-sm.w-full( :placeholder="placeholder"  v-model='inputValue'   :name='name')
    p.text-xs.text-error {{ errorMessage }}
    IconsLocation( class=' mr-1 ml-2  absolute right-4  top-3' )

    Modal(v-model="showModal")
      .pr-5
        h3.font-semibold.text-2xl.mb-4 Select Pickup location
        img(src="../../assets/location.png" alt="map")
        .flex.justify-between
            button.bg-black.w-full.text-white.px-4.py-2.rounded-lg.mt-4(type="button" class="transition hover:opacity-60" @click="selectLocation") Select
        
</template>

<script setup>
import { ref, watch, toRef } from "vue";
import { useField } from "vee-validate";
import IconsLocation from "../Icons/Location.vue";

import Modal from "../Modal.vue";

const showModal = ref(false);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    required: false,
    default: "",
  },
  label: {
    type: String,
    required: true,
    default: "Label",
  },
  placeholder: {
    type: String,
    required: false,
    default: "Enter text here",
  },
});
const virtualLocation =
  "6995 Utham Ibn Affan Rd , 4636 , An Narjis , Riyadh 13324";
const selectLocation = () => {
  inputValue.value = virtualLocation;
  showModal.value = false;
};
const name = toRef(props, "name");

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<style></style>
