<template>
  <div class="ctCard">
    <el-row :gutter="12">
      <template v-for="item of cardItem" :key="item.id">
        <el-col :span="4" class="col">
          <el-card :class="item.status !== 0 ? item.status === 1 ? 'info' : 'end' : 'active'" @click="handlerCardClick(item)">
            <div>
              {{ item.number }}
              {{ item.type }}
              {{ item.storey }}
            </div>
            <div>
              价格:{{ item.price }}
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    cardItem: {
      type: Array,
      required: true
    }
  },
  emits: ['handlerCard'],
  setup(props, { emit }) {
    const handlerCardClick = (item) => {
      emit('handlerCard', item)
    }
    return {
      handlerCardClick
    }
  }
}
</script>

<style lang="less" scoped>
.ctCard {
  .col {
    margin-bottom: 20px;
    .info {
      background-color: rgb(166,169,173);
      height: 200px;
      div {
        padding-bottom: 50px;
      }
    }
    .active {
      background-color: rgb(64,158,255);
      height: 200px;
      div {
        padding-bottom: 50px;
      }
    }
    .end {
      background-color: rgb(251, 187, 69);
      height: 200px;
      div {
        padding-bottom: 50px;
      }
    }
  }
}
</style>
