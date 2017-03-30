<template>
  <div>
    <nv-head></nv-head>
    <div class="nav">
      <router-link :to="{ name: 'user', params: { id: page }}">user11</router-link>
      <router-link to="/admin/game">game</router-link>
      <router-link to="/admin/menu">admin</router-link>
    </div>
    <h2>hello</h2>
    <transition name="fade" mode="out-in">
      <keep-alive><router-view class="view"></router-view></keep-alive>
    </transition>
</div>
</template>
<script>

export default {
  data() {
    return {
      page:4,
      value:'',
      value2:false
    }
  },
  created: function() {
       this.getCustomers()
   },
   methods: {
       getCustomers: function() {
           this.$http.get('/api/login')
               .then((response) => {
                   this.$set('gridData', response.data)
               })
               .catch(function(response) {
                   console.log(response)
               })
       }
   },
   components:{
     "nvHead":require('../components/header.vue')
   }
}
</script>
