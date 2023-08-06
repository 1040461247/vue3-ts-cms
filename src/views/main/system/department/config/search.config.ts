const searchConfig = {
  pageName: 'department',
  formItems: [
    {
      type: 'input',
      label: '部门id',
      prop: 'id',
      placeholder: '请输入部门id',
      initialVal: ''
    },
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称',
      initialVal: ''
    },
    {
      type: 'date-picker',
      label: '创建时间',
      prop: 'createAt'
    }
  ]
}

export default searchConfig
