<template>
  <div class="account-nav-bar">
    <b-navbar type="dark" variant="success">
      <div class="container-fluid">
        <div class="w-100">
          <ul class="navbar-nav">
            <li class="nav-item">
            <span class="nav-link">
              {{ date | date('datetime') }}
            </span>
            </li>
            <li class="nav-item ml-auto">
              <a class="nav-link notification-container-opener" @click.prevent="openNotificationContainer"><font-awesome icon="bell" /><span class="count" v-if="count">{{ count }}</span></a>
              <div class="notification-container" v-show="showDropdown">
                <b-list-group>
                  <b-list-group-item v-for="notification of notifications" :key="notification.id" :variant="(notification.seen === 1)?`dark`:`light`">
                    <div class="notification">
                      <a href="#" @click.prevent="notificationClickHandler(notification)" class="nav-link text-dark d-flex align-items-center">
                        <div class="ml-2">
                          <b-avatar :src="notification.sender.avatar?notification.sender.avatar.path:null" :text="!notification.sender.name?notification.sender.name.substring(0, 1):null" size="3rem"></b-avatar>
                        </div>
                        <div class="mx-3">
                          {{ notification.description + ' from '}} <strong>{{ notification.sender.name }}</strong>
                        </div>
                      </a>
                    </div>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </b-navbar>

  </div>
</template>
<script>
  export default {
    computed: {
      count(){
        return this.$store.getters.notificationCount;
      }
    },
    data() {
      return {
        date: new Date(),
        interval: null,
        notifications: [],
        showDropdown: false,
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        this.date = new Date();
      }, 1000);
      this.getNotifications();
    },

    methods: {
      getNotifications(){
        this.$store.dispatch('getNotifications').then(notifications => {
          this.notifications = notifications
          console.log(notifications)
        });
      },
      openNotificationContainer(){
        this.showDropdown = !this.showDropdown;
      },
      notificationClickHandler(notification){
        if(notification.type === 'message'){
          this.$store.dispatch('setChatRoom', notification.sender).then(() => {
            this.$store.dispatch('updateNotification', notification);
          });
        }else{
          this.$store.dispatch('updateNotification', notification);
        }
      }

    },

    destroyed() {
      clearInterval(this.interval);
    }
  }
</script>
<style scoped>
   .notification-container-opener{
     position: relative;
   }
   .notification-container{
     position: absolute;
     z-index: 2;
     right: 10px;
   }
   .notification-container-opener .count{
     position: absolute;
     top: 5px;
     right: -5px;
     background: #bd2130;
     color: #ffffff;
     width: 20px;
     height: 20px;
     border-radius: 10px;
     text-align: center;
     line-height: 18px;
   }
</style>
