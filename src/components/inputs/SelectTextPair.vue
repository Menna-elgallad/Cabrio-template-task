<template lang="pug">
.relative.inline-block
    .input-wrapper.flex( :class='{ "border-error": errorMessage , "rounded-t-lg": isOpen, "rounded-lg": !isOpen }' class="border-transparent")
        .w-fit.border-r-black.border-r-2.border-r-solid.mr-2.relative(class="md:w-1/4  w-1/5" @click='isOpen = !isOpen')
            input.cursor-pointer.font-medium.text-sm(  class=" w-3/4" v-model='optionSelected' readonly=''  )
            IconsArrowDown.cursor-pointer(:class="{ 'transform rotate-180': isOpen } " class=' mr-1 ml-2  absolute   md:right-2 right-0  top-2' color="black")
        .input
            .label.text-xs.mb-0.leading-3( :for='name') {{label}}
            input.font-medium.text-sm.w-full(  :type='type' v-model='inputValue'   :name='name')

    p.text-xs.text-error {{ errorMessage }}
    transition(name='fade')
        ul.absolute.mt-2.w-full.rounded-lg.shadow-lg.bg-white.ring-1.ring-black.px-2.ring-opacity-5.py-3( class='z-[100]' v-if='isOpen' @click='closeDropdown')
            li.cursor-pointer.select-none.relative.py-2.pl-3.pr-9.rounded-md.mb-1(class="transition hover:bg-black hover:text-white"  :class="{ 'bg-black text-white': option.value === inputValue }" v-for='option in options' :key='option.value' @click='selectItem(option.value, option.label)')
                span.block.truncate.text-sm(:class="{ 'font-semibold': option.value === inputValue && !option.description }") {{ option.label }}
                span.block.truncate.text-xs(v-if="option.description") {{ option.description }}
        

</template>

<script setup>
import { ref, watch, toRef, defineEmits } from "vue";
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
  type: {
    type: String,
    required: false,
    default: "text",
  },
});
const isOpen = ref(false);

const closeDropdown = () => {
  isOpen.value = false;
};
const emit = defineEmits(["optionSelected"]);
const optionSelected = ref(props.options[0].value);
const selectItem = (value, label) => {
  optionSelected.value = value;
  emit("optionSelected", value);
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
