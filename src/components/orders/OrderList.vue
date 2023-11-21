<template>
  <section>
    <order-item
    v-for="order in orders"
    :key="order.id"
    :order="order"></order-item>
    <p v-if="!orders">No orders yet! Start shopping</p>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
import OrderItem from "@/components/orders/OrderItem";

export default {
  components: {OrderItem},
  computed: {
    ...mapGetters({
      orders: "orders"
    })
  },
  methods: {
    async getOrders() {
      await this.$store.dispatch('getOrders');
    }
  },
  async beforeMount() {
    await this.getOrders();
  }
}
</script>
