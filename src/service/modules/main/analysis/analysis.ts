import hyRequest from '../../../index'

export async function getAmountList() {
  return await hyRequest.get({ url: '/goods/amount/list' })
}

export function getGoodsCategoryCount() {
  return hyRequest.get({
    url: '/goods/category/count'
  })
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

export function getGoodsCategoryFavor() {
  return hyRequest.get({
    url: '/goods/category/favor'
  })
}
