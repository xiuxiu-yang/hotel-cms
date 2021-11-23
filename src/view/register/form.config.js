const formConfig = {
  formItem: [
    {
      field: 'loginAccount',
      label: '账号',
      placeholder: '账号',
      type: 'input',
      rules: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          pattern: /^[a-zA-Z0-9_-]{4,16}$/,
          message: '请输入正确的账号',
          trigger: 'blur'
        }
      ]
    },
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
        }
        // },
        // {
        //   pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
        //   message: '请输入正确的手机号',
        //   trigger: 'blur'
        // }
      ]
    },
    {
      field: 'name',
      label: '姓名',
      placeholder: '姓名',
      type: 'input',
      rules: [
        {
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        },
        // {
        //   pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
        //   message: '请输入至少两位汉字',
        //   trigger: 'blur'
        // }
      ]
    },
    {
      field: 'password',
      label: '密码',
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
      field: 'gender',
      label: '性别',
      placeholder: '性别',
      type: 'select',
      options: [
        {
          value: 1,
          label: '男'
        },
        {
          value: 0,
          label: '女'
        }
      ],
      rules: [
        {
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'checkCode',
      label: '验证码',
      placeholder: '验证码',
      type: 'input',
      rules: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }
      ]
    }
  ],
  formTitle: '注册账号',
  formFooter: '注册',
  showBtn: true,
  labelWidth: '70px',
  pageName: 'register'
}

export default formConfig