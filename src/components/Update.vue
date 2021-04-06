<template>
  <div class="update">
    <account-nav-bar></account-nav-bar>
    <div class="container">
      <div v-if="loader">
        <loader />
      </div>
      <div class="row justify-content-center" v-else>
        <div class="col-6 my-5">
            <b-card
              :title = 'msg'
              img-top
              tag="article"
              class="mb-2 w-100"
            >
            <div class="row mb-3">
              <div class="col-4 d-flex mt-3 justify-content-center">
                <b-avatar button
                          :text="user.firstLetter"
                          :src="avatarSrc"
                          size="6rem"
                          @click="browsFile">

                </b-avatar>
              </div>
              <div class="col-7">
                <form class="form-group" method="post" @submit.prevent="onSubmitHandler">
                  <div class="hidden-file">
                    <input type="file" ref="avatar" accept="image/x-png,image/gif,image/jpeg" @change="onFileInputChange">
                  </div>
                  <input type="hidden" name="avatar" ref="avatarID">
                  <div class="d-flex">
                    <input type="text" class="form-control mt-3 mr-3" name="name" v-model="userData.name" placeholder="name">
                    <input type="text" class="form-control mt-3" name="lastname" v-model="userData.lastname" placeholder="lastname">
                  </div>
                  <input type="email" class="form-control mt-3" name="email" v-model="userData.email" placeholder="email">
                  <textarea type="text" class="form-control mt-3" name="summary" rows="5" v-model="userData.summary" placeholder="Type about yourself"></textarea>
                  <input type="password"  class="form-control mt-3" name="password" v-model="userData.password" placeholder="password">
                  <input type="password"  class="form-control mt-3" name="password_confirmation" v-model="userData.password_confirmation" placeholder="password confirmation">
                  <button type="submit" name="button" class="btn btn-success mt-3">Save</button>
                  <router-link to="account" class="btn btn-outline-success mt-3">Cancel</router-link>
                </form>
              </div>
            </div>

            </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FriendList from "./FriendList";
import Chatroom from "./Chatroom";
import accountNavBar from "./NavBar";

export default {
  name: 'Update',
  components: {FriendList, Chatroom, accountNavBar},
  mounted() {
    this.user = this.$store.getters.auth;
    this.user.firstLetter = this.user.name.substring(0, 1);
    if(this.user.avatar){
      this.avatarSrc = this.user.avatar.src
    }
    this.userData = {};
    this.userData.name = this.user.name;
    this.userData.lastname = this.user.lastname;
    this.userData.email = this.user.email;
    this.userData.summary = this.user.summary;
    this.userData.avatar = null;
    this.loader = false;
  },
  data: function() {
    return {
      msg: 'Update',
      user: {},
      userData: {},
      loader: true,
      avatarSrc: ''
    }
  },
  methods: {
    onSubmitHandler() {
      this.$store.dispatch('update', this.userData).then(() => {
        this.$router.push('/account')
      })
    },

    browsFile() {
      const avatar = this.$refs.avatar;
      avatar.click()
    },
    onFileInputChange() {
      const avatar = this.$refs.avatar;
      let file = avatar.files[0];
      let reader = new FileReader();

      reader.onload = (e) => {
        this.avatarSrc = e.target.result
      }
      this.$store.dispatch('uploadImage', file).then((image) => {
        this.userData.avatar = image.id;
      })

      reader.readAsDataURL(file)
    }
  }
}
</script>
<style scoped>
  .hidden-file{
    width: 0px;
    height: 0px;
    overflow: hidden;
  }
</style>
