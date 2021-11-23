<template>
  <div class="roomOrderAnalyse">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card>
          <echarts :options="option"></echarts>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <echarts :options="barOptions"></echarts>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="secRow">
      <el-col :span="24">
        <el-card>
          <echarts :options="lineOptions"></echarts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import echarts from '@/baseui/echarts/echarts.vue'
export default {
  setup() {
    const store = useStore()
    store.dispatch('main/getGenderDataAction')
    store.dispatch('main/getOrderDataAction')
    const optionData = computed(() => {
      const arr = []
      const data = store.state.main.genderData
      for (const i in data) {
        if (i === '1') {
          arr.push({ value: data[i], name: '男' })
        } else {
          arr.push({ value: data[i], name: '女' })
        }
      }
      return arr
    })

    const option = computed(() => {
      return {
        title: {
          text: '男女比例',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '数量',
            type: 'pie',
            radius: '50%',
            data: optionData.value,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              formatter: '{b}({d}%)',
              fontWeight: 'normal',
              fontSize: 15
            }
          }
        ]
      }
    })
    const barData = computed(() => {
      const arr1 = []
      const arr2 = []
      const data = store.state.main.orderData
      for (const item of data) {
        if (item) {
          for (const i in item) {
            if (i === 'roomOrderNumber') {
              arr2.push(item[i])
            } else if (i === 'createDate') {
              arr1.push(item[i].split(' ')[0].split('-')[2])
            }
          }
        }
      }
      return {
        xAxis: arr1,
        data: arr2
      }
    })
    const barOptions = computed(() => {
      return {
        title: {
          text: '订单销量柱状图',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: barData.value.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: barData.value.data,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    })
    const lineOptions = computed(() => {
      return {
        title: {
          text: '订单销量折现图',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: barData.value.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: barData.value.data,
            type: 'line',
            areaStyle: {}
          }
        ]
      }
    })
    return {
      option,
      barOptions,
      lineOptions
    }
  },
  components: { echarts }
}
</script>

<style lang="less" scoped>
.secRow {
  margin-top: 30px;
}
</style>
