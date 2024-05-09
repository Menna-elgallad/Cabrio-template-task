<template lang="pug">
div
    p.absolute.z-20.text-xl.font-medium.px-5 Select car class
    swiper.mySwiper(   :breakpoints="{ '640': {  slidesPerView: 1 },  '768': { slidesPerView:2.2} }"      :pagination='{clickable: true}' :navigation="true" :modules='modules' )
            swiper-slide(v-for='(car, index) in cars' :key='index' @click='selectOrUnSelect(car)' )
                .px-5.py-4
                    Card( :selected="car?.id ===selectedCar?.id"  :class='car.class' :model='car.model' :passengers='car.passengers' :laggage='car.laggage' :price='car.price')
    p.text-xs.text-error.px-5 {{ errorMessage }}
        
</template>

<script setup>
import { ref, toRef } from "vue";
import { useField } from "vee-validate";
import Card from "../components/Card.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modules = [Navigation];
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
const cars = [
  {
    id: 1,
    class: "Pure class",
    model: "Lucid Air Dream",
    passengers: 2,
    laggage: 4,
    price: 850.5,
  },
  {
    id: 2,
    class: "Business Class",
    model: "Mercedes E450 Class",
    passengers: 2,
    laggage: 2,
    price: 240.0,
  },
  {
    id: 3,
    class: "Economy Class",
    model: "Toyota Camry",
    passengers: 4,
    laggage: 2,
    price: 100.0,
  },
  {
    id: 4,
    class: "Low Class",
    model: "Hyundai Accent",
    passengers: 4,
    laggage: 2,
    price: 50.0,
  },
];
const selectedCar = ref(null);
function selectOrUnSelect(car) {
  if (selectedCar.value?.id === car.id) {
    selectedCar.value = null;
  } else {
    selectedCar.value = car;
  }
  inputValue.value = selectedCar.value?.id ? selectedCar.value.id : "";
}

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
.swiper {
  width: 100%;
  padding-top: 1rem;
  /* height: 100%; */
}

.swiper-slide {
  background: #fff;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper-button-next,
.swiper-button-prev {
  background-position: center;
  top: 10px;
  background-repeat: no-repeat;
}
.swiper-button-prev {
  left: unset;
  @apply right-14;
  background-image: url("../assets/arrowleft.svg");
}
.swiper-button-next {
  left: unset;

  background-image: url("../assets/arrowright.svg");
  @apply right-5;
}
.swiper-button-next::after,
.swiper-button-prev::after {
  content: "";
}
</style>
