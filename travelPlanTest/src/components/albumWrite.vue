<template>
  <div class="modal is-active" v-if="writeActive">
    <div class="modal-background"  @click="closeModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Give Me New Album Data :D</p>
        <button class="delete" @click="closeModal()"></button>
      </header>
      <section class="modal-card-body">
        <img src="http://bulma.io/images/placeholders/1280x960.png">
        <input type="text" class="input album-title" v-model="newAlbumTitle" placeholder="앨범타이틀 입력해주세요 :D">
      </section>
      <footer class="modal-card-foot">
        <a class="button is-success"@click="sendNewAlbumData()">Save</a>
        <a class="button" @click="closeModal(

          )">Cancel</a>
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
      newAlbumTitle: ''
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
          alert('아무 내용 없는 데요 :D')
        }
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
</style>
