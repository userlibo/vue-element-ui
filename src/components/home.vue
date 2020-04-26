<template>
    <div class="home-wrap">
      <el-container class="el-wrap1">
        <el-header>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple"><h1>logo</h1></div></el-col>
            <el-col :span="18"><h1 class="title">e-shop电商后台管理系统</h1></el-col>
            <el-col :span="2"><div class="grid-content bg-purple"><a href="#" class="logout">退出</a></div></el-col>
          </el-row>
          </el-header>
        <el-container class="el-wrap2">
          <el-aside width="200px">

            <el-menu
              default-active="1"
              :unique-opened="true"
              class="el-menu-vertical-demo"
              router="true"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/home/userlist"><i class="el-icon-menu"></i>用户列表</el-menu-item>

                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/home/rolelist"><i class="el-icon-menu"></i>角色列表</el-menu-item>
                    <el-menu-item index="/home/right"><i class="el-icon-menu"></i>权限列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/home/goods_manager"><i class="el-icon-menu"></i>商品列表</el-menu-item>
                  <el-menu-item index="/home/classificy_arguments"><i class="el-icon-menu"></i>分类参数</el-menu-item>
                  <el-menu-item index="/home/goods_category"><i class="el-icon-menu"></i>商品分类</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/home/orderlist"><i class="el-icon-menu"></i>订单列表</el-menu-item>
<!--                  <el-menu-item index="1-2"><i class="el-icon-menu"></i>选项2</el-menu-item>-->
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/home/report"><i class="el-icon-menu"></i>数据报表</el-menu-item>
<!--                  <el-menu-item index="1-2"><i class="el-icon-menu"></i>选项2</el-menu-item>-->
                </el-menu-item-group>
              </el-submenu>






            </el-menu>


          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped lang="scss">

  .home-wrap {
     height: 100%;
    .el-wrap1
    {
      .title
      {
        text-align: center;
      }
      .logout
      {
        text-decoration: none;
        font-weight: bolder;
      }
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      /*border:1px solid red;*/
      height: 100%;
      .el-wrap2
      {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        height:100%;
        /*border: 1px solid blue;*/
      }


    }

    .el-header {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
      width: 100%;
      /*height: 100px;*/
    }

    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
      width: 22%!important;
      height: 100%;

    }

    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }

    body > .el-container {
      margin-bottom: 40px;
    }
  }
</style>
