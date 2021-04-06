import axios from 'axios'
import router from 'vue-router';

export default {
  state: {
    notifications: [],
  },
  getters: {
    notifications(state){
      return state.notifications;
    },
    notificationCount(state){
      let unseen = state.notifications.filter((notification) => {
        if(notification.seen === 0)
        return notification
      })

      return unseen.length;
    },
  },
  mutations: {
    setNotifications(state, notifications){
      state.notifications = notifications;
    },
    pushNotification(state, notification){
      state.notifications.unshift(notification);
    },
    updateNotification(state, notification){
      let key = state.notifications.map((not, index) => {
        if (not.id === notification.id){
          return index;
        }
      })[0];
      state.notifications[key] = notification;
    }
  },
  actions: {
    setAccountNotifications(context, notifications){
      return new Promise((resolve, reject) => {
          context.commit('setNotifications', notifications);
          resolve(notifications);
      })
    },
    pushAccountNotification(context, notification){
      return new Promise((resolve, reject) => {
          context.commit('pushNotification', notification);
          resolve(notification);
      })
    },
    getNotifications(context){
      return new Promise((resolve, reject) => {
        axios.get('/notifications').then(res => {
          context.commit('setNotifications', res.data)
          resolve(res.data);
        })
      })
    },
    updateNotification(context, notification){

      notification.seen = 1;

      return new Promise((resolve, reject) => {
        axios.post('/notification/update', notification).then(res => {
          context.commit('updateNotification', res.data)
          resolve(res.data);
        }).catch(e => {

        })
      })
    }
  }
}
