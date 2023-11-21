<template>
  <section>
    <div class="text-center p-10">
      <h1 class="font-bold text-4xl mb-4">Hi {{myUserProfile.firstName}}!</h1>
      <h1 class="text-3xl">What do you want to do today</h1>
      <h2 class="text-2xl text-red-400" v-if="error !== ''">An error occured: {{error}}</h2>
    </div>
    <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      <button type="button" @click="toggleInfo"
              class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
        Show my info
      </button>
      <button type="button" @click="toggleOrders" v-if="isAdmin"
              class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
        Show all orders
      </button>
      <button type="button" @click="toggleOrders" v-else
              class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
        Show my orders
      </button>

      <button type="button" @click="logOut"
              class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
        Log out
      </button>
      <button type="button" @click="deleteAccountClicked"
              class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        Delete account
      </button>
    </div>

    <div v-if="warning === 'deleteAccountWarning'" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg max-w-md">
        <h2 class="text-xl font-bold mb-4">Are you sure you want to delete your account?</h2>
        <p>(This cannot be reversed)</p>
        <div class="flex justify-end">
          <button @click="deleteAccountConfirmed" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2" id="confirmButton">Yes</button>
          <button @click="deleteAccountCanceled" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" id="cancelButton">No</button>
        </div>
      </div>
    </div>

    <div v-if="openedTab !== ''" class="text-center">
      <div v-if="openedTab === 'info'">
        <h1>Naam: {{myUserProfile.firstName}} {{myUserProfile.preposition}} {{myUserProfile.lastName}}</h1>
        <h2>Lid sinds: {{formatDate(myUserProfile.createDate)}}</h2>
        <h2>Email: {{myUserProfile.email}}</h2>
      </div>
      <div v-if="openedTab === 'orders'">
        <order-list></order-list>
      </div>
    </div>

  </section>
</template>

<script>
import {mapGetters} from "vuex";
import OrderList from "@/components/orders/OrderList";

export default {
  components: {
    OrderList
  },

  data() {
    return {
      openedTab: '',
      error: '',
      warning: null
    };
  },
  computed: {
    ...mapGetters({
      myUserProfile: 'myUserProfile',
      isAdmin: "isAdmin"
    })
  },
  methods: {
    async getAccount() {
      try {
        await this.$store.dispatch('getUser');
      } catch (error) {
        this.error = error;
        this.$router.push('/home');
      }
    },
    logOut() {
      this.$store.dispatch('logOut');
      this.$router.push('/home')
    },
    deleteAccountClicked() {
      this.warning = 'deleteAccountWarning'
    },
    deleteAccountCanceled() {
      this.warning = ''
    },
    async deleteAccountConfirmed() {
      try {
        await this.$store.dispatch('deleteAccount');
        this.$router.push('/home');
      } catch (error) {
        this.error = error;
      }

    },
    toggleOrders() {
      switch (this.openedTab) {
        case '':
          this.openedTab = 'orders';
          break;
        case 'info':
          this.openedTab = 'orders';
          break;

        case 'orders':
          this.openedTab = '';
          break;
      }
    },
    toggleInfo() {
      switch (this.openedTab) {
        case '':
          this.openedTab = 'info';
          break;
        case 'orders':
          this.openedTab = 'info';
          break;
        case 'info':
          this.openedTab = '';
          break;
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  async beforeMount() {
    await this.getAccount();
  }
}
</script>
