import axios from 'axios'
import router from 'vue-router';

export default {
  state: {
    friends: [],
    mutual: [],
    chatuser: null,
    channel: {},
    pusher: {},
  },
  getters: {
    myFriends(state){
      return state.friends;
    },
    users(state){
      return state.mutual;
    },
    chatUser(state){
      return state.chatuser;
    },
    channel(state){
      return state.channel;
    },
    pusher(state){
      return state.pusher;
    }
  },
  mutations: {
    setCurrentUserFriends(state, users){
      console.log(users);
      state.friends = users;
    },
    setMutualFriends(state, users){
      state.mutual = users;
    },
    setChatUser(state, user){
      console.log(user)
      state.chatuser = user;
    },
    setChannel(state, channel){
      state.channel = channel;
    },

    setPusher(state, pusher) {
      state.pusher = pusher;
    }
  },
  actions: {
    add(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/friends/add', data).then(res => {
          this.dispatch('my');
          this.dispatch('all');
          resolve(res);
        })
      })
    },

    delete(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/friends/delete', data).then(res => {
            resolve(res);
          context.dispatch('my');
          context.dispatch('all');
        })
      })
    },

    search(context, data) {
      return new Promise((resolve, reject) => {
        axios.get('/auth/friends/search/'+ data).then(res => {
            resolve(res);
        })
      })
    },

    all(context) {
      return new Promise((resolve, reject) => {
        axios.get('/friends/all').then(res => {
          context.commit('setMutualFriends', res.data.data);
          resolve(res);
        });
      })
    },

    my(context){
      return new Promise((resolve, reject) => {
        axios.get('/friends/my').then(res => {
          context.commit('setCurrentUserFriends', res.data.data);
          resolve(res);
        });
      })
    },



  }
}
