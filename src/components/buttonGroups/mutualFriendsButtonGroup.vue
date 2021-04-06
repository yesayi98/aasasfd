<template>
  <div class="button-group">
    <button class="btn btn-success" @click.prevent="onAddfriend()">Add</button>
  </div>
</template>
<script>
  export default {
    name: 'mutual-friends-button-list',
    props: {
      user: {required: true}
    },
    methods: {
      onAddfriend: function () {
        // console.log(this.user)
        this.$store.dispatch('add', {friend_id: this.user.id});
      }
    }
  }
</script>
