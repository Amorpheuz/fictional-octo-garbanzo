<template>
  <header>
    <nav class="nav">
      <router-link
        title="Home"
        to="/"
      >
        <KonnectLogo />
      </router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KonnectLogo from './components/KonnectLogo.vue'

export default defineComponent({
  name: 'App',
  components: { KonnectLogo },
})
</script>

<style lang="scss" scoped>
.nav {
  background: linear-gradient(to bottom, #09224f, #073382);
  border-bottom: 1px solid #333;
  margin-bottom: 4rem;
  padding: 16px;

  a {
    color: blue;
    font-weight: 700;

    &.router-link-exact-active {
      color: green;
    }
  }
}
</style>

<style lang="scss">
// Unscoped styles for html and body
html {
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f8f8fa;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
}

a {
  color: #1567d9;
  text-decoration: none;
}

a:visited {
  color: #1567d9;
  text-decoration: none;
}
</style>
