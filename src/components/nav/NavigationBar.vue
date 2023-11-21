<template>
  <nav class="flex items-center justify-between p-4 bg-gray-800 text-white">
    <!-- Logo -->
    <div class="hidden md:flex items-center">
      <img src="@/assets/images/webshop-logo.gif" alt="Company Logo" class="w-8 h-8 mr-2">
      <span class="text-lg font-bold">A very real shop</span>
    </div>

    <div class="md:flex items-center space-x-4">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/shop" class="nav-item">Shop</router-link>
      <router-link to="/addproduct" class="nav-item" v-if="isAdmin">Add product</router-link>
    </div>

    <div class="md:flex items-center space-x-4">
      <button class="nav-item" v-if="isLoggedIn"><router-link to="/me">My account</router-link></button>
      <button class="nav-item" v-else><router-link to="/login">Log In</router-link></button>

      <div  ref="cartElement" v-if="!isAdmin && isLoggedIn">
        <button class="nav-item" @click="toggleCart">
          <img v-if="!cart.length"
              src="@/assets/images/cart_empty.jpg"
              alt="Cart Icon" class="w-8 h-8 mr-2"/>
          <img v-else
              src="@/assets/images/cart_filled.jpg"
              alt="Cart Icon" class="w-8 h-8 mr-2"/>
        </button>
        <div v-if="showCart && cart.length" class="absolute top-20 right-5 mt-2 bg-white text-black p-2 shadow">
          <cart-list></cart-list>
        </div>
    </div>
    </div>

  </nav>


</template>


<script>
import {mapGetters} from "vuex";
import cartList from "@/components/cart/CartList";

export default {
  components: {
    cartList
  },

  data() {
    return {
      showCart: false,
    }
  },
  methods: {
    toggleCart() {
      this.showCart = !this.showCart;
    },
    hideCart() {
      this.showCart = false;
    },
    handleClickOutside(event) {
      const cartElement = this.$refs.cartElement;
      if (cartElement && !cartElement.contains(event.target)) {
        this.hideCart();
      }
    },
  },
  computed: {
    ...mapGetters({
      isAdmin: "isAdmin",
      isLoggedIn: "isLoggedIn",
      cart: "cart"
    })
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  }
}
</script>
