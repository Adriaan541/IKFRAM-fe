<template>
  <section>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="@/assets/images/webshop-logo.gif" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your
          account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required v-model="enteredEmail"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="mt-2">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 right-0 flex items-center px-2">
                <input class="hidden js-password-toggle" id="toggle" type="checkbox"/>
                <label @click="toggleShowPassword"
                       class="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                       @blur="validatePassword" for="toggle">{{ showPassword ? 'show' : 'hide' }}</label>
              </div>
              <input v-model="enteredPassword"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     id="password" :type="showPassword ? 'password' : 'text'" autocomplete="off"
              />
            </div>
          </div>

          <div v-if="error !== null" class="mt-2 text-red-400">
            <p>An error occured: {{ error }}</p>
          </div>

          <div>
            <button type="submit" v-if="!isLoading"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign in
            </button>
            <button
                type="button"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                v-else disabled>
              Loading...
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Don't have an account?
          <a href="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</a>
        </p>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  data() {
    return {
      enteredEmail: '',
      enteredPassword: '',
      showPassword: true,
      isLoading: false,
      error: null
    };
  },
  components: {},
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async submitForm() {
      this.error = null;
      this.isLoading = true;
      try {
        await this.$store.dispatch('login', {
          email: this.enteredEmail,
          password: this.enteredPassword,
        })
        this.$router.push('/home');
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    }
  },
}
</script>
