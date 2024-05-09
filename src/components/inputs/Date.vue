<template lang="pug">
.relative.inline-block.cursor-pointer(@click="openMenu()")
    .input-wrapper(:class='{ "border-error": errorMessage }' class="border-transparent" )
            .label.text-xs.mb-0.leading-3( :for='name') {{label}}
            VueDatePicker( :is-24='false' class="w-[90%]" v-model='inputValue'  ref='menu' :name='name')
    p.text-xs.text-error {{ errorMessage }}
    
    Calender.cursor-pointer( class='  absolute right-4  top-3' )


</template>

<script setup>
import { ref, toRef, onMounted, onUnmounted } from "vue";
import Calender from "../Icons/Calender.vue";
import { useField } from "vee-validate";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    required: true,
    default: new Date(),
  },
  label: {
    type: String,
    required: true,
    default: "Label",
  },
});
const menu = ref();

const openMenu = () => {
  menu.value.openMenu();
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

<style>
:root {
  /*General*/
  --dp-input-icon-padding: 0px;
  --dp-input-padding: 0px;
  --dp-border-radius: 8px;
  --dp-cell-border-radius: 50% !important; /*Specific border radius for the calendar cell*/
}
.dp__theme_light {
  --dp-primary-color: black;
  --dp-primary-disabled-color: #aaaeb7;
}
.dp__input {
  border: none;
  outline: none;
  background: none;
  @apply !text-sm;
}
.dp__clear_icon,
.dp__input_icon {
  display: none;
}
.dp__outer_menu_wrap.dp--menu-wrapper,
.dp--tp-wrap {
  width: 100% !important;
  max-width: 100% !important;
  left: 0 !important;
}
.dp__menu.dp__menu_index {
  border: 0 !important ;
  box-shadow: 0px 0px 20px 4px rgba(191, 191, 191, 0.25);
}
</style>
