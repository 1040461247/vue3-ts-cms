import hyRequest from '../../../index'

export async function getAmountList() {
  return await hyRequest.get({ url: '/goods/amount/list' })
}

export function getGoodsCategorySale() {
  return hyRequest.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsAddressSale() {
  return hyRequest.get({
    url: '/goods/address/sale'
  })
}
