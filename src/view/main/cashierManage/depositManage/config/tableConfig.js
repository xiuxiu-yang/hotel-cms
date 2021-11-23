const tableConfig = {
  tableItem: [
    {
      prop: 'orderId',
      label: '订单号',
      minWidth: '150px'
    },
    {
      prop: 'userName',
      label: '用户名',
      minWidth: '80px'
    },
    {
      prop: 'gender',
      label: '性别',
      minWidth: '60px',
      slotName: 'gender'
    },
    {
      prop: 'phoneNumber',
      label: '联系电话',
      minWidth: '100px'
    },
    {
      prop: 'credentialsCode',
      label: '证件号',
      minWidth: '200px'
    },
    {
      prop: 'address',
      label: '地址',
      minWidth: '120px'
    },
    {
      prop: 'roomType',
      label: '房间类型',
      minWidth: '100px'
    },
    {
      prop: 'deposit',
      label: '押金',
      minWidth: '80px'
    },
    {
      prop: 'content',
      label: '内容',
      minWidth: '80px'
    },
    {
      prop: 'edit',
      label: '操作',
      minWidth: '80px',
      slotName: 'edit'
    }
  ],
  pageName: 'returnDeposit',
  pageTitle: '押金',
  showNewItem: false,
  editText: '退还押金'
}

export default tableConfig