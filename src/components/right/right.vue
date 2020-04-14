<template>
  <div>
     <crumbs :compath="compath"></crumbs>
    <el-button type="primary" @click="dialogFormVisible=true">添加权限</el-button>
    <el-button type="warning" @click="assign_authname">分配权限</el-button>

    <el-table
      height="500"
      :data="tableData"
      header-row-class-name="setheader"
      style="width: 100%">
      <el-table-column
        fixed
        align="center"
        type="index"
        label="序号"
        width="50"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="authname"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="pid"
        label="pid"
        width="180">
      </el-table-column>

      <el-table-column
        align="center"
        prop="operator"
        label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="8">
              <el-button type="primary"@click="showedit(scope.row)" size="mini" plain circle icon="el-icon-edit"></el-button>
            </el-col><el-col :span="8">
            <el-button type="warning" size="mini" @click="del_user(scope.row.id)" plain circle icon="el-icon-delete"></el-button>
          </el-col><el-col :span="8">
            <el-button type="success" size="mini" plain circle icon="el-icon-check"></el-button>
          </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>


<!--    分配权限对话框-->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible2">
      <el-form :model="formdata2">
        <el-form-item label="等级一" >
          <el-select v-model="PID.class1" placeholder="请选择等级一类目...">
            <el-option v-for="item in formdata2.classArr1" :key="item.id" :label="item.authname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级二" >
          <el-select v-model="PID.class2" placeholder="请选择等级二类目...">
            <el-option v-for="item in formdata2.classArr2" :key="item.id" :label="item.authname" :value="item.id"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="等级三" >
          <el-select v-model="PID.class3" placeholder="请选择等级三类目...">
            <el-option v-for="item in formdata2.classArr3" :key="item.id" :label="item.authname" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="assign_pid">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加权限-->
    <el-dialog title="添加权限" :visible.sync="dialogFormVisible">
      <el-form :model="formdata">
        <el-form-item label="权限等级:" >
          <el-select v-model="formdata.class" placeholder="请选择权限等级">
            <el-option label="等级一" value="1"></el-option>
            <el-option label="等级二" value="2"></el-option>
            <el-option label="等级三"  value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限名称">
          <el-input v-model="formdata.authname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_authname">确 定</el-button>
      </div>
    </el-dialog>




  </div>
</template>

<script>
  import crumbs from "../custom/crumbs";
    export default {
        name: "right",
        data:function(){
          return {
            tableData:[],
            PID:{
              class1:"",
              class2:"",
              class3:""
            },
            dialogFormVisible:false,
            dialogFormVisible2:false,
            formdata2:{
              classArr1:[],
              classArr2:[],
              classArr3:[]
            },
            formdata:{
              class:"1",
              authname:""
            },
            compath:{
            subpath1:"权限管理",
            subpath2:"权限列表"
            }}
        },
      created() {
          this.get_authname();
      },
      methods: {
        showedit()
        {},
        del_user()
        {},


          async get_authname()
          {
             let res=await this.$http.get("/get_authname2");
             if(res.data.status==='200')
             {
               this.tableData=res.data.data;
             }
          },
          async assign_pid()
          {
            this.dialogFormVisible2 = false;
            let res=this.$http.post("/assign_pid",this.PID);
            if(res.data.status==="200")
            {
                this.$message.success("等级操作成功！");
                this.PID={
                  class1:"",
                  class2:"",
                  class3:"",
                };
            }
          },
          async assign_authname()
          {
              this.dialogFormVisible2=true;
              let res=await this.$http.get("/get_authname");
              if(res.data.msg==="200")
              {
                 console.log(res.data.data)
                 this.formdata2=res.data.data;
              }
          },

      async add_authname()
        {
            this.dialogFormVisible = false;
            let res=await this.$http.post("/add_authname",this.formdata);
            if(res.data.msg==="200")
            {
              this.$message.success("权限添加成功");
              this.formdata={}
              this.formdata.class="3";
            }
        }

      },
      components:{
          crumbs
      }
    }
</script>

<style scoped>

</style>
