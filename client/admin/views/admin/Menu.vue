<template>
<div>
  <div class="nav">
    <router-link to="/admin/menu/table">table</router-link>
    <router-link to="/admin/menu/hello">Hello</router-link>
    <router-link to="/admin/menu/time">Time</router-link>
  </div>
  <transition name="fade" mode="out-in">
    <keep-alive><router-view class="view"></router-view></keep-alive>
  </transition>
</div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created:function () {

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
