<template>
  <div class="post-form">
    <div class="post-form-container">
      <form action="" @submit.prevent="submitHandler">
        <editor @content="setContent"></editor>
        <button type="submit" class="btn btn-success w-100 radius-top-none">publish</button>
      </form>
    </div>
  </div>
</template>
<script>
  import Editor from "./Editor"
  export default {
    components: {Editor},
    name: 'PostForm',
    data: function(){
      return {
        formData: {

        },
      }
    },
    methods: {
      submitHandler: function (event) {
        let data = '';

        console.log(this.formData)
      },
      setContent: function (data) {
        console.log(data)
      }

    }
  }
</script>
