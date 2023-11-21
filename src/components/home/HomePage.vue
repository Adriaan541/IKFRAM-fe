<template>
  <section>

    <div class="text-center p-10">
      <h1 class="font-bold text-4xl text-purple-800 mb-4">Welcome!</h1>

      <div>
        <h1 class="text-3xl">Check out our limited stock: </h1>
      </div>
    </div>

    <section id="Projects"
             class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

      <product-item
          v-for="product in getProductsToDisplay"
          :key="product.id"
          :product="product"></product-item>
    </section>
  </section>
</template>

<script>
import ProductItem from '../shop/ProductItem'
import {mapGetters} from "vuex";

export default {
  components: {
    ProductItem
  },
  data() {
    return {
      selectedCategory: 'none'
    }
  },
  computed: {
    ...mapGetters({
      products: 'products',
      isAdmin: "isAdmin",
      isLoggedIn: "isLoggedIn",
      categories: "categories"
    }),
    getProductsToDisplay() {
      return this.products.filter((product) => product.stockQuantity < 10);
    }
  },
  methods: {
    async getProductsAndCategories() {
      await this.$store.dispatch('getProducts');
      await this.$store.dispatch('getCategories');
    },
  },
  beforeMount() {
    this.getProductsAndCategories();
  }
}
</script>
