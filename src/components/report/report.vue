<template>
    <el-card class="box-card">
      <crumbs :compath="compath"></crumbs>
      <h1>图表展示</h1>
      <div id="main"></div>
    </el-card>
</template>

<script>
  const echarts=require("echarts");
    export default {
        name: "report",
      data:function () {
         return {
           compath: {
             subpath1: "数据统计",
             subpath2: "数据报表"
           }
         }
      },
      mounted() {
          this.useEchart();
      },
      methods:{
          useEchart()
          {
            let myChart=echarts.init(document.getElementById("main"));
            myChart.setOption({
              title: {
                text: 'ECharts 入门示例'
              },
              tooltip: {},
              xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
              },
              yAxis: {},
              series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
              }]
            });

          }

      }
    }
</script>

<style scoped lang="scss">
  .box-card
  {
    min-height: 400px;
    #main
    {
      height: 400px;
      height: 400px;
      margin: 20px;
    }
  }

</style>
