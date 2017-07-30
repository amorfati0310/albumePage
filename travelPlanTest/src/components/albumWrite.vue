<template>
  <div class="modal is-active" v-if="writeActive">
    <div class="modal-background"  @click="closeModal()"></div>
    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title">Give Me New Album Data :D</p>
        <button class="delete" @click="closeModal()"></button>
      </header>

      <section class="modal-card-body">
         <div class="album-photo-box" v-if="!newAlbumPhoto">
          <img src="http://bulma.io/images/placeholders/1280x960.png">
          <input type="file" class="input album-photo" @change="onFileChange">
        </div>
        <div class="prev-phto-box" v-else>
          <img :src="newAlbumPhoto" />
          <a class="button is-dark remove-prev" @click="removeImage">X</a>
        </div>
        <input type="text" class="input album-title" v-model="newAlbumTitle" placeholder="앨범타이틀 입력해주세요 :D">
      </section>
      <footer class="modal-card-foot">
        <a class="button is-success"@click="sendNewAlbumData()">Save</a>
        <a class="button" @click="closeModal()">Cancel</a>
      </footer>
    </div>
</div>
</template>
<script>
export default {
  name: "",
  props:["writeActive","lastNumber"],
  data: function data() {
    return {
      newAlbumTitle: '',
      newAlbumPhoto:''
    }
  },
  methods: {
    closeModal() {
      this.writeActive = false;
      this.$emit('closeModal')
    },
      sendNewAlbumData(){
        var value = this.newAlbumTitle && this.newAlbumTitle.trim()
        if(value){
        var newalbumdata = {}
        newalbumdata.userid = 1;
        newalbumdata.id = this.lastNumber+1;
        newalbumdata.title = this.newAlbumTitle;
        this.$http.post('/albums',newalbumdata)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        this.$emit('sendNewAlbumData',newalbumdata)
        this.closeModal();
        }
        else{
          alert('앨범 타이틀 내용을 입력해주세요 :D')
        }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      this.newAlbumPhoto = e.target.files[0];
      console.log(e.target.files[0]);
    },
    createImage(file) {
      var newAlbumPhoto = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.newAlbumPhoto = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage(e){
      this.newAlbumPhoto = '';
    }
  }
}
</script>
<style lang="sass">
.modal-card
  max-width: 80%

.modal-card-foot
  display: flex
  justify-content: center

.album-photo-box
  position: relative

.album-photo
  opacity: 0
  top: 0
  width: 100%
  height: 100%
  z-index: 1
  position: absolute

.prev-phto-box
  position: relative

.remove-prev
  position: absolute
  top: 0
  right: 0

</style>
