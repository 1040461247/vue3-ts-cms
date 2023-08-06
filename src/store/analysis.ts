import { defineStore } from 'pinia'
import { getAmountList, getGoodsCategorySale, getGoodsAddressSale } from '@/service/modules'

interface IAnalysisStoreState {
  amountList: any[]
  goodsCategorySale: any[]
  goodsAddressSale: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisStoreState => ({
    amountList: [],
    goodsCategorySale: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchGetAmountListAction() {
      getAmountList().then((res) => {
        if (res.code !== 1) throw res.msg
        this.amountList = res.data
      })
      getGoodsCategorySale().then((res) => {
        if (res.code !== 1) throw res.msg
        this.goodsCategorySale = res.data
      })
      getGoodsAddressSale().then((res) => {
        if (res.code !== 1) throw res.msg
        this.goodsAddressSale = res.data
      })
    }
  }
})

export default useAnalysisStore
