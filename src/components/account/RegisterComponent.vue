<template>
  <section>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="@/assets/images/webshop-logo.gif" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register for an
          account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="submitForm">

          <div>
            <!--            <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">First name:</label>-->
            <div class="mt-2">
              <input type="text" name="firstName" autocomplete="firstName" v-model.trim="enteredFirstName" required
                     placeholder="First name..." @blur="validateFirstName"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <p class="text-red-400" v-if="formIsValid.firstNameValid === 'short'">Please enter first name*</p>
              <p class="text-red-400" v-if="formIsValid.firstNameValid === 'long'">First name cannot be over 64
                characters*</p>
            </div>
          </div>

          <div>
            <div class="mt-2">
              <input type="text" name="preposition" autocomplete="preposition" v-model.trim="enteredPreposition"
                     placeholder="Preposition..."
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div>
            <div class="mt-2">
              <input type="text" name="lastName" autocomplete="lastName" v-model.trim="enteredLastName" required
                     placeholder="Last name..." @blur="validateLastName"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <p class="text-red-400" v-if="formIsValid.lastNameValid === 'short'">Please enter last name*</p>
              <p class="text-red-400" v-if="formIsValid.lastNameValid === 'long'">Last name cannot be over 64
                characters*</p>
            </div>
          </div>

          <div>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" v-model.trim="enteredEmail" required
                     placeholder="Email..." @blur="validateEmail"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <p class="text-red-400" v-if="formIsValid.emailValid === false">Please enter a valid email address*</p>
            </div>
          </div>
          <div>

            <div class="mt-2">
              <div class="relative w-full">
                <div class="absolute inset-y-0 right-0 flex items-center px-2">
                  <input class="hidden js-password-toggle" id="toggle" type="checkbox"/>
                  <label @click="toggleShowPassword"
                         class="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                         for="toggle">{{ showPassword ? 'show' : 'hide' }}</label>
                </div>
                <input placeholder="Password..." v-model.trim="enteredPassword" @blur="validatePassword"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       :type="showPassword ? 'password' : 'text'" autocomplete="off"/>
              </div>
              <p class="text-red-400" v-if="formIsValid.passwordValid === 'short'">Password must be at least 8
                characters*</p>
              <p class="text-red-400" v-if="formIsValid.passwordValid === 'long'">Password cannot be over 64
                characters*</p>
            </div>
          </div>

          <div class="mt-2">

            <input id="repeatPassword" name="repeatPassword" type="password" v-model.trim="enteredRepeatPassword"
                   required
                   placeholder="Repeat password..." @blur="validateRepeatPassword"
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <p class="text-red-400" v-if="formIsValid.repeatPasswordValid === false">Passwords do not match*</p>
          </div>

          <div v-if="error !== null" class="mt-2 text-red-400">
            <p>An error occured: {{ error }}</p>
          </div>


          <div>
            <button type="submit" v-if="!isLoading"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Register
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
          Already got an account?
          <a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</a>
        </p>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  data() {
    return {
      enteredFirstName: '',
      enteredPreposition: '',
      enteredLastName: '',
      enteredEmail: '',
      enteredPassword: '',
      enteredRepeatPassword: '',
      showPassword: true,
      isLoading: false,
      error: null,
      formIsValid: {
        firstNameValid: null,
        lastNameValid: null,
        emailValid: null,
        passwordValid: null,
        repeatPasswordValid: null
      },
    }
  },
  computed: {
    formIsValidCheck() {
      return this.formIsValid.firstNameValid && this.formIsValid.lastNameValid && this.formIsValid.emailValid && this.formIsValid.passwordValid && this.formIsValid.repeatPasswordValid;
    }
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    validateFirstName() {
      if (this.enteredFirstName.length < 2) {
        this.formIsValid.firstNameValid = 'short';
      } else if (this.enteredFirstName.length > 64) {
        this.formIsValid.firstNameValid = 'long';
      } else {
        this.formIsValid.firstNameValid = true;
      }
    },
    validateLastName() {
      if (this.enteredLastName.length < 2) {
        this.formIsValid.lastNameValid = 'short';
      } else if (this.enteredLastName.length > 64) {
        this.formIsValid.lastNameValid = 'long';
      } else {
        this.formIsValid.lastNameValid = true;
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.formIsValid.emailValid = emailRegex.test(this.enteredEmail);
    },
    validatePassword() {
      if (this.enteredPassword.length < 8) {
        this.formIsValid.passwordValid = 'short';
      } else if (this.enteredPassword.length > 64) {
        this.formIsValid.passwordValid = 'long';
      } else {
        this.formIsValid.passwordValid = true;
      }
    },
    validateRepeatPassword() {
      this.formIsValid.repeatPasswordValid = this.enteredRepeatPassword === this.enteredPassword;
    },
    async submitForm() {
      this.error = null;
      this.validateRepeatPassword();

      if (!this.formIsValidCheck) {
        return;
      }
      this.isLoading = true;

      try {
        await this.$store.dispatch('register', {
          email: this.enteredEmail,
          password: this.enteredPassword,
          firstName: this.enteredFirstName,
          preposition: this.enteredPreposition,
          lastName: this.enteredLastName
        });

        this.$router.push('/login');
      } catch (error) {
        this.error = error.message;
      }

      this.isLoading = false;
    }
  }
}
</script>
