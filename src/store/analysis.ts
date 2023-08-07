import { defineStore } from 'pinia'
import {
  getAmountList,
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsAddressSale,
  getGoodsCategoryFavor
} from '@/service/modules'

interface IAnalysisStoreState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsAddressSale: any[]
  goodsCategoryFavor: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisStoreState => ({
    amountList: [],
    goodsCategorySale: [],
    goodsAddressSale: [],
    goodsCategoryCount: [],
    goodsCategoryFavor: []
  }),
  actions: {
    async fetchGetAmountListAction() {
      getAmountList().then((res) => {
        if (res.code !== 1) throw res.msg
        this.amountList = res.data
      })
      getGoodsCategoryCount().then((res) => {
        if (res.code !== 1) throw res.msg
        this.goodsCategoryCount = res.data
      })
      getGoodsCategorySale().then((res) => {
        if (res.code !== 1) throw res.msg
        this.goodsCategorySale = res.data
      })
      getGoodsAddressSale().then((res) => {
        if (res.code !== 1) throw res.msg
        this.goodsAddressSale = res.data
      })
      getGoodsCategoryFavor().then((res) => {
        if (res.code !== 1) throw res.msg
        this.goodsCategoryFavor = res.data
      })
    }
  }
})

export default useAnalysisStore
