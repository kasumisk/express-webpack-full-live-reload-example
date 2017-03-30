<template>
<div id='app'>
  <!-- <div class="nav">
    <router-link to="/home">Home</router-link>
    <router-link to="/hello">Hello</router-link>
  </div> -->
    <li v-for="p in products">
      {{ p.title }} - {{ p.price  }}
      <br>
    </li>
    <div>
       Clicked: {{ count }} times, count is {{ evenOrOdd }}.
     </div>

  <transition name="fade" mode="out-in">
    <keep-alive><router-view class="view"></router-view></keep-alive>
  </transition>
</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {}
  },
  computed: mapGetters({
    products: 'allProducts',
    evenOrOdd:'evenOrOdd',
    count:'count'
  }),
  methods: {
    myfunction(){
      console.log('222')
    }
  },
  created () {

  }

}
</script>

<style lang="scss">
body {
  color: #333333;
}
.nav > a.active {
  font-weight: bold;
  font-size: 1.2em;
}
.view {
  transition: opacity .2s ease;

  &.fade-enter-active,
  &.fade-leave-active {
    opacity: 0;
  }
}
</style>
