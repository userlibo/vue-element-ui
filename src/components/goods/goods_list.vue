<template>
    <el-card class="box-card">
      <crumbs :compath="compath"></crumbs>
      <el-button type="primary" @click="toaddgoods">添加商品</el-button>

<!--      商品列表-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="#"
          type="index"
          width="180">
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="goods_cat_name"
          label="商品类别">
        </el-table-column>
        <el-table-column
          prop="goods_number"
          label="商品库存">
        </el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格">
        </el-table-column>
        <el-table-column
          label="操作">

          <template slot-scope="scope">
            <el-row>
              <el-col :span="8">
                <el-button type="primary"@click="showedit(scope.row)" size="mini" plain circle icon="el-icon-edit"></el-button>
              </el-col><el-col :span="8">
              <el-button type="warning" size="mini" @click="del_goods(scope.row.userid)" plain circle icon="el-icon-delete"></el-button>
            </el-col><el-col :span="8">
              <el-button type="success" size="mini" plain circle icon="el-icon-check" @click="show_goods_dialog(scope.row)"></el-button>
            </el-col>
            </el-row>
          </template>



        </el-table-column>
      </el-table>

<!--分页-->
      <el-pagination
        class="page"
        small
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>


    </el-card>
</template>

<script>
  import crumbs from "../custom/crumbs";
    export default {
        name: "goods_list",
        data:function () {
          return {
            tableData:[],
            total:1,
            compath: {
              subpath1: "商品管理",
              subpath2: "商品列表"
            }
          }

        },
      created() {
          this.getgoodslist();
      },
      methods: {
          showedit()
          {},
          del_goods()
          {},
          show_goods_dialog()
          {
          },
          getgoodslist()
          {
              this.$http.get("/getgoodslist").then(res=>{
                if(res.data.status==="200")
                {
                  this.tableData=res.data.data;
                  this.total=res.data.total
                }
              })
          },
         toaddgoods()
         {
           this.$router.push({name:"goods_add"})
         }
        },
      components:{
          crumbs
      }
    }
</script>

<style scoped lang="scss">
  .page
  {
    margin-top: 10px;
  }

</style>
