const searchConfig = {
  pageName: 'goods',
  formItems: [
    { type: 'input', label: 'id', placeholder: '请输入id', prop: 'id' },
    { type: 'input', label: '商品名称', placeholder: '请输入商品名称', prop: 'name' },
    { type: 'input', label: '商品描述', placeholder: '请输入商品描述', prop: 'desc' },
    { type: 'date-picker', label: '创建时间', prop: 'createAt' }
  ]
}

export default searchConfig
