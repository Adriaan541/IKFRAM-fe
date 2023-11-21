<template>
  <navigation-bar></navigation-bar>
  <div class="flex justify-center mt-8">
  <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import NavigationBar from './components/nav/NavigationBar'

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>

<style>

</style>
