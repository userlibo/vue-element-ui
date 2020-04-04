<template>
    <div class="login-wrap">
       <h1 class="sy-title">电商后台登录系统-elemnet-ui编写</h1>
      <el-form label-position="top" label-width="80px" :model="formdata">
        <h1>用户登录</h1>
        <el-form-item label="用户名">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-button type="primary" @click.prevent="signin">登录</el-button>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data:function () {
           return {
             formdata:{
               username:"",
               password:""
             }
           }
        },
        methods:{
         async signin()
         {
          let res=await this.$http.post("/eshop/login",this.formdata)
             console.log(res.data);
             console.log("123")
             if (res.data == "0") {
               console.log("0")
               this.$message.success("欢迎进入！")
               this.$router.push({name: "home"});
             } else if (res.data == "1") {
               console.log("1")
               this.$message.warning("用户名不存在!")
             } else if (res.data == "2") {
               console.log("2")
               this.$message.warning("密码错误!")
             }


         }
        }
    }
</script>

<style lang="scss">
  .login-wrap
  {
    .sy-title
    {
      color: #606266;
      width: 100%;
      position: fixed;
      top:30px;
      text-align: center;
      background-color: #999;
      background-image:linear-gradient(to right,red,yellow,red);

    }


    /*border:1px solid red;*/
    width: 100%;
    height: 100%;
    background-color:#000000;
    background-color: #2b81af;
    display:flex;
    flex-flow: column wrap;
    justify-content:center;
    align-items:center;
    .el-form
    {
      h1
      {
        color:#606266;
        font-size: 22px;
        text-align: center;
      }
      font-size: larger;
      font-weight: bolder;
      background-color: #fff;
      padding: 20px 50px;
      border-radius: 5px;

    }

    .el-button
    {
      width: 100%;
    }




  }
</style>
