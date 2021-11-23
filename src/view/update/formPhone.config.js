const formConfig = {
  formItem: [
    {
      field: 'phoneNumber',
      label: '手机号',
      placeholder: '手机号',
      type: 'input',
      rules: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          pattern: /^[a-zA-Z0-9_-]{4,16}$/,
          message: '请输入正确的手机号',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'newPassword',
      label: '新密码',
      placeholder: '密码',
      type: 'password',
      rules: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          pattern: /^[a-zA-Z0-9]{6,16}$/,
          message: '请输入正确的密码',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'confirmPassword',
      label: '新密码',
      placeholder: '请再输入一遍新密码',
      type: 'password',
      rules: []
    },
    {
      field: 'checkCode',
      label: '验证码',
      placeholder: '验证码',
      type: 'input',
      rules: []
    }
  ],
  formTitle: '修改密码',
  formFooter: '确认修改',
  showBtn: true,
  labelWidth: '70px',
  formUrl: 'phone',
  footerName: '密码',
  pageName: 'update'
}

export default formConfig