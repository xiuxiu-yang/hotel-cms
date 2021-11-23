const dialogConfig = {
  formItem: [
    {
      field: 'storey',
      label: '楼层',
      type: 'input',
    },
    {
      field: 'number',
      label: '房间号',
      type: 'input'
    },
    {
      field: 'typeId',
      label: '房间类型',
      type: 'select',
      placeholder: '请选择房间类型',
      options: []
    },
    {
      field: 'status',
      label: '房间状态',
      type: 'select',
      placeholder: '请选择房间状态',
      options: [
        {
          label: '可预约',
          value: 0
        },
        {
          label: '正在使用',
          value: 1
        },
        {
          label: '未打扫',
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
      field: 'remark',
      label: '备注',
      type: 'input'
    }
  ],
  pageTitle: '房间信息'
}

export default dialogConfig