<template>
  <div class="hello">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6 mt-5">
          <h1>{{ msg }}</h1>
          <div v-if="user.loggedIn" class="d-flex w-100 justify-content-around">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
          </div>
          <div v-else="user.loggedIn" class="d-flex w-100 justify-content-around">
            <router-link to="/account">Account</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted() {
    this.user = this.$store.getters.auth;
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
