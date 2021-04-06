<template>
  <div class="register">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <h1>{{ msg }}</h1>
          <form class="form-group" action="/register" method="post" @submit.prevent="onSubmitHandler">
            <input type="text" class="form-control mt-3" name="name" v-model="register_data.name" placeholder="name">
            <input type="text" class="form-control mt-3" name="lastname" v-model="register_data.lastname" placeholder="lastname">
            <input type="email" class="form-control mt-3" name="email" v-model="register_data.email" placeholder="email">
            <input type="password"  class="form-control mt-3" name="password" v-model="register_data.password" placeholder="password">
            <input type="password"  class="form-control mt-3" name="password_confirmation" v-model="register_data.password_confirmation" placeholder="password confirmation">
            <button type="submit" name="button" class="btn btn-success mt-3">Register</button>
            <div class="float-right mt-4">
              <router-link to="/login">have account?</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: function() {
    return {
      msg: 'Register',
      register_data: {}
    }
  },
  methods: {
    onSubmitHandler () {
      this.$store.dispatch('register', this.register_data).then(() => {
        this.$router.push('/account')
      })
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
