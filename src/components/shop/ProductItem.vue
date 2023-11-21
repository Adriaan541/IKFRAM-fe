<template>
  <div>
    <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <router-link :to="productClickedUrl">
        <img
            :src="product.pictureUrl"
            :alt="`Picture of ${product.name}`" class="h-80 w-72 object-cover rounded-t-xl"/>
        <div class="px-4 py-3 w-72">
          <p class="text-lg font-bold text-black truncate block capitalize">{{ product.name }}</p>
          <p v-if="product.stockQuantity > 5" class="text-blue-500 text-sm">{{product.stockQuantity}} in stock</p>
          <p v-if="product.stockQuantity < 5" class="text-red-500 font-bold text-sm"> Only {{product.stockQuantity}} left!</p>
          <span class="text-gray-400 mr-3 text-xs">{{ product.shortDescription }}</span>
          <div class="flex items-center">
            <p class="text-lg font-semibold text-black cursor-auto my-3">€{{ product.price.toFixed(2) }}</p>
              <p class="text-sm text-gray-600 cursor-auto ml-2">from <del>{{ (product.price * 1.1).toFixed(2) }},-</del></p>
            <div class="ml-auto">
              <button type="button" v-if="isAdmin" @click.prevent="deleteProduct"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Delete
              </button>

              <div class="flex items-center mb-2" v-else>
                <input
                    @click.prevent
                    id="quantity"
                    name="quantity"
                    type="number"
                    v-model.trim="quantity"
                    required
                    class="w-12 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 rounded-l-full"
                >
                <button
                    type="button" @click.prevent="addToCart" :disabled="buttonText !== 'Add to cart'"
                    class="bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-r-full text-sm px-4 py-2.5 text-center text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  {{buttonText}}
                </button>
              </div>

            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: ['product'],
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'isAdmin',
      isLoggedIn: 'isLoggedIn'
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
    productClickedUrl() {
      if (this.isAdmin) {
        return `/editproduct/${this.product.id}`
      }
      return `/shop/${this.product.id}`;
    }
  },
  methods: {
    addToCart() {
      if (!this.isLoggedIn) {
        this.$router.push('/login');
      }
      if (this.quantity > 0 && this.quantity <= this.product.stockQuantity) {
        this.$store.dispatch('addToCart', {product: this.product, quantity: this.quantity})
      }
    },
    async deleteProduct() {
      await this.$store.dispatch('deleteProduct', {productId: this.product.id});
    }
  }
}
</script>
