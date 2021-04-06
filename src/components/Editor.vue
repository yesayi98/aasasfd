<template>
    <div class="editor">
      <ckeditor
        :editor="editor"
        v-model="editorContent"
        :config="editorConfig"

      />
    </div>
</template>

<script>
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import UploadAdapter from '../utils/UploadAdapter'
  export default {
      name: "Editor",
      data() {
        return {
          editor: ClassicEditor,
          formData: {
            context: '',
            files: []
          },
          editorContent: '',
          editorConfig: {
            extraPlugins: [this.uploader],
            height: 150
            // The configuration of the editor.
          }
        }

      },
    watch: {
      editorContent(data){
        this.formData.context = data;
        this.$emit('content', this.formData)
       }
    },

    methods: {
      uploader: async function (editor) {
        editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
          return new UploadAdapter( loader );
        };
      },
      publish: function () {
        this.$store.dispatch('createPublication', this.editorContent);
      }
    },

    components: {
      ckeditor: CKEditor.component
    }
  }
</script>

<style scoped>

</style>
