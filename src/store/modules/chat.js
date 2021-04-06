import axios from 'axios'
import router from 'vue-router';

export default {
  state: {
    messages: [],
    getter: 0,
    setter: 0,
  },
  getters: {
    messages(state){
      return state.messages;
    },

    getter(state){
      return state.getter
    },

    sender(state){
      return state.sender
    },
  },

  mutations: {
    pushMessage(state, message) {
        state.messages.push(message);
    },

    setMessages(state, messages) {
      state.messages = messages.data.reverse();
      // state.loadMoreLink = data.hajordej
    },

    removeChatroom(state) {
      state.messages = [];
      state.sender = 0
      state.getter = 0
      console.log(state)
    },

    setGetter(state, getter){
      state.getter = getter
    },

    setSender(state, sender){
      state.sender = sender
    },
  },
  actions: {
    getChatMessages(context, friend){
      return new Promise((resolve, reject) => {
        axios.get('/friends/messages/'+friend.id).then(res => {
          context.commit('setMessages', res.data);
          resolve(res);
        });
      })
    },

    sendMessage(context, data){
      return new Promise((resolve, reject) => {
        axios.post('/friends/message', data).then(res => {
          context.dispatch('pushChatMessage', res.data);
          console.log(res)
          resolve(res);
        });
      })
    },

    pushChatMessage(context, data){
      return new Promise((resolve, reject) => {
        context.commit('pushMessage', data);
        resolve(data);
      })
    },

    setChatRoom(context, user) {
      // let currentChatUser = context.getters.chatUser;
      let authUser = context.getters.auth;
      // if (currentChatUser != null && currentChatUser){
      //   pusher.unsubscribe("user-channel." + user.id);
      // }

      context.commit('setChatUser', user);
      context.dispatch('getChatMessages', user);

      // context.getters.channel.listen('user-channel.' + user.id);
      let pusher = context.getters.pusher;
      let channel = pusher.subscribe("chat-event." + user.id);
      channel.bind('chat-event-notification.' + authUser.id, function(data) {
        context.dispatch('pushChatMessage', data.message);
      })
    },

    removeChatroom(context){
      // context.commit('removeChatroom');
      context.commit('setChatUser', null);
    }
  }
}
