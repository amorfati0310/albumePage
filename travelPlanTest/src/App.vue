<template>
  <div id="app">
    <albumHeader></albumHeader>
    <albumList :displayAlbums="displayAlbums"></albumList>
    <albumPageNation
    :pageNationNumber="pageNationNumber"
    :lastPageNationNumber="lastPageNationNumber"
    @previousPageNation="previousPageNation"
    @nextPageNation="nextPageNation"
    @gotoThisPage="gotoThisPage"
    ></albumPageNation>
    <button @click="start">일단 이걸로 하자</button>
    <albumFooter></albumFooter>
  </div>
</template>

<script>
import albumHeader from './components/albumHeader.vue'
import albumList from './components/albumList.vue'
import albumFooter from './components/albumFooter.vue'
import albumPageNation from './components/albumePageNation.vue'

export default {
  name: 'app',
  data () {
    return {
      albumsTotal:[],
      displayAlbums:[],
      pageNationNumber:1,
      lastPageNationNumber:0
    }
  },
  components: {
    albumHeader : albumHeader,
    albumList: albumList,
    albumFooter: albumFooter,
    albumPageNation: albumPageNation
  },
  methods: {
    start(){
      this.getAlbumData(this.pageNationNumber)
    },
    getAlbumData(pageNationNumber){
      var _this =this;
      var firstCut = (pageNationNumber-1)*9;
      var lastCut = pageNationNumber*9
      this.$http.get(`/albums`)
                .then((result) => {
                  _this.albumsTotal = result.data;
                  _this.displayAlbums = _this.albumsTotal.slice(firstCut, lastCut);

                  _this.lastPageNationNumber = result.data.length%9 === 0
                  ? result.data.length/9 : result.data.length/9 +1;
                  _this.lastPageNationNumber = Math.floor(_this.lastPageNationNumber)
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
    }
},
  beforeCreate() {
    var _this =this;
    this.$http.get(`/albums`)
              .then((result) => {
                _this.albumsTotal = result.data;
                _this.displayAlbums = _this.albumsTotal.slice(0, 9);
              })
  },
  watch: {
   changedAlbums: {
   handler: function (displayAlbums) {
       console.log("changed");
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
  min-height: 100vh
#app
  max-width: 1080px
  margin: 0 auto
</style>
