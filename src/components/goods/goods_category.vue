<template>
  <el-card class="box-card">
   <crumbs :compath="compath"></crumbs>
  <el-alert class="alert" center
    title="商品类别"
    type="warning">
  </el-alert>
<el-button type="primary" @click="addCategory">添加商品类别</el-button>

<!--   添加商品类别对话框-->
    <el-dialog title="添加类别" :visible.sync="addCategoryFormVisible">
      <el-form :model="addcForm">
        <el-form-item label="输入类别名称:" >
          <el-input v-model="addcForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择类别" >
<!--         级联样式表-->
          {{addcForm.selectedCategoryValue}}
          <el-cascader
            v-model="addcForm.selectedCategoryValue"
            :options="options"
            :props="{ expandTrigger: 'hover',
            checkStrictly:true,
             lazy:false,
             value:'id'
             }"
            @change="handleChange">
          </el-cascader>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCategory">取 消</el-button>
        <el-button type="primary" @click="submitCategory">确 定</el-button>
      </div>
    </el-dialog>

<!--   商品类别列表-->
    <i-tree-table ref="tree_table" height="600px" id-key="rowKey" :columns="columns"
                  reserve-expaned="false"
                  @select="onSelect"
                  @trigger="onTrigger"
                  :data="data" border>
      <el-table-column label="id" prop="id"/>
      <el-table-column label="label" prop="label"/>

    </i-tree-table>


  </el-card>
</template>

<script>
    export default {
        name: "goods_category",
        data:function () {
           return {
             columns: [{
               type: 'index',
               align: 'center'
             },{
               label: '类别名称',
               prop: 'label'
             }]
             ,
             data:[],
             options:[],
             addCategoryFormVisible:false,
             addcForm:{
               name:"",
               selectedCategoryValue:[]
             },
             compath: {
               subpath1: "商品管理",
               subpath2: "商品类别"
             }
           }
        },
        created() {
          this.getcategorylist();
        },
        mounted() {
          this.$refs.tree_table.collapseAll();
        },
        methods:{
          onSelect (selection) {
            console.log(selection)
          },
          onTrigger (row, expanded) {
            /**
             * 在这里可以保留折叠状态
             * 也可以设置reserve-expaned属性为true保留状态 但是你不能够设置默认值，设置了默认值的行将不受控，因为* 组件肯定是选择用户传入$expaned属性为准
             * 所以推荐的做法是监听trigger事件
             */
            row.$expanded = expanded
          },
          async getcategorylist()
          {
            let res=await this.$http.get("/get_options");
            if(res.data.status==="200")
            {
              this.data=res.data.data;
              console.log("tree_data:",this.tree_data);
            }
          },
          closeCategory(){
            this.addCategoryFormVisible=false;
            this.addcForm={};
          },
          addCategory()
          {
            this.getoptions();
            this.addCategoryFormVisible=true;
          },
         async getoptions() {
           let res = await this.$http.get("/get_options");
           if (res.data.status==="200")
           {
               this.options=res.data.data;
           }
         },


         async submitCategory()
          {if(this.addcForm.name!=="")
          {
            this.addCategoryFormVisible=false;
            let obj = {};
            console.log("length:",this.addcForm.selectedCategoryValue)
            if(this.addcForm.selectedCategoryValue.length===0) {
              obj.class = 1;
              obj.pid = 0;
            }else if(this.addcForm.selectedCategoryValue.length===1)
            {
              obj.class = 2;
              obj.pid =this.addcForm.selectedCategoryValue[0];
            }else if(this.addcForm.selectedCategoryValue.length===2)
            {
              obj.class = 3;
              obj.pid =this.addcForm.selectedCategoryValue[1];
              obj.pidpid =this.addcForm.selectedCategoryValue[0];
            }
            obj.id=new Date().getTime().toString();
            obj.value=obj.label=this.addcForm.name;
            console.log("obj:",obj);
            let res=await this.$http.post("/add_category",obj);
            if(res.data.status==="200")
            {
              this.$message.success("商品分类添加成功!");
              this.addcForm={};
            }

          }else
          {
            this.$message.warning("请输入要添加的类名!");
          }


          },
          handleChange(v)
          {
          console.log("handleChange:",v);
          }
        }
    }
</script>

<style scoped lang="scss">

  .box-card
  {
    .alert{
      height: 35px;
      margin-top: 25px;
      /*line-height: 10px;*/
    }
  }

</style>
