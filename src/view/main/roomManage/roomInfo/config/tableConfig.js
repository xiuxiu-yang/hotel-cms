const tableConfig = {
  tableItem: [
    {
      prop: 'storey',
      label: '楼层',
      minWidth: '80px'
    },
    {
      prop: 'number',
      label: '房间号',
      minWidth: '80px'
    },
    {
      prop: 'type',
      label: '房间类型',
      minWidth: '80px'
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
      prop: 'remark',
      label: '房间备注',
      minWidth: '120px'
    },
    {
      props: 'edit',
      label: '操作',
      minWidth: '80px',
      slotName: 'edit'
    },
  ],
  pageName: 'hotel',
  pageTitle: '房间'
}

export default tableConfig