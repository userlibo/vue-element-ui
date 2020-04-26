<template>
   <el-card class="box-card">
     <crumbs :compath="compath"></crumbs>
     <el-row><el-column :span="20"><h1>订单列表</h1></el-column><el-column :span="4">
     <el-button @click="showaddorder" type="primary">添加订单</el-button>
     </el-column></el-row>
     <el-dialog title="收货地址" :visible.sync="addorderVisible">
       <el-form :model="form">
         <el-form-item label="订单价格" :label-width="formLabelWidth">
           <el-input v-model="form.order_price" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="订单数量" :label-width="formLabelWidth">
           <el-input v-model="form.order_number" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="是否付款" :label-width="formLabelWidth">
           <el-select v-model="form.is_payed" placeholder="请选择活动区域">
             <el-option label="是" value="true"></el-option>
             <el-option label="否" value="false"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="是否发货" :label-width="formLabelWidth">
           <el-select v-model="form.is_send" placeholder="请选择活动区域">
             <el-option label="是" value="true"></el-option>
             <el-option label="否" value="false"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="选择城市" :label-width="formLabelWidth">
           {{form.city_addr}}
           <el-cascader
             v-model="form.city_addr"
             :options="options"
             :props="{ expandTrigger: 'hover' }"
             @change="handleChange"></el-cascader>
         </el-form-item>

         <el-form-item label="详细地址">
           <el-input v-model="form.detail_address" autocomplete="off"></el-input>
         </el-form-item>

       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="addorderVisible = false">取 消</el-button>
         <el-button type="primary" @click="submit_order_info">确 定</el-button>
       </div>
     </el-dialog>

<!--修改订单地址-->
     <el-dialog title="修改收货地址" :visible.sync="dialogFormVisible">
       <el-form :model="form">
         <el-form-item label="选择城市" :label-width="formLabelWidth">
           <el-cascader
             v-model="form.city_addr"
             :options="options"
             :props="{ expandTrigger: 'hover' }"
             @change="handleChange"></el-cascader>
         </el-form-item>
         <el-form-item label="详细地址" :label-width="formLabelWidth">
           <el-input v-model="form.detail_address" autocomplete="off"></el-input>
         </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="dialogFormVisible = false">取 消</el-button>
         <el-button type="primary" @click="submit_modify">确 定</el-button>
       </div>
     </el-dialog>



<!--     订单列表表格-->
     <el-table
       :data="orderdata"
       style="width: 100%">
       <el-table-column
         label="#"
         type="index"
         width="180">
       </el-table-column>
       <el-table-column
         prop="orderid"
         label="订单编号"
         width="180">
       </el-table-column>
       <el-table-column
         prop="order_price"
         label="订单价格">
       </el-table-column>
       <el-table-column
         prop="is_payed"
         label="是否付款">
         <template slot-scope="scope">
           <el-tag v-if="scope.row.is_payed">已付</el-tag>
           <el-tag v-else="scope.row.is_payed">未付</el-tag>
         </template>
       </el-table-column>
       <el-table-column
         prop="is_send"
         label="是否发货">
         <template slot-scope="scope">
           <p v-if="scope.row.is_send">已发货</p>
           <p v-else="scope.row.is_send">未发货</p>
         </template>
       </el-table-column>
       <el-table-column
         label="操作">
         <template slot-scope="scope">
         <el-button @click="showmodifydialog(scope.row)" size="mini" plain type="success" icon="el-icon-check" circle></el-button>
         </template>
       </el-table-column>
     </el-table>
   </el-card>
</template>

<script>
    import data from "../../../static/data.js"
    export default {
        name: "order",
      data:function () {
     return {
       dialogFormVisible:false,
       orderdata:[],
       form:{
         order_price:"",
         order_number:"",
         is_payed:"",
         is_send:"",
         selectedvalue:"",
         detail_address:""
       },
       selectedvalue:[],
       options:data,
       formLabelWidth:40,
       addorderVisible:false,
       tableData:[],
       compath: {
         subpath1: "订单管理",
         subpath2: "订单列表"
       }
     }
      },
      created() {
       this.get_order_info();
          },
      methods:{
        submit_modify()
        {
          this.dialogFormVisible=false;
          this.$http.put("/modify_addr",this.form).then(res=>{
            if(res.data.status==="200")
            {
              this.$message.success("收货地址修改成功!");
            }
          })
        },
        showmodifydialog(data)
        {
          this.form=data;
          this.dialogFormVisible=true;
        },
        get_order_info()
        {
            this.$http.get("/get_order_info").then(res=>{
                  if(res.data.status==="200")
                  {
                    this.orderdata=res.data.data;
                  }
            })
        },
        submit_order_info()
        {
          this.addorderVisible=false;
          this.$http.post("/add_orderlist",this.form).then(res=>{
            if(res.data.status==="200")
            {
              this.$message.success("订单添加成功!");
              this.get_order_info();
              this.form={order_price:"",
                order_number:"",
                is_payed:"",
                is_send:"",
                selectedvalue:"",
                detail_address:""};
            }
          })
        },
          handleChange()
          {

          },
          showaddorder()
          {
            this.addorderVisible=true;

          }
      }
    }
</script>

<style scoped lang="scss">
  .box-card
  {
    min-height: 400px;

  }

</style>
