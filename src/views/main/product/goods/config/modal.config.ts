const modalConfig = {
  pageName: 'goods',
  title: {
    newTitle: '新建商品',
    editTitle: '编辑商品'
  },
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      label: '商品描述',
      prop: 'desc',
      placeholder: '请输入商品描述'
    },
    {
      type: 'input',
      label: '库存',
      prop: 'inventoryCount',
      placeholder: '请输入库存'
    },
    {
      type: 'input',
      label: '原价',
      prop: 'oldPrice',
      placeholder: '请输入原价'
    },
    {
      type: 'input',
      label: '现价',
      prop: 'newPrice',
      placeholder: '请输入现价'
    },
    {
      type: 'custom',
      label: '图片',
      slotName: 'img'
    }
  ]
}

export default modalConfig
