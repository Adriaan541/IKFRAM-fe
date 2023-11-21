<template>
  <li class="flex grid grid-cols-4 gap-4 items-center" @click="$router.push(`/shop/${this.product.id}`)">
      <img
          :src="product.pictureUrl"
          :alt="`Picture of ${product.name}`" class="h-20 w-auto object-cover rounded-xl"/>
      <h1 class="text-lg font-semibold text-black cursor-auto my-3">{{ product.name }}</h1>
      <p class="text-sm text-gray-600 cursor-auto ml-2">{{ quantity }}</p>
      <button type="button" @click.prevent="removeFromCart"
              class="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-700">
        Remove
      </button>
  </li>
</template>

<script>
export default {
  props: ['product', 'quantity'],
  methods: {
    removeFromCart() {
      this.$store.dispatch('removeFromCart', this.product.id);
    }
  }
}
</script>
