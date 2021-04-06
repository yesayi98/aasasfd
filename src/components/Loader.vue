<template>
  <div class="loader">
    <div>
      <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
      <b-spinner variant="success" type="grow" label="Spinning" style="animation-delay: 0.1s;"></b-spinner>
      <b-spinner variant="success" type="grow" label="Spinning" style="animation-delay: 0.2s;"></b-spinner>
      <b-spinner variant="success" type="grow" label="Spinning" style="animation-delay: 0.3s;"></b-spinner>
      <b-spinner variant="success" type="grow" label="Spinning" style="animation-delay: 0.4s;"></b-spinner>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'loader',
  }

</script>

<style scoped>
  .loader{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    min-height: 500px;
  }
</style>
