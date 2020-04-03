<template>
    <div class="login-wrap">
       <h1>电商后台登录系统-elemnet-ui编写</h1>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data:function () {
           return {}
        },
        methods:{

        }
    }
</script>

<style lang="scss">

</style>
