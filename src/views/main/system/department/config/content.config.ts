const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnText: '新建部门'
  },
  tableColumns: [
    { type: 'selection', width: 55 },
    { type: 'index', label: '序号', width: 60 },

    { type: 'normal', label: '部门id', prop: 'id' },
    { type: 'normal', label: '部门名称', prop: 'name' },
    { type: 'normal', label: '部门领导', prop: 'leader' },
    { type: 'normal', label: '上级部门', prop: 'parentId' },

    { type: 'date', label: '创建时间', prop: 'createAt', width: 220 },
    { type: 'date', label: '更新时间', prop: 'updateAt', width: 220 },

    { type: 'operate', label: '操作', width: 130 }
  ]
}

export default contentConfig
