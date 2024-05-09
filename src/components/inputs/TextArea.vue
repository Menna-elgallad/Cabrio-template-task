<template lang="pug">
.relative.inline-block
      .input-wrapper(:class='{ "border-error": errorMessage }' class="border-transparent" )
            .label.text-xs.mb-0.leading-3( :for='name') {{label}}
            textarea.font-medium.text-sm.w-full(    rows="4"  v-model='inputValue'   :name='name')
            
        
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
  initialValue: props.value,
});
</script>

<style>
textArea {
  background: transparent;
  outline: none;
  border: none;
}
</style>
