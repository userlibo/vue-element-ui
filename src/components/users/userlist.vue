<template>
<!--  <h1>用户列表页</h1>-->
  <el-card class="box-card" >
    <!--    面包屑导航-->
   <crumbs :compath="compath"></crumbs>
    <!--    搜索-->
    <el-row >
      <el-col :span="8">
        <el-input @clear="clear_newgetlist()" @change="change_newgetlist" placeholder="请输入内容" clearable v-model="search_str" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="hundleSearch"></el-button>
        </el-input>
        </el-col>
          <el-col :span="8">
    <!--添加用户  -->
    <el-button type="success" @click="dialogFormVisible1=true">添加用户</el-button>
          </el-col>
    </el-row>
    <!--列表-->
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
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            align="center"
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            align="center"
            prop="phone"
            label="电话">
          </el-table-column>
          <el-table-column
            align="center"
            label="创建日期">
            <template slot-scope="tableData">
              {{tableData.row.ctime | timefmt}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="用户状态">
            <template slot-scope="scope">
            <el-switch
              @change="change_user_state(scope.row)"
              v-model="scope.row.userstate"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            </template>
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
              <el-button type="warning" size="mini" @click="del_user(scope.row.userid)" plain circle icon="el-icon-delete"></el-button>
            </el-col><el-col :span="8">
              <el-button type="success" size="mini" plain circle icon="el-icon-check" @click="show_role_name_dialog(scope.row)"></el-button>
            </el-col>
            </el-row>
            </template>
          </el-table-column>
        </el-table>
    <!--    分页-->
        <!--    分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 4, 6]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

<!--    添加用户对话框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible1">
      <el-form :model="formdata">
        <el-form-item label="用户名称" :label-width="formLabelWidth1">
          <el-input v-model="formdata.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth1">
          <el-input v-model="formdata.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth1">
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth1">
          <el-input v-model="formdata.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </div>
    </el-dialog>

<!--    编辑用户信息-->
    <el-dialog title="编辑用户信息" :visible.sync="editformVisible">
      <el-form :model="editform" label-position="right">
        <el-form-item required label="用户名" :label-width="formLabelWidth">
          <el-input  disabled v-model="editform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="editform.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editformVisible = false">取 消</el-button>
        <el-button type="primary" @click="putuserinfo">确 定</el-button>
      </div>
    </el-dialog>

<!--    改变用户角色对话框-->
    <el-dialog title="用户" :visible.sync="userroledialogFormVisible">
      <el-form :model="userroleform">
        <el-form-item required label="用户名" :label-width="formLabelWidth">
          <el-input  disabled v-model="userroleform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select @change="change_role_name" v-model="userroleform.role_name" placeholder="请选择活动区域">
            <el-option selected="selected"  v-for="item in rolenamelist" :key="item.userid" :label="item.label" :value="item.rolename"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userroledialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save_role_name">确 定</el-button>
      </div>
    </el-dialog>



  </el-card>

</template>

<script>
    import crumbs from "../custom/crumbs";
    export default {
      name: "userlist",
      components:{crumbs},
      data:function()
      {
          return {
            compath:{
              subpath1:"用户管理",
              subpath2:"用户列表",
            },
            user_role_info:{
              userid:"",
              label:"",
              rolename:""
            },
            rolenamelist:[],
            userroledialogFormVisible:false,
            userroleform:{
              name:"",
              role_name:""
            },
            search_str:"",
            pageSize:4,
            currentPage:1,
            total:20,
            formLabelWidth1:"40px",
            editformVisible:false,
            editform:{
              name:"",
              email:"",
              phone:""
            },
            formdata:{
              name:"",
              password:"",
              email:"",
              phone:"",
              userstate:true
            },
            dialogFormVisible1:false,
            tableData:[],
          }
      },
      created()
      {
        this.getlist();
      },
      // filters:{
      //   "timefmt":function (data) {
      //     let d=new Date(data);
      //     let y=d.getFullYear();
      //     let m=(d.getMonth()+1).toString().padStart(2,"0");
      //     let dd=d.getDate().toString().padStart(2,"0");
      //     let h=d.getHours().toString().padStart(2,"0");
      //     let mm=d.getMinutes().toString().padStart(2,"0");
      //     let s=d.getSeconds().toString().padStart(2,"0");
      //     return `${y}/${m}/${dd} ${h}-${mm}-${s}`
      //   }
      // },
      methods: {
          async save_role_name()
          {
            this.userroledialogFormVisible=false;
            let res=await this.$http.put("/save_role_name",this.user_role_info);
            if(res.data.status==="200")
            {
              this.$message.success("用户角色更改成功!")
            }else
            {
              this.$message.warning("用户角色更改失败!")
            }
          },
        async change_role_name(v)
        {
          // this.userroledialogFormVisible=false;
          console.log("v:",v);
          let userid=this.userroleform.userid;
          let label="";
          this.rolenamelist.forEach((item)=>{
                if(item.rolename===v)
                {
                   label=item.label;
                   return;
                }
          })
          this.user_role_info={
            userid:userid,
            label:label,
            rolename:v
          }

        },
          async show_role_name_dialog(userdata)
          {
            this.userroledialogFormVisible=true;
            this.userroleform=userdata;
            let res=await this.$http.get("/rolenamelist");
            if(res.data.status==="200")
            {
                this.rolenamelist=res.data.data;
            }

          },
          showedit(userdata)
          {
              this.editformVisible=true;
              this.editform=userdata
          },
          async putuserinfo()
          {
            this.editformVisible=false;
            let res=await this.$http.put("/put_user",this.editform)
            if(res.data.status==="200")
            {
              this.$message.success(res.data.msg);
              this.currentPage=1;
              this.pageSize=4;
              this.getlist();
            }
            else
            {
              this.$message.warning("用户信息更新失败！")
            }


          },
          del_user(userid)
          {
            this.$confirm('确定要删除该用户?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              let res=await this.$http.delete(`/del_user/${userid}`)
              if(res.data.status==="200")
              {
                this.getlist();
                this.currentPage=1;
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          change_newgetlist()
          {
            this.getlist();
          },
          clear_newgetlist()
          {
            this.getlist();
          },
           hundleSearch()
           {
             this.getlist();
           },
          async change_user_state(userdata)
          {
            // console.log("新状态的值:",v)
            let userid=userdata.userid;
            let userstate=userdata.userstate;
            let res=await this.$http.put("/put_userstate",{userid:userid,userstate:userstate})
            if(res.data.status==="200")
            {
              this.currentPage=1;
              this.getlist();
              this.$message.success(res.data.msg);
            }


          },
        handleSizeChange(pageSize)
        {
          this.pageSize=pageSize;
          this.getlist();
        },
        handleCurrentChange(currentPage)
        {
          this.currentPage=currentPage;
          this.getlist(this.pageSize,currentPage);
        },

          async getlist()
          { let pageSize=this.pageSize;
            let currentPage=this.currentPage;
            let search_str=this.search_str;
            let res=await this.$http.post("/getallusers/"+pageSize+"/"+currentPage,{
                  search_str
              })
          console.log("userlist:",res.data);
          this.tableData=res.data.data;
          this.total=res.data.total;
          },
         async adduser()
          {
             this.dialogFormVisible=false;
            let res=await this.$http.post("/adduser",this.formdata);
             if(res.data.status==='201')
             {
               console.log("数据添加成功!");
               this.$message.success(res.data.msg);
               this.getlist();
             }else
             {
               console.log("数据添加失败!")
               this.$message.warning(res.data.msg)

             }
          }
      },
      watch:{
        dialogFormVisible:function (newv,oldv) {
               if(newv===false)
               {
                 this.formdata={};
               }
        },
        search_str:function (newv) {
             if(newv)
             {
               this.currentPage=1;
               this.pageSize=2;
             }
        }
      }

    }
</script>

<style lang="scss">

  .datalist-wrap
  {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 3px 3px;
    thead.has-gutter
    {
      height: 50px;
    }
    .setheader
    {
      height: 40px;
    }

  }





</style>
