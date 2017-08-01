<template>
<div class="modal is-active" v-if="writeActive">
    <div class="modal-background" @click="closeModal()"></div>
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
            <a class="button is-success" @click="sendNewAlbumData()">Save</a>
            <a class="button" @click="closeModal()">Cancel</a>
        </footer>
    </div>
</div>
</template>
<script>
export default {
    name: "",
    props: ["writeActive", "lastNumber"],
    data: function data() {
        return {
            newAlbumTitle: '',
            newAlbumPhoto: ''
        }
    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        sendNewAlbumData() {
             var _this = this;
            var value = this.newAlbumTitle && this.newAlbumTitle.trim()
            if (value) {
              //쓰기 데이터 객체 만들기
                var newalbumdata = {}
                newalbumdata.userid = 1;
                newalbumdata.id = this.lastNumber + 1;
                newalbumdata.title = this.newAlbumTitle;

                //이미지 데이터 전송 부터 먼저 시간이 오래 걸려서

                var albumImage = this.newAlbumPhoto;
                // console.log(albumImage);
                var storageRef = firebase.storage().ref('albumPhoto/' + albumImage.name);
                var uploadTask = storageRef.put(albumImage);

                // var uploader = document.querySelector('#uploader');

                // uploadTask.on('state_changed', function progress(snapshot) {
                //
                //     var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //     uploader.value = percentage;
                //
                // }, function(error) {
                //     console.error(error.message)
                // }, function() {
                //     //전역 스토어에 이미지 url저장
                //     _this.$store.imgURL = uploadTask.snapshot.downloadURL;
                //     // 보낼 data 하루다이어리에 image 에다가  url 저장
                //     _this.newalbumdata.image = _this.$store.imgURL;
                //     console.log("_imageURL", _this.$store.imgURL);
                //
                //     this.$http.post('https://fir-practice-b1abc.firebaseio.com/album-title.json', newalbumdata)
                //         .then(function(response) {
                //             console.log(response);
                //             _this.$emit('sendNewAlbumData', newalbumdata)
                //             _this.closeModal();
                //         })
                //         .catch(function(error) {
                //             console.log(error);
                //         });
                //       });


                // 이미지 전송 cross origin 오류가 뜨는데 firebase 공식 문서에 나온 방법으로 시도 해보자!
                // axios말고 .. ㅜㅜ
                // this.$http.post('gs://fir-practice-b1abc.appspot.com/newalbum'+newalbumimage.name,newalbumimage)
                //     .then(function (response) {
                //       console.log(response);
                //     })
                //     .catch(function (error) {
                //       console.log(error);
                //     });


            } else {
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
            console.log(this.newAlbumPhoto);
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
        removeImage(e) {
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
