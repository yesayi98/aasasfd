<template>
  <div class="button-group">
    <div class="button-group">
      <button class="btn btn-danger" @click.prevent="onDeletefriend()">Delete</button>
      <button class="btn btn-info" @click.prevent="openChatWithThisUser()">Chat</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      user: {required: true}
    },
    name: 'my-friends-button-group',
    methods: {
      onDeletefriend(){
        this.$store.dispatch('delete', {friend_id: this.user.id});
      },
      openChatWithThisUser(){
        this.$store.dispatch('setChatRoom', this.user);
      }
    }
  }
</script>
