const tableConfig = {
  tableItem: [
    {
      prop: 'orderId',
      label: '订单号',
      minWidth: '120px'
    },
    {
      prop: 'userName',
      label: '用户名',
      minWidth: '80px'
    },
    {
      prop: 'phoneNumber',
      label: '手机号',
      minWidth: '100px'
    },
    {
      prop: 'gender',
      label: '性别',
      minWidth: '60px',
      slotName: 'gender'
    },
    {
      prop: 'status',
      label: '房间状态',
      minWidth: '80px',
      slotName: 'status'
    },
    {
      prop: 'price',
      label: '房间价格',
      minWidth: '80px'
    },
    {
      prop: 'beginDate',
      label: '开始时间',
      minWidth: '120px'
    },
    {
      props: 'edit',
      label: '操作',
      minWidth: '80px',
      slotName: 'edit'
    }
  ],
  pageName: 'roomOrder',
  pageTitle: '订单',
  showNewItem: false
}

export default tableConfig