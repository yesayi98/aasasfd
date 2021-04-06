<template>
  <div class="account">
    <account-nav-bar></account-nav-bar>
    <div class="container-fluid">
      <div v-if="loader">
        <loader />
      </div>
      <div class="row my-5" v-else>
        <div class="col-md-3 col-12">
            <b-card
              :title = 'msg'
              img-top
              tag="article"
              class="mb-2 w-100">
                <div class="row mb-3">
                  <div class="col-4 d-flex align-items-center justify-content-center">
                    <b-avatar :src="user.avatar?user.avatar.path:null" :text="user.firstLetter" size="6rem"></b-avatar>
                  </div>
                  <div class="col-7">
                    <b-card-text>
                      {{ user.name }} {{ user.lastname }}
                    </b-card-text>
                    <b-card-text>
                      {{ user.summary }}
                    </b-card-text>
                  </div>
                </div>
              <router-link to="logout" class="btn btn-success">Logout</router-link>
              <router-link to="update" class="btn btn-success">Change Profile</router-link>
            </b-card>
          <friend-list v-if="friends.data" :friends="friends" list-name="Friends" button-list="my-friends-button-group"></friend-list>
        </div>
        <div class="col-md-6">
          <b-card>
            <post-form></post-form>
          </b-card>
        </div>
        <div class="col-md-3 col-6">
            <friend-list v-if="mutual.data" :friends="mutual" :list-name="'Mutual friends'" button-list="mutual-friends-button-group"></friend-list>
        </div>
        <div class="col-md-3 col-6">
        </div>
      </div>
    </div>
    <div class="chatroom-container">
      <chatroom></chatroom>
    </div>
  </div>
</template>
<script>
import FriendList from "./FriendList"
import accountNavBar from "./NavBar"
import Chatroom from "./Chatroom"
import PostForm from "./PostForm"

export default {
  components: {FriendList, Chatroom, accountNavBar, PostForm},
  name: 'Account',
  data: function() {
    return {
      msg: 'Account',
      user: {},
      loader: true,
    }
  },
  mounted() {
    this.$store.dispatch('meAuth').then(() => {
      this.loader = false;
      this.user = this.$store.getters.auth;
      this.user.firstLetter = this.user.name.substring(0, 1);
    })
    this.$store.dispatch('all');
    this.$store.dispatch('my').then(() => {
      this.$store.dispatch('addNotificationsWebsocket', this.$store.getters.pusher);
    });
  },

  computed: {
    mutual() {
      return this.$store.getters.users;
    },
    friends() {
      return this.$store.getters.myFriends
    }
  }
}
</script>

<style scoped>
  .chatroom-container{
    position: fixed;
    bottom: 0;
    right: 150px;
    width: 375px;
  }
</style>
