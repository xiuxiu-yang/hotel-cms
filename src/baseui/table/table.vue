<template>
  <div class="ctTable">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-table :data="tableData" border row-key="id" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <template v-for="item in tableItem" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row" :index="scope.$index">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class=".table-footer">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    tableItem: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const checkIdList = ref([])
    const handleSelectionChange = (val) => {
      checkIdList.value = val.map((item) => item.id)
    }
    return {
      handleSelectionChange,
      checkIdList
    }
  }
}
</script>

<style lang="less" scoped>
.ctTable {
  .header {
    height: 45px;
  }
  .el-table {
    .el-table-column {
      height: 40px;
    }
  }
  .table-footer {
    padding-top: 20px;
    .el-pagination {
      text-align: right;
    }
  }
}
</style>
