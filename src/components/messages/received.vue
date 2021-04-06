<template>
  <div class="message message-received">
    <div class="alert alert-info border float-left" data-tooltip="tooltip-right" v-tooltip='message.created_at'>
      {{ message.text }}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'received',
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
