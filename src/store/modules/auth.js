import axios from 'axios'
import router from 'vue-router';

export default {
  state: {
    errors: [],
  },
  getters: {
    error(state) {
      return state.error;
    }
  },
  mutations: {
    setErrors(state, data){
      state.errors = data;
    },

    pushError(state, error){
      state.errors.push(error);
    }
  },
  actions: {
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', data).then(res => {
          localStorage.setItem('token', res.data.access_token);
          this.dispatch('meAuth', res).then(() => {
            resolve(res)
          });
        })
      })
    },

    update(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/change', data).then(res => {
          // localStorage.setItem('token', res.data.access_token);
          this.dispatch('meAuth', res).then(() => {
            resolve(res)
          });
        })
      })
    },

    login(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login', data).then(res => {
          localStorage.setItem('token', res.data.access_token);
          this.dispatch('meAuth', res).then(() => {
            resolve(res)
          });
        }).catch(error => {
          context.commit('pushError', error.response.data.error)
        })
      })
    },

    logout(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/logout').then(res => {
          localStorage.setItem('token', '');
          localStorage.setItem('user', JSON.stringify({'loggedIn': false}));
          resolve();
        });
      })
    },

    meAuth(context, data){
      return new Promise((resolve, reject) => {
        axios.post('/auth/me').then(res => {
          res.data.loggedIn = true;
          context.commit('setLoggedInUser', res.data);
          resolve(res);
        }).catch(error => {
          if (error.response.statusText === 'Unauthorized'){
            this.dispatch('refresh').then(() => {
              reject(res);
            })
          }
        });
      })

    },

    refresh(context, data){
      return new Promise((resolve, reject) => {
        axios.post('/auth/refresh').then(res => {
          res.data.loggedIn = true;
          context.commit('setLoggedInUser', res.data);
          resolve(res);
        }).catch(error => {
          if (error.response.statusText === 'Unauthorized'){
            let user = {
              loggedIn: false
            }
            context.commit('setLoggedInUser', user);

            resolve(res);
          }
        });
      })

    }
  }
}
