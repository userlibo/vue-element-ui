<template>
    <el-card class="addgoods_wrap box-card">
      <crumbs :compath="compath"></crumbs>

      <el-alert class="alert"
        title="添加商品"
        type="success"
        center
        :closable="false"
        show-icon>
      </el-alert>

<!--      步骤条-->
      <div class="step-wrap">
        <el-steps class="step" align-center :space="200" :active="value" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
        </el-steps>
<!--  选项卡-->
<!--        <el-steps class="step" :active="1" finish-status="success" simple style="margin-top: 20px">-->
<!--          <el-step title="步骤 1" ></el-step>-->
<!--          <el-step title="步骤 2" ></el-step>-->
<!--          <el-step title="步骤 3" ></el-step>-->
<!--        </el-steps>-->

<!--        选项卡-->
      </div>
      <div class="tab-wrap">
        <el-form ref="form" :model="form"  label-width="80px">
        <el-tabs v-model="value" tab-position="left" style="height:auto;"
        @tab-click="handletabclick"
        >
          <el-tab-pane name="1" is-active label="基本信息">
            <el-form-item label="商品名称" >
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="form.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" class="cat_item">
            <!-- 级联样式表-->
<!--              {{selectedCategoryValue}}-->
              <el-cascader
                v-model="selectedCategoryValue"
                :options="options"
                :props="{ expandTrigger: 'hover',
                 lazy:false,
                 value:'id'}"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="2" label="商品参数">
            <el-form-item v-for="(item1,i) in d_argu_info.d_argu"  :key="item1.name" :label="item1.name">

              <el-checkbox-group v-model="checkList" @change="save_d_argu">
                <el-checkbox border checked  v-for="(item2,j) in item1.item" :key="j" :label="item2"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="3" label="商品属性">

            <el-form-item v-for="(item,i) in j_argu_info" :key="i" :label="item.name">
              <el-input @change="save_j_argu" v-model="item.value" ></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane name="4" label="商品图片">
            <el-form-item>
            <el-upload
              class="upload-demo"
              action="http://libo2020.oicp.io/eshop/savegoodsimgs"
              :limit="5"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"

              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="5" label="商品内容">

              <el-form-item>
                <el-row class="row_button">
                  <el-button type="primary" size="mini" @click="savegoodsinfo">点击--完成商品添加</el-button>
                </el-row>
            <quill-editor v-model="form.goods_introduce"></quill-editor>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        </el-form>

      </div>


    </el-card>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import { quillEditor } from 'vue-quill-editor'
    export default {
        name: "goods_add",
      components: {
        quillEditor
      },
      data:function () {
       return {
         fileList:[],
         checkList:[],
         options:[],
         selectedCategoryValue:[],
         value:"1",
         d_argu_info:{},
         j_argu_info:[],
         form:{
             goods_name:"",
           goods_cat:[],
           goods_cat_name:"",
           goods_price:"",
           goods_number:"",
           goods_introduce:"",
           goods_pics:[],
           attrs_argu:[],
           j_argu:[]
         },
         compath: {
           subpath1: "商品管理",
           subpath2: "商品添加"
         }
       }
      },
      created() {
        this.getoptions();
      },
      methods:{
        // upload(f) {
        //   let formData = new FormData()
        //   formData.append('file', f.file)
        //   this.$http({
        //     method: "POST",
        //     url: 'http://libo2020.oicp.io/eshop/savegoodsimgs',
        //     data: formData
        //   }).then(res => {
        //     this.form.goods_pics.push(res.data.url);
        //     console.log(this.form.goods_pics);
        //   })
        // }
        save_j_argu()
        {
          this.j_argu_info.forEach(item=>{
               let obj={};
               obj.name=item.name;
               obj.value=item.value;
               this.form.j_argu.push(obj);
          })
          console.log(this.form.j_argu);
        },
        savegoodsinfo()
        {
          this.$http.post("/create_goods_info",this.form).then(
            res=>{
              if(res.data.status==="200")
              {
                this.$message.success("商品添加成功!");
                this.$router.push({name:"goods_list"})
              }
            }
          )

        },
        handleRemove(file,fileList)
        {
          this.form.goods_pics=[];
          fileList.forEach(item=>{
            let obj={
              pic_name:"",
              pic_url:""
            };
            obj.pic_name=item.name;
            obj.pic_url=item.response.url;
            this.form.goods_pics.push(obj);
          })
          console.log("this.form.goods_pics:",this.form.goods_pics);
        },
        handleSuccess(response,file,fileList)
        {
          this.form.goods_pics=[];
          fileList.forEach(item=>{
           let obj={
              pic_name:"",
              pic_url:""
            };
              obj.pic_name=item.name;
              obj.pic_url=item.response.url;
              this.form.goods_pics.push(obj);
          })
          console.log("this.form.goods_pics:",this.form.goods_pics);
        },
        save_d_argu(v)
        {
          console.log("vv:",v);
          this.form.attrs_argu=v;
        },
        handletabclick(tab){
         // console.log(tab);
        if(tab.name==="1")
        {
          this.getoptions();
        }
        if(tab.name!=="1"&&this.selectedCategoryValue.length!==3)
        {
          this.$message.warning("请选择商品分类!");
        }
        if(tab.name==="2")
        {
          this.$http.get("/get_d_argu/"+this.selectedCategoryValue).then(res=>{
            if(res.data.status==="200") {

              this.d_argu_info=res.data.data;

              console.log("d_argu_info:",this.d_argu_info)

            }

          });
        }
        if(tab.name==="3")
        {
          this.$http.get("/get_j_argu/"+this.selectedCategoryValue).then(res=>{
            if(res.data.status==="200")
            {
              this.j_argu_info=res.data.data;
              console.log("j_argu_info:",this.j_argu_info);
            }

          })

        }

        },
        async getoptions() {
          let res = await this.$http.get("/get_options");
          if (res.data.status==="200")
          {
            this.options=res.data.data;
          }
        },
        handleChange(v){
          console.log("v:",v)
          this.$http.get("/get_options_by_ids/"+v).then(res=>{
            if(res.data.status==="200")
            {
              // console.log("类别名:",res.data.data);
              this.form.goods_cat_name=res.data.data;
              this.form.goods_cat=v;
            }
          })
        }
      }
    }
</script>

<style lang="scss">
  .addgoods_wrap
  {
    .row_button
    {
      text-align: left;
      margin-bottom: 5px;
    }
    .ql-editor
    {
      height: 400px;
      overflow: auto;
    }

    width: 100%;
    .cat_item
    {
      text-align: left;
    }
    .alert
    {
      height:35px;
      line-height: 35px;
      margin-top: 10px;
    }
    .tab-wrap
    {
      /*border: 1px solid red;*/
      margin-top: 50px;
      margin-left: 50px;
      margin-right: 50px;
      font-size:22px;
      padding-top: 30px;

      #tab-1
      {
        aria-selected:true;
      }

      .el-tabs__nav-scroll
      {
        font-size: 22px;
      }

      .el-tabs__content
      {
        /*border:1px solid red;*/
        line-height: 30px;
      }

    }
    .step-wrap{
      height:40px;
      display: flex;
      justify-content:center;
      align-items: center;
      margin-top: 20px;
      width: 100%;
      /*border: 1px solid blue;*/
      .step
      {
        text-align: center;
        /*border:1px solid red;*/
        width:90%;
        height: 35px;
        line-height: 20px;
        margin-top: 10px;
        position: relative;
        left:100px
      }
    }


  }

</style>
