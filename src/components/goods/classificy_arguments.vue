<template>
  <el-card class="box-card argu-wrap">
    <crumbs :compath="compath"></crumbs>
    <el-alert class="alert"
      title="只有三级目录才能设置分类参数"
      type="warning"
      center
      show-icon>
    </el-alert>

<!--    级联组件-->
    <div class="jilian">
<!--      {{ selectedCategoryValue}}-->
      商品名称:
    <el-cascader
      v-model="selectedCategoryValue"
      :options="options"
      :props="{ expandTrigger: 'hover',
             lazy:false,
             value:'id'
             }"
      @change="handleChange">
    </el-cascader>
    </div>

<!--    选项卡-->
    <el-tabs type="border-card"  @tab-click="handleClick">
      <el-tab-pane label="动态参数">
        <el-button type="danger" @click="show_dialog">设置动态参数</el-button>
<!--        属性表格-->
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
<!--           参数属性的标签展示 -->
              <el-tag class="tag_class1"
                :key="tag"
                type="success"
                effect="dark"
                v-for="tag in scope.row.d_item"
                closable
                :disable-transitions="false"
                @close="handleClose(tag,scope.row)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-model="inputValue"
                v-if="inputVisible"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click.native="showInput(scope.row)">+ New Tag</el-button>


            </template>
          </el-table-column>
          <el-table-column
            label="分类名称"
            prop="category_name"
          >
          </el-table-column>
          <el-table-column
            label="动态参数名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="操作">
          </el-table-column>
        </el-table>

      </el-tab-pane>

      <el-tab-pane label="静态参数">
        <el-button type="danger" @click="show_dialog2">设置静态参数</el-button>

      <!--静态参数表格-->
        <el-table
          :data="j_argu_tableData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="#"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="属性名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="value"
            label="属性值">
          </el-table-column>
        </el-table>


      </el-tab-pane>
    </el-tabs>

<!--设置静态参数对话框-->
    <el-dialog title="设置静态参数" :visible.sync="dialogFormVisible2">
      {{add_j_argu_form}}
      <el-form :model="add_j_argu_form">
        <el-form-item label="属性名称" >
          <el-input v-model="add_j_argu_form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性值:" >
          <el-input v-model="add_j_argu_form.value" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submit_j_argu">确 定</el-button>
      </div>
    </el-dialog>


<!--    设置动态参数对话框-->
    <el-dialog title="设置动态参数" :visible.sync="dialogFormVisible">
      {{add_d_argu_form}}
      <el-form :model="add_d_argu_form">
        <el-form-item label="属性名称" >
          <el-input v-model="add_d_argu_form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性值一:" >
          <el-input v-model="add_d_argu_form.item1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性值二:" >
          <el-input v-model="add_d_argu_form.item2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性值三:" >
          <el-input v-model="add_d_argu_form.item3" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit_d_argu">确 定</el-button>
      </div>
    </el-dialog>


  </el-card>
</template>

<script>
    export default {
        name: "classificy_arguments",
        data:function () {
           return {
             j_argu_tableData:[],
             add_j_argu_form:{
               name:"",
               value:""
             },
             inputVisible:false,
             inputValue:"",
             dynamicitem:[],
             dialogFormVisible:false,
             dialogFormVisible2:false,
             add_d_argu_form:{
               name:"",
               item1:"",
               item2:"",
               item3:""
             },
             tableData:[],
             options:[],
             selectedCategoryValue:[],
             compath: {
               subpath1: "商品管理",
               subpath2: "商品类别"
             }
           }

      },
       created() {
          this.getoptions();
          this.gettableData();
          // this.get_j_argu();
       }
      ,
        methods: {
          handleClick(tab, event) {
            console.log("tab,event:",tab, event);
            if(tab.index==="1")
            {
              this.get_j_argu();
            }
          },
          handleClose(tag, data) {
            this.tableData.forEach((item, i) => {
              if (item.name === data.name) {
                this.tableData[i].d_item.splice(this.tableData[i].d_item.indexOf(tag), 1)
                this.$http.put("/update_category_tag", this.tableData[i]).then(res => {
                  if (res.data.status === "200") {
                    this.$message.success("该分类参数项删除成功!");
                  }
                });
              }
            })
            // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
          },
          showInput(data) {
            this.inputVisible = true;
            this.dynamicitem = data;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
          },

          handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
              this.dynamicitem.d_item.push(inputValue);
              this.$http.put("/update_category_tag", this.dynamicitem).then(res => {
                if (res.data.status === "200") {
                  this.$message.success("分类参数项添加成功!");
                }
              });
            }
            this.inputVisible = false;
            this.inputValue = '';
          },
          show_dialog() {

            if (this.selectedCategoryValue.length === 0) {
              this.$message.warning("请先选择分类名称!");
              return;
            } else if (this.selectedCategoryValue.length !== 3) {
              this.$message.warning("只有三级分类才能设置参数!");
              return;
            } else {
              this.dialogFormVisible = true;
            }

          },
          show_dialog2() {
            if (this.selectedCategoryValue.length === 0) {
              this.$message.warning("请先选择分类名称!");
              return;
            } else if (this.selectedCategoryValue.length !== 3) {
              this.$message.warning("只有三级分类才能设置参数!");
              return;
            } else {
              this.dialogFormVisible2 = true;
            }

          },
          async get_j_argu() {
            if(this.selectedCategoryValue.length===3)
            {
              let res = await this.$http.get("/get_j_argu/"+this.selectedCategoryValue);
              if (res.data.status==="200")
              {
                this.j_argu_tableData=res.data.data;
                console.log("静态参数:",this.j_argu_tableData);
              }
            }
          },
          async submit_j_argu()
          {
            this.dialogFormVisible2=false;
            let obj={};
            obj.selectedarr=this.selectedCategoryValue;
            obj.name=this.add_j_argu_form.name.trim();
            obj.value=this.add_j_argu_form.value.trim();

            console.log("obj:",obj)
            let res=await this.$http.put("/add_j_argu",obj);
            if(res.data.status==="200")
            {
              this.$message.success("静态参数添加成功!");
              this.add_j_argu_form.name="";
              this.add_j_argu_form.value="";
            }

          },
          async submit_d_argu()
          {
            this.dialogFormVisible=false;
            let obj={};
            obj.selectedarr=this.selectedCategoryValue;
            obj.name=this.add_d_argu_form.name;
            obj.item=[];
            obj.item.push(this.add_d_argu_form.item1.trim());
            obj.item.push(this.add_d_argu_form.item2.trim());
            obj.item.push(this.add_d_argu_form.item3.trim());

            // obj.item[1]=this.add_d_argu_form.item2;
            // obj.item[2]=this.add_d_argu_form.item3;
            // console.log("obj.item",obj.item)
            obj.item.forEach(function(v,i){
                 if(v==="")
                 {
                   obj.item.splice(i,1);
                 }
            })
            console.log("obj:",obj)
            let res=await this.$http.put("/add_d_argu",obj);
            if(res.data.status==="200")
            {
              this.$message.success("动态参数添加成功!")
            }
          },
          handleChange()
          {
            if(1)
            {
              this.get_j_argu();
            }

          },
          async gettableData()
          {
            let res=await this.$http.get("get_d_arguments");
            if(res.data.status==="200")
            {
              this.tableData=res.data.data;
              console.log("get_d_arguments:",res.data.data);
            }
          },

          async getoptions() {
            let res = await this.$http.get("/get_options");
            if (res.data.status==="200")
            {
              this.options=res.data.data;
            }
          },

        }
    }
</script>

<style lang="scss">
  .argu-wrap
  {
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .tag_class1
    {
      margin-right: 2px;
    }
    .jilian
    {
      text-align: left;
    }
    .el-tabs__nav
    {
      height: 40px;
      padding: 0px;
      line-height: 42px;
    }
    .alert
    {
      height: 35px;
      margin-top: 10px;
      margin-bottom: 10px;
    }



  }

</style>
