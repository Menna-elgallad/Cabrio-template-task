<template lang="pug">
.relative.inline-block
    .input-wrapper(:class='{ "border-error": errorMessage }' class="border-transparent" )
            .label.text-xs.mb-0.leading-3( :for='name') {{label}}
            input.font-medium.text-sm.w-full( :type='type' :placeholder="placeholder"  v-model='inputValue'   :name='name')
    p.text-xs.text-error {{ errorMessage }}
    
</template>

<script setup>
import { ref, watch, toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
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
  type: {
    type: String,
    required: false,
    default: "text",
  },
});

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.value,
});
</script>

<style></style>
