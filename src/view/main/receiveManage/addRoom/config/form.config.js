const formConfig = {
  formItem: [
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
      field: 'credentials',
      label: '证件类型',
      type: 'select',
      placeholder: '请选择',
      options: [
        {
          label: '身份证',
          value: 1
        },
        {
          label: '港澳台通行证',
          value: 0
        }
      ]
    },
    {
      field: 'credentialsCode',
      label: '身份证号',
      type: 'input'
    },
    {
      field: 'address',
      label: '地址',
      type: 'input'
    },
    {
      field: 'content',
      label: '备注',
      type: 'input'
    }
  ],
  labelWidth: '70px',
  spanStyle: 8
}

export default formConfig