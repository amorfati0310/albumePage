<template>

  <nav class="pagination is-centered">

      <a class="pagination-previous" v-if="allowPrevious" @click="previousPageNation(pageNationNumber)">Previous</a>
      <a class="pagination-next" v-if="allowNext" @click="nextPageNation(pageNationNumber)">Next page</a>

      <ul class="pagination-list">
          <li><a class="pagination-link" v-if="allowPrevious"
            @click="gotoThisPage(1)">1</a></li>
          <li><span class="pagination-ellipsis" v-if="allowPrevious">&hellip;</span></li>
          <li><a class="pagination-link" v-if="allowPrevious" @click="gotoThisPage(pageNationNumber-1)">{{pageNationNumber-1}}</a></li>
          <li><a class="pagination-link is-current">{{pageNationNumber}}</a></li>
          <li><a class="pagination-link" v-if="allowNext" @click="gotoThisPage(pageNationNumber+1)">{{pageNationNumber+1}}</a></li>
          <li><span class="pagination-ellipsis"v-if="allowNext">&hellip;</span></li>
          <li><a class="pagination-link" v-if="allowNext"
              @click="gotoThisPage(lastPageNationNumber)">{{lastPageNationNumber}}</a></li>
      </ul>
  </nav>

</template>
<script>
export default {
    name: "",
    props:['pageNationNumber','lastPageNationNumber'],
    data: function data() {
        return {
          allowNext: true,
          allowPrevious: false
        }
    },
    methods: {
      previousPageNation(currentPageNationNumber){
        currentPageNationNumber--;
        this.$emit('previousPageNation',currentPageNationNumber)

      },
      nextPageNation(currentPageNationNumber){
        currentPageNationNumber++;
        this.$emit('nextPageNation',currentPageNationNumber)
      },
      gotoThisPage(thisPageNationNumber){
        this.$emit('gotoThisPage',thisPageNationNumber)
      },
      ableNext(currentPageNationNumber){
        if(currentPageNationNumber !== this.lastPageNationNumber){
            this.allowNext = true
        }
        else{
            this.allowNext = false;
        }
      },
      ablePrevious(currentPageNationNumber){
        if(currentPageNationNumber > 1){
            this.allowPrevious = true
        }
        else{
            this.allowPrevious = false;
        }
      }
    },
    updated() {
     var currentPageNationNumber = this.pageNationNumber
      this.ableNext(currentPageNationNumber);
      this.ablePrevious(currentPageNationNumber);
    }
}
</script>
<style>

</style>
