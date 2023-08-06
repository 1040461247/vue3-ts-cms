const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnText: '新建角色'
  },
  tableColumns: [
    { type: 'selection', width: 55 },
    { type: 'index', label: '序号', width: 60 },

    { type: 'normal', label: '角色名', prop: 'name' },
    { type: 'normal', label: '权限介绍', prop: 'intro' },

    { type: 'date', label: '创建时间', prop: 'createAt', width: 220 },
    { type: 'date', label: '更新时间', prop: 'updateAt', width: 220 },

    { type: 'operate', label: '操作', width: 130 }
  ]
}

export default contentConfig
