const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnText: '新建菜单'
  },
  tableColumns: [
    { label: '菜单名称', prop: 'name', width: 140 },
    { label: '级别', prop: 'type', width: 60 },
    { label: '菜单url', prop: 'url' },
    { label: '菜单icon', prop: 'icon', width: 140 },
    { label: '排序', prop: 'sort', width: 60 },
    { label: '权限', prop: 'permission' },
    { type: 'date', label: '创建时间', prop: 'createAt', width: 180 },
    { type: 'date', label: '更新时间', prop: 'updateAt', width: 180 },
    { type: 'operate', label: '操作', width: 130 }
  ],
  childrenTree: {
    rowKey: 'id'
  }
}

export default contentConfig
