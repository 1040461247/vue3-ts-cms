const contentConfig = {
  pageName: 'goods',
  header: {
    title: '仓库列表',
    btnText: '新建商品'
  },
  tableColumns: [
    { label: 'id', prop: 'id', width: 60 },
    { label: '商品名称', prop: 'name' },
    { label: '商品描述', prop: 'desc' },
    { label: '库存', prop: 'inventoryCount', width: 60 },
    { label: '原价', prop: 'oldPrice', width: 60 },
    { label: '现价', prop: 'newPrice', width: 60 },
    { type: 'custom', label: '图片', slotName: 'img', width: 130 },

    { type: 'date', label: '更新时间', prop: 'updateAt', width: 180 },
    { type: 'date', label: '创建时间', prop: 'createAt', width: 180 },
    { type: 'operate', label: '操作', width: 140 }
  ],
  childrenTree: {
    rowKey: 'id'
  }
}

export default contentConfig
