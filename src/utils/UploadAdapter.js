import Vue from 'vue'

export default class UploadAdapter {

  constructor( loader ) {
    // The file loader instance to use during the upload.
    this.loader = loader;
    this.url = process.env.API_URL + process.env.VUE_APP_IMAGE_UPLOAD_URL;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(file => {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        const config = {
          headers: {
            'content-type': `application/x-www-form-urlencoded`,
            'accept': 'multipart/form-data'
          }
        }

        formData.append('media', file, file.name);

        Vue.axios({
          method: "POST",
          url: this.url,
          data: formData,
          ...config
        }).then(response => {
          console.log(response.data); alert();
          resolve({"360": response.data.path})
        });
      })
    })
  }

  // Aborts the upload process.
  abort() {
    if ( this.xhr ) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();

    xhr.open( 'POST', this.url, true );
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
    xhr.setRequestHeader('Content-Type', `multipart/form-data`);

    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners( resolve, reject, file ) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${ file.name }.`;

    //
    // xhr.addEventListener( 'error', () => reject( genericErrorText ) );
    // xhr.addEventListener( 'abort', () => reject() );
    xhr.addEventListener( 'load', () => {
      const response = xhr.response;

      if ( !response || response.error ) {
        return reject( response && response.error ? response.error.message : genericErrorText );
      }

      resolve( {
        default: response.url
      } );
    } );

    if ( xhr.upload ) {
      xhr.upload.addEventListener( 'progress', evt => {
        if ( evt.lengthComputable ) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      } );
    }
  }

  // Prepares the data and sends the request.
  _sendRequest( file ) {
    // Prepare the form data.
    const data = new FormData();

    data.append( 'media', file );

    // Send the request.
    this.xhr.send( data );
  }
}
