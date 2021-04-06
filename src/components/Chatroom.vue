<template>
  <div class="chatroom">
    <b-card>
      <div class="card-header d-flex">
        <div class="w-100">
          <h4 class="card-text">Chatroom</h4>
        </div>
        <div v-if="friend">
          <b-btn-close @click.prevent="closeChatroom"/>
        </div>
      </div>
        <div v-if="friend" class="border-top">
          <p class="p-3 m-0">chat opened with: <br> {{ friend.name }} {{ friend.lastname }} ({{friend.email}})</p>
          <form class="form-group chat" @submit.prevent="onMessageSend">
            <!--        <messages-box></messages-box>-->
            <div class="border-top">
              <div class="message-container" ref="messageContainer">
                <div v-for='message in messages' :key="message.id">
                  <received :message="message" v-if="friend.id == message.sender"></received>
                  <sent :message="message" v-if="friend.id == message.getter"></sent>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex">
                <b-form-textarea class="form-control" v-model="message" name="message" placeholder="type something..."></b-form-textarea>
                <button type="submit" class="btn btn-info h-100"><b-icon icon="cursor"></b-icon></button>
              </div>
            </div>
          </form>
        </div>
    </b-card>
  </div>
</template>
<script>
  import received from "./messages/received";
  import sent from "./messages/sent";

  export default {
    name: 'chatroom',
    components: {
      received, sent
    },
    computed: {
      friend(){
        return this.$store.getters.chatUser;
      },
      channel(){
        return this.$store.getters.channel;
      },
      messages(){
        return this.$store.getters.messages;
      },
      currentUser(){
        return this.$store.getters.auth;
      },
    },

    watch: {
      messages(){
        this.$nextTick(() => {
          let messageContainer = this.$refs.messageContainer;
          messageContainer.scrollTo(0, messageContainer.scrollHeight);
        })
      }
    },

    data() {
      return {
        message: '',
      }
    },

    methods: {
      onMessageSend() {
        let data = {};
        data.text = this.message;
        data.getter = this.friend.id;
        data.setter = this.currentUser.id;

        this.message = '';
        this.$store.dispatch('sendMessage', data).then(() => {
          let messageContainer = this.$refs.messageContainer;
          messageContainer.scrollTop = messageContainer.scrollHeight;
        });
      },

      closeChatroom() {
        this.$store.dispatch('removeChatroom');
      }
    },
    // created: function () {
    //
    // },
    //
    // destroyed() {
    //   this.channel.leave('user-channel.' + this.friend.id);
    // }
  }
</script>
<style scoped>
  .message-container {
    position: relative;
    width: 100%;
    height: 230px;
    display: inline-block;
    margin-top: 1rem;
    overflow: auto;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
