<template>
  <div class="login">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <h1>{{ msg }}</h1>
          <form class="form-group" action="/login" method="post" @submit.prevent="onSubmitHandler">
            <div class="alert alert-error" v-if="errors">{{ errors.join(' ') }}</div>
            <input type="text" class="form-control mt-3" name="email" v-model="login_data.email" placeholder="email">
            <input type="password"  class="form-control mt-3" name="password" v-model="login_data.password" placeholder="password">
            <button type="submit" name="button" class="btn btn-success mt-3">Login</button>
            <div class="float-right mt-4">
              <router-link to="/register">have account?</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    return {
      msg: 'Login',
      login_data: {}
    }
  },
  mounted() {
    // this.$store.dispatch('login', this.login_data)
  },
  computed: {
    errors(){
      return this.$store.getters.errors;
    },
  },
  methods: {
    onSubmitHandler: function (event) {
      this.$store.dispatch('login', this.login_data).then(() => {
        this.$router.push('/account')
      })

    },
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
