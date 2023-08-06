const modalConfig = {
  pageName: 'department',
  title: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      type: 'input',
      label: '部门名',
      prop: 'name',
      placeholder: '请输入部门名'
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导'
    },
    {
      type: 'select',
      label: '父级部门',
      prop: 'parentId',
      options: [] as any[]
    }
  ]
}

export default modalConfig
