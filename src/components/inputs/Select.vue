<template lang="pug">
.relative.inline-block
  .input-wrapper(@click='isOpen = !isOpen' :class='{ "border-error": errorMessage , "rounded-t-lg": isOpen, "rounded-lg": !isOpen }' class="border-transparent")
    .label.text-xs.mb-0.leading-3( :for='name') {{label}}
    input.cursor-pointer.font-medium.text-sm( :placeholder="placeholder"  v-model='inputValue' readonly=''  :name='name')
  IconsArrowDown.cursor-pointer(:class="{ 'transform rotate-180': isOpen } " class=' mr-1 ml-2  absolute right-4 mt-2 top-2' color="black")
  p.text-xs.text-error {{ errorMessage }}
  transition(name='slide')
    ul.absolute.mt-2.w-full.rounded-lg.shadow-lg.bg-white.ring-1.ring-black.px-2.ring-opacity-5.py-3( class='z-[100]' v-if='isOpen' @click='closeDropdown')
      li.cursor-pointer.select-none.relative.py-2.pl-3.pr-9.rounded-md.mb-1(class="transition hover:bg-black hover:text-white"  :class="{ 'bg-black text-white': option.value === inputValue }" v-for='option in options' :key='option.value' @click='selectItem(option.value, option.label)')
        span.block.truncate.text-sm(:class="{ 'font-semibold': option.value === inputValue && !option.description }") {{ option.label }}
        span.block.truncate.text-xs(v-if="option.description") {{ option.description }}
      

</template>

<script setup>
import { ref, watch, toRef } from "vue";
import { useField } from "vee-validate";
import IconsArrowDown from "../Icons/ArrowDown.vue";
const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
    ],
  },
  value: {
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
    default: "Label",
  },
  placeholder: {
    type: String,
    required: false,
    default: "Select an option",
  },
});
const isOpen = ref(false);

const closeDropdown = () => {
  isOpen.value = false;
};

const selectItem = (value, label) => {
  inputValue.value = value;
  closeDropdown();
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
  initialValue: props.value ? props.value : "",
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from {
  transform: translateY(-3%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateY(-3%);
  opacity: 0;
}
</style>
