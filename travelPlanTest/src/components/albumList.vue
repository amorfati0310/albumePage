<template>
  <ul v-if="displayAlbums.length" class="album-list">
    <li v-for="album in displayAlbums" class="album-list-item">

      <div class="card-image">
        <figure class="image is-4by3">
           <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="http://bulma.io/images/placeholders/96x96.png" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4"> {{album.title}}</p>
            <p class="subtitle is-6">@{{album.title}}</p>
          </div>
        </div>

        <!-- <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris. <a>@bulmaio</a>.
          <a>#css</a> <a>#responsive</a>
          <br>
          <small>11:09 PM - 1 Jan 2016</small>
        </div> -->
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props:["displayAlbums"],
  name: "",
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="sass">
.album-list
  display: flex
  flex-wrap: wrap
.album-list-item
  // width: 30%
  width: (100%)/3
  padding: 1rem 2rem

</style>
