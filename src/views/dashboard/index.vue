<template>
  <div className="Echarts">
    <div id="main" style="width: 600px;height: 400px;"></div>
  </div>
</template>

<script>

import { getWeekAppointmentList } from '@/api/user'

export default {
  name: 'Echarts',
  data() {
    return {
      dates: [],
      amounts: []
    }
  },
  mounted() {
    this.myEcharts()
  },
  methods: {
    myEcharts() {
      getWeekAppointmentList().then(response => {
        this.dates = response.data.dates
        this.amounts = response.data.amounts
        this.updateChart()
      })
    },
    updateChart() {
      var myChart = this.$echarts.init(document.getElementById('main'))
      // 配置图表
      var option = {
        title: {
          text: '最近一周预约试驾情况'
        },
        tooltip: {},
        legend: {
          data: ['人数']
        },
        xAxis: {
          data: this.dates
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: this.amounts
        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style>

</style>
