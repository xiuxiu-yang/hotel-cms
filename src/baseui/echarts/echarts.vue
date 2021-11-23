<template>
  <div class="echarts" ref="baseEcharts" style="height: 360px; width: 100%"></div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
export default {
  props: {
    options: {
      type: Object,
      reuqired: true
    }
  },
  setup(props) {
    const baseEcharts = ref()
    onMounted(() => {
      const myEcharts = echarts.init(baseEcharts.value)
      window.addEventListener('resize', () => {
        myEcharts.resize()
      })
      watchEffect(() => {
        myEcharts.setOption(props.options)
      })
    })
    return {
      baseEcharts
    }
  }
}
</script>

<style lang="scss" scoped></style>
