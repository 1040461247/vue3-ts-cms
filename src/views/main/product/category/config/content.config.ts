const contentConfig = {
  pageName: 'category',
  header: {
    title: '分类列表',
    btnText: '新建分类'
  },
  tableColumns: [
    { label: 'id', prop: 'id' },
    { label: '类别名字', prop: 'name' },
    { type: 'date', label: '更新时间', prop: 'updateAt', width: 250 },
    { type: 'date', label: '创建时间', prop: 'createAt', width: 250 },
    { type: 'operate', label: '操作', width: 200 }
  ],
  childrenTree: {
    rowKey: 'id'
  }
}

export default contentConfig
