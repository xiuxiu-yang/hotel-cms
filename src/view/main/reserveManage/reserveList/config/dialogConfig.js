const dialogConfig = {
  formItem: [
    {
      field: 'orderId',
      label: '订单号',
      type: 'input'
    },
    {
      field: 'userName',
      label: '用户名',
      type: 'input'
    },
    {
      field: 'phoneNumber',
      label: '手机号',
      type: 'input'
    },
    {
      field: 'gender',
      label: '性别',
      type: 'select',
      placeholder: '请选择',
      options: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 0
        }
      ]
    },
    {
      field: 'status',
      label: '房间状态',
      type: 'select',
      placeholder: '请选择',
      options: [
        {
          label: '可预约',
          value: 0
        },
        {
          label: '预约中',
          value: 1
        },
        {
          label: '已结束',
          value: 2
        }
      ]
    },
    {
      field: 'price',
      label: '房间价格',
      type: 'input'
    },
    {
      field: 'beginDate',
      label: '开始时间',
      type: 'input'
    }
  ],
  pageTitle: '订单信息'
}

export default dialogConfig