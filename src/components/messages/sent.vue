<template>
  <div class="message message-sent">
    <div class="alert alert-light border float-right" data-tooltip="tooltip-left" v-tooltip='message.created_at'>
      {{ message.text }}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sent',
    props: {
      message: {required: true}
    },
  }
</script>
<style scoped>
  .message {
    width: 100%;
    display: inline-block;
  }
</style>
