<template>
    <div class="rolelist-wrap">
      <crumbs :compath="compath"></crumbs>
      <el-button type="primary" @click="dialogFormVisible=true">添加角色</el-button>

      <el-table class="rolelist-table"
        :data="roleData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">

            <el-row v-for="item1 in scope.row.children" :key="item1.id" class="el-row">
                <el-col :span="4">
                  <el-tag closable :disable-transitions="false" @close="handleClose"  type="warning">{{item1.authname}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-row v-for="item2 in item1.children" :key="item2.id">
                    <el-col :span="4"><el-tag
                      closable
                      :disable-transitions="false"
                      @close="handleClose"
                       type="primary">{{item2.authname}}</el-tag></el-col>
                    <el-col :span="20" ><el-tag closable :disable-transitions="false"
                                                @close="handleClose"
                                                v-for="item3 in item2.children" :key="item3.id" type="danger">{{item3.authname}}</el-tag></el-col>
                  </el-row>
                </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column>
          <el-table-column
            label="角色 ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="角色名称"
            prop="rolename">
          </el-table-column>
          <el-table-column
            label="角色描述"
            prop="roledesc">
          </el-table-column>
        </el-table-column>

      </el-table>


      <!--      添加角色对话框-->
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="formdata" status-icon   label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名" prop="pass">
          <el-input type="text" v-model="formdata.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="checkPass">
          <el-input type="text" v-model="formdata.roledesc" autocomplete="off"></el-input>
        </el-form-item>

        <el-tree
          :data="tree_data"
          show-checkbox
          node-key="id"
          default-expanded-all
          ref="tree"
          :props="defaultProps">
        </el-tree>


        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
    </div>
</template>

<script>
  import crumbs from "../custom/crumbs";
  export default {
    name: "rolelist",
    data:function(){
      return {
        roleData:[],
        defaultProps:{
          label:"authname",
          children:"children"
        },
        dialogFormVisible:false,
        tree_data:[],
        formdata:{
          rolename:"",
          roledesc:""
        },
        compath:{
          subpath1:"权限管理",
          subpath2:"角色列表"
        }}
    },
    created() {
       this.gettreedata();
       this.getroledata();
      },
    methods:{
      handleClose()
      {
         return true
      },
      async getroledata()
      {
        let res =await this.$http.get("/get_role_data");
        if(res.data.status==="200")
        {
          this.roleData=res.data.data;
          console.log("roleDate:",this.roleData)
        }
      },
      async submitForm()
      {
        this.dialogFormVisible=false;
        let arr1=this.$refs.tree.getHalfCheckedKeys();
        let arr2=this.$refs.tree.getCheckedKeys();
        let arr=[...arr1,...arr2];
        let obj={
             rolename:this.formdata.rolename,
             roledesc:this.formdata.roledesc,
             tree_data:arr
        }
        let res=await this.$http.post("add_role",obj);
        if(res.data.status==="200")
        {
             this.$message.success("角色添加成功!");
             console.log("arr:",res.data.data);
             this.getroledata();
        }

      },
      resetForm()
      {},
      async gettreedata()
      {
       let res=await this.$http.get("/get_tree_data");
       if(res.data.status==="200")
       {
           this.tree_data=res.data.data;
           console.log(this.tree_data)
       }
      }
    },
    components:{
      crumbs
    }
  }
</script>

<style lang="scss">
  .rolelist-wrap
  {
    .rolelist-table thead
    {
      height: 30px;
      line-height: 30px;
    }
    .el-row
    {
      line-height: 35px;
      height: 35px;
    }

  }



</style>
