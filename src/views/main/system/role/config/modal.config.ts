const modalConfig = {
  pageName: 'role',
  title: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      label: '角色名',
      prop: 'name',
      placeholder: '请输入角色名'
    },
    {
      type: 'input',
      label: '角色介绍',
      prop: 'intro',
      placeholder: '请输入角色介绍'
    },
    {
      type: 'custom',
      slotName: 'menus'
    }
  ]
}

export default modalConfig
