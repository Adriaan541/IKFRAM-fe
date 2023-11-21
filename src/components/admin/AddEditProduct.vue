<template>
  <section>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border">
      <div class="sm:mx-auto sm:w-full sm:min-w-2xl">
        <img class="mx-auto h-14 w-auto" src="@/assets/images/webshop-logo.gif" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add a product</h2>
        <button
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <router-link to="/addcategory">Add product category</router-link>
        </button>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-2">
              <input id="name" name="name" type="text" required v-model="product.name"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Short description: </label>
            </div>
            <div class="mt-2">
              <input id="description" name="description" type="text" required
                     v-model="product.shortDescription"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
            </div>
            <div class="mt-2">
              <textarea id="description" name="description" type="text"
                     v-model="product.description"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
            </div>
            <div class="mt-2">
              <input id="price" name="price" type="number" step="0.01" required
                     v-model="product.price"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="stockQuantity" class="block text-sm font-medium leading-6 text-gray-900">Stock
                quantity</label>
            </div>
            <div class="mt-2">
              <input id="stockQuantity" name="stockQuantity" type="number" required
                     v-model="product.stockQuantity"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="pictureUrl" class="block text-sm font-medium leading-6 text-gray-900">Picture url</label>
            </div>
            <div class="mt-2">
              <input id="pictureUrl" name="pictureUrl" type="text" required
                     v-model="product.pictureUrl" maxlength="255"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="pictureUrl" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
            </div>
            <div class="mt-2">
              <select class="w-full" id="category" name="category" v-model="product.category">
                <option v-for="category in categories" :key="category.id" :value="category">{{ category.name }}</option>
              </select>
            </div>
          </div>

          <div class="mt-2">
            <p class="text-red-400" v-if="error">An error occured: {{ error }}</p>
            <p class="text-green-400" v-if="succesMessage">Succes: {{ succesMessage }}</p>
          </div>

          <div>
            <button type="submit" v-if="!isLoading && !id"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Add product
            </button>
            <button type="submit" v-if="!isLoading && id"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Edit product
            </button>
            <button
                type="button"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                v-if="isLoading" disabled>
              Loading...
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      id: null,
      isLoading: false,
      error: null,
      succesMessage: null
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
      isAdmin: "isAdmin",
      product: "getProductById"
    }),
  },
  methods: {
    async submitForm() {
      try {
        this.succesMessage = null;
        this.error = null;
        if (!this.id) {
          await this.$store.dispatch('addProduct', this.product);
          this.succesMessage = 'Product added to catalog!';
        } else {
          await this.$store.dispatch('updateProduct', {product: this.product, id: this.id});
          this.succesMessage = 'Product updated!';
        }
        const selectedCategory = this.product.category;
        this.product.category = selectedCategory;
      } catch (error) {
        this.error = error;
      }
    },
    async getCategories() {
      await this.$store.dispatch('getCategories');
      if (!this.id) {
        this.product.category = this.categories[0];
      }
    },
    async setProductToEdit() {
      const id = this.$route.params.productId;
      if (id) {
        this.id = id;
        await this.$store.dispatch('getProductById', {id});
      } else {
        await this.$store.commit('resetProductById');
      }
    }
  },
  beforeMount() {
    this.getCategories();
    this.setProductToEdit();
  },
}
</script>
