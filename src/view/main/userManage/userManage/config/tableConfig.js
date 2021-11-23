const tableConfig = {
  tableItem: [
    {
      prop: 'name',
      label: '姓名',
      minWidth: '80px'
    },
    {
      prop: 'gender',
      label: '性别',
      minWidth: '80px',
      slotName: 'gender'
    },
    {
      prop: 'phoneNumber',
      label: '手机号',
      minWidth: '100px'
    },
    {
      prop: 'loginAccount',
      label: '登入账号',
      minWidth: '80px'
    },
    {
      prop: 'roleName',
      label: '角色名',
      minWidth: '80px'
    },
    {
      prop: 'createDate',
      label: '创建时间',
      minWidth: '120px'
    },
    {
      props: 'edit',
      label: '操作',
      minWidth: '80px',
      slotName: 'edit'
    },
  ],
  pageName: 'userList',
  pageTitle: '用户',
  showNewItem: false
}

export default tableConfig