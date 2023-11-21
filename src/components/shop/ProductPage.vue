<template>
  <section>
    <div class="bg-gray-100 dark:bg-gray-800 py-8 rounded-xl shadow-xl">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
          <div class="md:flex-1 px-4">
            <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img class="w-full h-full object-cover" :src="product.pictureUrl" :alt="`Picture of ${product.name}`">
            </div>
            <div class="flex justify-center -mx-2 mb-4">
              <div class="flex items-center mb-2">
                <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    v-model.trim="quantity"
                    required
                    class="w-12 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 rounded-l-full"
                >
                <button
                    :disabled="buttonText !== 'Add to cart'"
                    type="button" @click.prevent="addToCart"
                    class="bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-r-full text-sm px-4 py-2.5 text-center text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  {{buttonText}}
                </button>
              </div>

            </div>
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{{product.name}}</h2>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {{product.shortDescription}}
            </p>
            <div class="flex mb-4">
              <div class="mr-4" v-if="product.price">
                <p class="font-bold text-gray-700 dark:text-gray-300">Price: </p>
                <p class="text-gray-600 dark:text-gray-300">€{{ product.price.toFixed(2) }}</p>
              </div>
              <div v-if="product.stockQuantity > 5">
                <p class="font-bold text-gray-700 dark:text-gray-300">Availability: </p>
                <p class="text-gray-600 dark:text-gray-300">{{product.stockQuantity}}</p>
              </div>
              <div v-if="product.stockQuantity < 5">
                <p class="font-bold text-red-700 dark:text-red-300">Only {{product.stockQuantity}} left!</p>
              </div>
            </div>
            <div>
              <p class="font-bold text-gray-700 dark:text-gray-300">Product Description:</p>
              <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {{product.description}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      product: "getProductById"
    }),
    buttonText() {
      if (this.quantity < 1) {
        return "Can't add less than 1";
      }
      if (this.quantity > this.product.stockQuantity) {
        return "Quantity not in stock";
      }
      return "Add to cart";
    },
  },
  methods: {
    async setProduct() {
      const id = this.$route.params.productId;
      await this.$store.dispatch('getProductById', {id});
    },
    addToCart() {
      if (!this.isLoggedIn) {
        this.$router.push('/login');
      }
      if (this.quantity > 0 && this.quantity <= this.product.stockQuantity) {
        this.$store.dispatch('addToCart', {product: this.product, quantity: this.quantity})
      }
    }
  },
  async beforeMount() {
    await this.setProduct();
  },
}
</script>
