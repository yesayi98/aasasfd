import axios from 'axios'
import router from 'vue-router';
import Vue from "vue";

export default {
  state: {
    publications: [],
  },
  getters: {
    publications(state){
      return state.publications;
    },
  },
  mutations: {
    setPublications(state, publications){
      state.publications = publications;
    },
    pushPublication(state, publication){
      state.notifications.push(publication);
    },
  },
  actions: {
    createPublication(context){
      return new Promise((resolve, reject) => {
        axios.get('/publications/create').then(res => {
          context.commit('setPublications', res.data)
          resolve(res.data);
        })
      })
    },
    uploadImage(context, file){
      let formData = new FormData();
      return new Promise((resolve, reject) => {
        const config = {
          headers: {
            'content-type': `application/x-www-form-urlencoded`,
            'accept': 'multipart/form-data'
          }
        }

        formData.append('media', file, file.name);

        axios({
          method: "POST",
          url: process.env.VUE_APP_IMAGE_UPLOAD_URL,
          data: formData,
          ...config
        }).then(response => {
          resolve(response.data[0])
        });
      });

    }
  }
}
