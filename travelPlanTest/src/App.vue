<template>
  <div id="app">
    <albumHeader></albumHeader>
    <albumList :displayAlbums="displayAlbums"
      :albumsTota="albumsTotal"
    ></albumList>
    <albumPageNation
    :pageNationNumber="pageNationNumber"
    :lastPageNationNumber="lastPageNationNumber"
    @previousPageNation="previousPageNation"
    @nextPageNation="nextPageNation"
    @gotoThisPage="gotoThisPage"
    ></albumPageNation>
    <a class="button"  @click="directGetAlbumData">앨범 데이터 가지고 오기 :D</a>
    <a class="button alubme-write is-large"  @click="writeAlbum"> <i class="fa fa-pencil" aria-hidden="true"></i></a>
    <albumWrite :writeActive="writeActive"
      :lastNumber="lastNumber"
      @closeModal ="closeModal"
      @sendNewAlbumData ="sendNewAlbumData"
    ></albumWrite>
    <albumFooter></albumFooter>
  </div>
</template>

<script>
import albumHeader from './components/albumHeader.vue'
import albumList from './components/albumList.vue'
import albumFooter from './components/albumFooter.vue'
import albumPageNation from './components/albumPageNation.vue'
import albumWrite from './components/albumWrite.vue'
import axios from 'axios'



export default {
  name: 'app',
  data () {
    return {
      albumsTotal:[],
      displayAlbums:[],
      pageNationNumber:1,
      lastPageNationNumber:0,
      writeActive: false,
      lastNumber:'',
      storageKey: 'simpleAblum-vue.js.ver.1'
    }
  },
  components: {
    albumHeader : albumHeader,
    albumList: albumList,
    albumFooter: albumFooter,
    albumPageNation: albumPageNation,
    albumWrite: albumWrite
  },
  methods: {
    directGetAlbumData(){
      this.getAlbumData(this.pageNationNumber)
    },
    settingPage(firstCut,lastCut){

    },
    updateAlbumData(){

    },
    getAlbumData(pageNationNumber){
      var _this =this;
      var firstCut = (pageNationNumber-1)*9;
      var lastCut = pageNationNumber*9
      axios.get('https://jsonplaceholder.typicode.com/albums')
                .then((result) => {

                  _this.albumsTotal = result.data;

                  _this.displayAlbums = _this.albumsTotal.slice(firstCut, lastCut);

                  _this.lastPageNationNumber = result.data.length%9 === 0
                  ? result.data.length/9 : result.data.length/9 +1;
                  _this.lastPageNationNumber = Math.floor(_this.lastPageNationNumber)


                  _this.lastNumber = _this.albumsTotal.length;
                })

    },
    previousPageNation(currentPageNationNumber){
      this.pageNationNumber = currentPageNationNumber
      this.getAlbumData(currentPageNationNumber)
    },
    nextPageNation(currentPageNationNumber){
      this.pageNationNumber = currentPageNationNumber
      this.getAlbumData(currentPageNationNumber)
    },
    gotoThisPage(thisPageNationNumber){
      this.pageNationNumber = thisPageNationNumber
      this.getAlbumData(thisPageNationNumber)
    },
    writeAlbum(){
      this.writeActive = true;
    },
    closeModal(){
      this.writeActive = false;
    },
    sendNewAlbumData(newalbumdata){
      this.albumsTotal.push(newalbumdata);
    },

},
  creted(){
    console.log("하이");
    this.getAlbumData(this.pageNationNumber)
  },
  watch: {
   changedAlbums: {
   handler: function (displayAlbums) {
      this.getAlbumData(this.pageNationNumber)
     }
    }
  }
}
</script>

<style lang="sass">
html
  font-family: sans-serif
  line-height: 1.15
body,h1
  margin: 0
body
  position: relative
  min-height: 100vh
#app
  max-width: 1080px
  margin: 0 auto

.alubme-write
  position: fixed
  right: 0
  bottom: 1rem
  border-radius: 50%
  background-color: #ff2b56
  color: #fff


</style>
