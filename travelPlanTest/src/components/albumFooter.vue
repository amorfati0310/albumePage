<template>
  <footer class="footer">
    <nav class="footer-nav">
      <ul class="contact-link-list">
        <li class="contact-link-item"><a href="https://github.com/amorfati0310"><i class="fa fa-github-alt" aria-hidden="true"></i></a></li>
        <li class="contact-link-item"><a href="https://www.linkedin.com/in/amorfati0310/"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a></li>
        <li class="contact-link-item"><a href="https://www.facebook.com/profile.php?id=100002373644190&ref=bookmarks"><i class="fa fa-facebook-official" aria-hidden="true"></i></a></li>
      </ul>
      <span class="copyright">&copy; 2017 Chany</span>
    </nav>
  </footer>
</template>
<script>
export default {
  name: "",
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="sass">
.footer
  height: 4rem
  line-height: 4rem
  padding: 2rem
  background-color: #fff
  color: #000
  text-align: center

.footer-nav
  display: flex
  align-items: center
  justify-content: center
  line-height: 4rem

.contact-link-list
  display: flex
  align-items: center
  justify-content: center

.contact-link-item
  display: inline-block
  line-height: 4rem
  margin-right: 1rem

.copyright
  margin-left: 2rem
  display: inline-block
.fa
  vertical-align: baseline

</style>
