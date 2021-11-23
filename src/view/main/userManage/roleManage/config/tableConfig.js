const tableConfig = {
  tableItem: [
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
      prop: 'remark',
      label: '评论',
      minWidth: '100px'
    },{
      prop: 'edit',
      label: '操作',
      minWidth: '100px',
      slotName: 'edit'
    }
  ],
  pageName: 'allRole',
  pageTitle: '角色',
  showNewItem: true
}

export default tableConfig