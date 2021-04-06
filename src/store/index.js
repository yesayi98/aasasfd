import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import authModule from './modules/auth'
import friendsModule from './modules/friends'
import chatModule from './modules/chat'
import notificationsModule from './modules/notifications'
import publicationsModule from './modules/publications'

Vue.use(Vuex)
const vuex = new Vuex.Store({
    state: {
        user: {
            name: '',
            lastname: '',
            email: '',
            loggedIn: false,
        },
        notificationChannel: {},
    },
    getters: {
        auth(state) {
          if (state.user) {
            return state.user
          }
          else {
            return {'loggedIn': false}
          }
        }
    },
    mutations: {
      setLoggedInUser(state, user) {
        // set user to state
        state.user = user;
        // update login status
        localStorage.setItem('user', JSON.stringify(state.user));
      },

      setNotificationChannel(state, channel){
        state.notificationChannel = channel;
      }
    },
    modules: {
      auth: authModule,
      friends: friendsModule,
      chat: chatModule,
      notifications: notificationsModule,
      publications: publicationsModule,
    },
    actions: {
      addNotificationsWebsocket(context, pusher){
        let authUser = context.getters.auth;

        let notifications = pusher.subscribe('notification-event.' + authUser.id);
        notifications.bind('notification-event', function(data) {
          console.log(data.notification)
          context.dispatch('pushAccountNotification', data.notification);
        })
      }
    }
})

export default vuex;
