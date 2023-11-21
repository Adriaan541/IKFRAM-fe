<template>
  <section>
    <div id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-1">
        <button type="button"
                class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 bg-gray-100 border-gray-400 rounded-t dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                data-accordion-target="#accordion-collapse-body-1"
                @click="toggleAccordeon" :aria-expanded="accordeonExpanded" aria-controls="accordion-collapse-body-1">
          <span>{{ formatDate(order.orderDate) }}</span>
          <span></span>
          <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5 5 1 1 5"/>
          </svg>
        </button>
      </h2>
      <div id="accordion-collapse-body-1" :class="{'hidden': !accordeonExpanded}"
           class="mb-1"
           aria-labelledby="accordion-collapse-heading-1">
        <div class="hidden sm:hidden md:hidden lg:grid grid-cols-1 lg:grid-cols-7 justify-center items-center border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <p class="mb-2 md:col-span-2 text-white lg:inline-block">Image: </p>
          <p class="mb-2 text-white lg:inline-block">Name: </p>
          <p class="mb-2 col-span-1 lg:col-span-2 md:col-span-2 text-white lg:inline-block">Short description: </p>
          <p class="mb-2 text-white lg:inline-block">Quantity: </p>
          <p class="mb-2 text-white lg:inline-block">Price: </p>
        </div>
        <div v-for="orderProduct in order.orderProducts" :key="orderProduct.id" @click="$router.push(`/shop/${orderProduct.product.id}`)"
             class="p-5 border border-b-0 grid grid-cols-1 lg:grid-cols-7 justify-center items-center border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <img
              v-if="orderProduct.product.pictureUrl"
              :src="orderProduct.product.pictureUrl"
              :alt="`Picture of ${orderProduct.product.name}`" class="h-20 w-auto md:col-span-2 rounded justify-center items-center"/>
          <p class="mb-2 text-white">{{ orderProduct.product.name }}</p>
          <p class="mb-2  col-span-1 lg:col-span-2 text-white">{{ orderProduct.product.shortDescription }}</p>
          <p class="mb-2 text-white" v-if="orderProduct.product.stockQuantity">{{ orderProduct.product.stockQuantity }}</p>
          <p class="mb-2 text-white" v-if="orderProduct.product.price">{{ orderProduct.product.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['order'],
  data() {
    return {
      accordeonExpanded: false
    }
  },
  methods: {
    toggleAccordeon() {
      this.accordeonExpanded = !this.accordeonExpanded;
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    }
  }
}
</script>
