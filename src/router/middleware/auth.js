let auth = {
  next: {},
  store: {},
  from: {},
  to: {},

  init: function (context) {
    let me = this;

    me.mutateContext(context);
    me.updateStore();
    let loggedIn = me.checkLoggedInUser();
    if (!loggedIn) {
      if (me.to.name === 'Login' || me.to.name === 'Register') {
        return me.next();
      }
      return me.next({
         name: 'Login'
      })
    }

    if (me.to.name === 'Login' || me.to.name === 'Register') {
      return me.next({
         name: 'Account'
      })
    }
    return me.next();
  },

  mutateContext: function (context) {
      let me = this;

      me.store = context.store;
      me.next = context.next;
      me.from = context.from;
      me.to = context.to;
  },

  updateStore: function () {
    let me = this;
    me.store.commit('setLoggedInUser', JSON.parse(localStorage.getItem('user')));
  },

  checkLoggedInUser: function () {
    let me = this;

    return me.store.getters.auth.loggedIn?true:false;
  }
};

export default function auth (context){
  auth.init(context);
}
