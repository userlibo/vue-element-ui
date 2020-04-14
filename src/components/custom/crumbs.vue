<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{compath.subpath1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{compath.subpath2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
    export default {
        name: "crumbs",
        props:["compath"],
        data:function () {
            return {}
        },
      methods:{

      }
    }
</script>

<style scoped>

</style>
