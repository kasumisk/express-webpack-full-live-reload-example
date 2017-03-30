<template>
  <div>
    <h2>{{webName}}1</h2>
    <el-input
  placeholder="请输入账号"
  icon="user"
  v-model="input2">
</el-input>

<el-input
placeholder="请输入密码"
icon="user"
v-model="input1"
>
</el-input>

</div>
</template>
<script>
export default {
  data() {
    return {
      webName:'益玩考勤平台用户登陆',
      input2:'',
      input1:''
    }
  },
  methods:{

  }
}
</script>
