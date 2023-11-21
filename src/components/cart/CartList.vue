<template>
  <ul class="min-w-[400px] border border-blue-500 p-4">
    <li class="flex grid grid-cols-4 gap-4 items-center">
      <p>Image:</p>
      <p>Name:</p>
      <p>Quantity:</p>
    </li>
    <cart-item
        v-for="cartItem in cart"
        :product="cartItem.product"
        :quantity="cartItem.quantity"
        :key="cartItem.id"></cart-item>
<!--    <li class="flex items-center">-->

<!--    </li>-->
    <li class="flex grid grid-cols-4 gap-4 items-center">
      <button @click="checkout"
          class="col-end-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
              >Checkout</button>
      <button class="col-end-5 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        @click="emptyCart">Empty cart</button>
    </li>
  </ul>
</template>

<script>
import CartItem from './CartItem'
import {mapGetters} from "vuex";
import Order from "@/models/order";

export default {
  data() {
    return {
      order: {Order}
    }
  },
  components: {
    CartItem
  },
  computed: {
    ...mapGetters({
      cart: 'cart',
    })
  },
  methods: {
    emptyCart() {
      this.$store.dispatch('emptyCart');
    },
    async checkout() {
      await this.$store.dispatch('createOrder')
    }
  }
}
</script>
