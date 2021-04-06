<template>
  <div class="login">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <h1>{{ msg }}</h1>
          <form class="form-group" action="/logout" method="post" @submit.prevent="onSubmitHandler">
            <div class="message">
              <h2>Are you sure?</h2>
            </div>
            <button type="submit" name="button" class="btn btn-success mt-3">YES</button>
            <div class="float-right mt-4">
              <router-link class="btn btn-outline-success" to="/account">NO</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  data: function() {
    return {
      msg: 'Logout',
    }
  },
  mounted() {
    // this.$store.dispatch('login', this.login_data)
  },
  methods: {
    onSubmitHandler: function (event) {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
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
