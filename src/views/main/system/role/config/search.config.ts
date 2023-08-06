const searchConfig = {
  pageName: 'role',
  formItems: [
    {
      type: 'input',
      label: '角色id',
      prop: 'id',
      placeholder: '请输入角色id',
      initialVal: ''
    },
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称',
      initialVal: ''
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍',
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
