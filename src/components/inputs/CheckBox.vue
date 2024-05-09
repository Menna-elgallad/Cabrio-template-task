<template lang="pug">
p.comment-form-cookies-consent
  input(:name='name' :id="name" type='checkbox' v-model='inputValue'  )
  label.text-sm(:for='name') {{ label }}

</template>

<script setup>
import { ref, toRef } from "vue";

import { useField } from "vee-validate";
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
});

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
  initialValue: props.value ? props.value : false,
});
</script>

<style>
input[type="checkbox"] {
  position: relative;

  border-radius: 4px;
  background: none;
  cursor: pointer;
  line-height: 0;
  margin: 0 0.6em 0 0;
  outline: 0;
  padding: 0 !important;
  vertical-align: text-top;

  height: 22px;
  width: 22px;
  -webkit-appearance: none;
  border: 2px solid transparent;
  background-color: #f1f1f1;
}

input[type="checkbox"]:checked {
  border-color: black;
  opacity: 1;
}
input[type="checkbox"]:checked:before {
  border-color: black;
  opacity: 1;
}

input[type="checkbox"]:before {
  content: "";
  position: absolute;
  right: 50%;
  top: 50%;
  width: 4px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  margin: -1px -1px 0 -1px;
  transform: rotate(45deg) translate(-50%, -50%);
  z-index: 2;
  opacity: 0;
}
</style>
