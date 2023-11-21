<template>
  <div class="grid grid-cols-2">
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="@/assets/images/webshop-logo.gif" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add a category</h2>

      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-2">
              <input id="name" name="name" type="text" required v-model="category.name"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="mt-2">
            <p class="text-red-400" v-if="error">An error occured: {{ error }}</p>
            <p class="text-green-400" v-if="succesMessage">Succes: {{ succesMessage }}</p>
          </div>

          <div>
            <button type="submit" v-if="!isLoading"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Add category
            </button>
            <button
                type="button"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                v-else disabled>
              Loading...
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="@/assets/images/webshop-logo.gif" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Categories</h2>
        <ul>
          <li v-for="category in categories" :key="category.id"
              class="rounded m-0.5 border border-blue-500 grid grid-cols-2 items-center">
            <p>{{ category.name }}</p>
            <button type="button" @click="deleteCategoryClicked(category)"
                    class="m-0.5 my-1 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Delete
            </button>
          </li>
        </ul>

        <div v-if="warning === 'deleteAccountWarning'"
             class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div class="bg-white p-6 rounded shadow-lg max-w-md">
            <h2 class="text-xl font-bold mb-4">Are you sure you want to delete category "{{ categoryToDelete.name }}"
              and it's products?</h2>
            <p>(This cannot be reversed)</p>
            <div class="flex justify-end">
              <button @click="deleteCategoryConfirmed"
                      class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2" id="confirmButton">Yes
              </button>
              <button @click="deleteCategoryCanceled"
                      class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" id="cancelButton">No
              </button>
            </div>
          </div>
        </div>

        <button
            class="flex w-full justify-center rounded-md m-0.5 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <router-link to="/addproduct">Add product instead</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Category from "@/models/category";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      category: {Category},
      categoryToDelete: null,
      isLoading: false,
      error: null,
      warning: '',
      succesMessage: null
    }
  },
  computed: {
    ...mapGetters({
      categories: "categories"
    })
  },
  methods: {
    async getCategories() {
      await this.$store.dispatch('getCategories');
    },
    async submitForm() {
      try {
        this.succesMessage = null;
        this.error = null;
        await this.$store.dispatch('addCategory', this.category);
        this.succesMessage = 'Category added';
        await this.getCategories();
      } catch (error) {
        this.error = error;
      }
      this.category.name = '';
    },
    deleteCategoryClicked(category) {
      this.categoryToDelete = category;
      this.warning = 'deleteAccountWarning'
    },
    deleteCategoryCanceled() {
      this.categoryToDelete = null;
      this.warning = '';
    },
    async deleteCategoryConfirmed() {
      await this.$store.dispatch('deleteCategory', {categoryId: this.categoryToDelete.id});
      this.warning = '';
    }
  },
  beforeMount() {
    this.getCategories();
  }
}
</script>
