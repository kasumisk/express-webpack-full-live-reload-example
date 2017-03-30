<template>
  <div>
    <nv-head></nv-head>
    <el-select v-model="value">
     <el-option
       v-for="item in options"
       :label="item.label"
       :value="item.value">
     </el-option>
    </el-select>
    <div class="nav">
      <router-link :to="{ name: 'user', params: { id: page }}">user</router-link>
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value2:false
    }
  },
  created: function() {
    console.log('33')
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
