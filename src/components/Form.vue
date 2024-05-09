<template lang="pug">
div 
    Form(@submit="onSubmit" ref="myform" :validation-schema="schema" @invalid-submit='invalidSubmit' v-slot="{values , errors}" )
          h1.mb-3.text-3xl.font-semibold(class='md:px-5 px-3') Book a Ride
          .scroller.form.grid.grid-cols-1.gap-2.relative( class="h-[68vh] overflow-y-auto")
            .w-full(class="md:px-5 px-3")
                InputSelect.w-full(label="Ride Type"   name="rideType" :options="rideOptions"  )
            .w-full(class="md:px-5 px-3")
                CheckBox.w-full(label="This ride book for another person" name="anotherPerson" )
            .w-full(class="md:px-5 px-3")( v-if="values.anotherPerson")
                InputSelectTextPair.w-full(label="Person Name" name="name" :options="genderOptions"  )
            .w-full(class="md:px-5 px-3")( v-if="values.anotherPerson")
                InputSelectTextPair.w-full(label="Mobile Number" @optionSelected="val=>phonePrefix = val" type="tel" name="mobile" :options="phoneOptions"  )
            .w-full(class="md:px-5 px-3")
                InputSelect.w-full(label="From" placeholder="Select airport" name="from" :options="airportOptions"  )
            .w-full(class="md:px-5 px-3")
                InputLocation.w-full(label="To" name="location" placeholder="Select destination")
            .w-full(class="md:px-5 px-3")
                InputDate.w-full(label="Trip Date" name="date")
            .w-full(class="md:px-5 px-3") 
                InputText.w-full(  placeholder="Enter flight number" label="Flight number" name="flightNumber")
            
            CarsSlider.mt-3(label="Select Car" name="car")
            .w-full(class="md:px-5 px-3") 
                .flex.justify-end.w-full.mb-3        
                    p.text-sm.opacity-50 Fees
                div(v-for="item in fees" :key="i").mb-2
                    .flex.justify-between
                        .flex.gap-2.items-center
                                CheckBox(:label="item.title"  :name="item.name")
                                IconInfo(v-if="item.info")
                        p.text-sm.font-medium {{item.price}} SAR
            .w-full(class="md:px-5 px-3").mb-5       
                TextArea.w-full(  placeholder="Luggage information, special needs or tasks for driver" label="A special comment" name="additionalInformation")     

            .w-full(class="md:px-5 px-3").mb-10 
                p.text-xl.font-medium.mb-4 Summery
                div(v-for="item in Summery" ).mb-2
                    .flex.justify-between
                        .flex.gap-2.items-center
                            
                                p.text-sm {{item.title}}
                                IconInfo(v-if="item.info")
                        p.text-sm.font-medium {{item.price}} SAR
                .flex.justify-between.font-bold.mt-1
                    p.text-sm Total
                    p.text-sm  2,450.0 SAR
          .submit(class=" pt-4")
              .flex.justify-between(class='md:px-5 px-3')
                  p.text-sm Payment Method
                  p.text-sm.font-bold  Balance . SAR 20,450.00
              div(class='md:px-5 px-3')
                  button.bg-black.w-full.text-white.px-4.py-2.rounded-lg.mt-4(  class='disabled:!opacity-10 ' :disabled='getDisable(values,errors)'  class="transition hover:opacity-60" ) Submit
        
    Modal(v-model='showPaymentModal')
        div(class="w-[80%]")
            p.text-3xl.font-semibold.mb-1 Payment Method
            p.text-sm Please select payment method for your next request
        div.py-4.font-medium.border-b( class="hover:border-b-black transition cursor-pointer "  v-for="payment in payments" :class='{"border-b-black !font-bold" : selectedPayment?.data===payment?.data}' @click="selectPayment(payment)" )
            .flex.justify-between
                .flex.gap-4
                    component(:is="payment.component"  )
                    p {{ payment.data }}
                .px-5
                    IconCheck(:class="{'!opacity-100'  :selectedPayment?.data===payment?.data}"  class="opacity-0 transition")
        div.pt-4.flex.gap-4.font-medium
            IconPlus
            p Add payment method

</template>

<script setup>
import { ref, watch } from "vue";
import { Form } from "vee-validate";
import { phone } from "phone";
import * as Yup from "yup";
import InputSelect from "../components/inputs/Select.vue";
import InputText from "../components/inputs/Text.vue";
import CheckBox from "../components/inputs/CheckBox.vue";
import InputLocation from "../components/inputs/Location.vue";
import InputDate from "../components/inputs/Date.vue";
import TextArea from "../components/inputs/TextArea.vue";
import CarsSlider from "../components/CarsSlider.vue";
import IconInfo from "../components/Icons/Info.vue";
import IconWallet from "../components/Icons/Wallet.vue";
import IconVisa from "../components/Icons/Visa.vue";
import IconAmex from "../components/Icons/Amex.vue";
import IconCheck from "../components/Icons/Check.vue";
import IconPlus from "../components/Icons/Plus.vue";
import Modal from "../components/Modal.vue";
import InputSelectTextPair from "../components/inputs/SelectTextPair.vue";
const fees = [
  { title: "Name-Board", price: "0.0", info: true, name: "nameBoard" },
  { title: "Child's seat", price: "130.0", name: "childSeat" },
  { title: "Altanfithi Accsess", price: "2,000.0", name: "altanfithiAccsess" },

  {
    title: "Additional car for luggages",
    price: "250.0",
    info: true,
    name: "additionalCarForLuggages",
  },
];
const Summery = [
  { title: "Services cost", price: "450.0" },
  { title: "Additions fees", price: "2,000.0" },
  { title: "VAT", price: "100.0" },
  { title: "Additional car for luggages", price: "250.0" },
];
const showPaymentModal = ref(false);
function onSubmit(values) {
  showPaymentModal.value = true;
}
const rideOptions = [
  { label: "Airport Pickup", value: "Airport Pickup" },
  { label: "Airport Drop-off", value: "Airport Drop-off" },
  { label: "For a Day", value: "For a Day" },
  { label: "By Hours", value: "By Hours" },
];
const airportOptions = [
  {
    label: "Riyadh (RUH)",
    value: "Riyadh (RUH)",
    description: "King Fahd International Airport",
  },
  {
    label: "Jeddah (JED)",
    value: "Jeddah (JED)",
    description: "King Abdulaziz International Airport",
  },
  {
    label: "Dammam (DMM)",
    value: "Dammam (DMM)",
    description: "King Fahd International Airport Dammam",
  },
];

const genderOptions = [
  {
    label: "Mrs",
    value: "Mrs",
  },
  {
    label: "Mr",
    value: "Mr",
  },
];
const phoneOptions = [
  { label: "+966", value: "+966" },
  { label: "+20", value: "+20" },
];
const selectedPayment = ref();
const phonePrefix = ref("+966");
function selectPayment(payment) {
  if (selectedPayment.value?.data === payment.data) {
    selectedPayment.value = null;
  } else {
    selectedPayment.value = payment;
  }
}
const payments = [
  {
    component: IconWallet,
    data: "Company Balance . SAR 20,450.00",
  },
  {
    component: IconWallet,
    data: "My wallet . SAR 2,450.00",
  },
  {
    component: IconVisa,
    data: "Visa . 5766",
  },
  {
    component: IconAmex,
    data: "Amex . 5736",
  },
];
const schema = Yup.object({
  rideType: Yup.string().required().label("Ride Type"),
  from: Yup.string().required().label("From"),
  location: Yup.string().required().label("To"),
  flightNumber: Yup.string().required().label("Flight Number"),
  date: Yup.string().required().label("Trip Date"),
  car: Yup.string().required().label("car"),
  anotherPerson: Yup.boolean().default(false),
  nameBoard: Yup.boolean().default(false),
  childSeat: Yup.boolean().default(false),
  altanfithiAccsess: Yup.boolean().default(false),
  additionalCarForLuggages: Yup.boolean().default(false),
  name: Yup.string().when("anotherPerson", {
    is: (val) => {
      return val;
    },
    then: () => Yup.string().min(2).required().label("Person Name"),
    otherwise: () => Yup.string().optional().label("Person Name"), // Optional if anotherPerson is false
  }),
  mobile: Yup.string().when("anotherPerson", {
    is: (val) => {
      return val;
    },
    then: () =>
      Yup.string()
        .required()
        .label("Mobile Number")
        .test(
          "is-valid",
          (message) => "please input valid phone",
          (value) => {
            return value
              ? phone(phonePrefix.value + value).isValid
              : new Yup.ValidationError("Invalid value");
          }
        ),
    otherwise: () => Yup.string().optional().label("Mobile Number"), // Optional if anotherPerson is false
  }),
  additionalInformation: Yup.string().optional().label("A special comment"),
});
const requiredInputs = [
  "rideType",
  "from",
  "location",
  "date",
  "car",
  "name",
  "mobile",
];
const invalidSubmit = (val) => {
  console.log(val);
};
function getDisable(values, errors) {
  const noError = Object.keys(errors).length === 0;
  return !Object.keys(values).every((element) => {
    if (requiredInputs.includes(element)) {
      return values[element] !== "" && noError;
    } else {
      return true;
    }
  });
}
</script>

<style>
.submit {
  box-shadow: 0 -10px 8px -5px #c1c1c12e;
}

.scroller::-webkit-scrollbar {
  width: 5px;
  z-index: 1000;
}

/* .scroller::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
} */

.scroller::-webkit-scrollbar-thumb {
  background-color: rgb(236, 236, 236);
  border-radius: 20px;
}
</style>
