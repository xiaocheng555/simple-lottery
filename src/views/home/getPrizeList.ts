import { loadExcelFile } from "@/utils"
import { computed, ref } from "vue"
import { WorkBook, utils } from "xlsx"

export interface PrizeItem {
  name: string,
  frequency: number,
  x: number,
  y: number,
  w: number,
  h: number,
  rate?: number,
  from: number,
  to: number,
}

interface xlsxItem {
  中奖频率?: number | string,
  奖品名称?: string
}

export const PrizeSize = 100

// 适配数据
function adapterPrizeList (list: xlsxItem[]): PrizeItem[] {
  let result = list.map(item => {
    let frequency = Number(item.中奖频率)
    if (Number.isNaN(frequency)) {
      frequency = 0
    }
    return {
      name: item.奖品名称 || '',
      frequency: frequency,
      w: PrizeSize,
      h: PrizeSize,
      x: 0,
      y: 0,
      from: 0,
      to: 0
    }
  })
  result = calcPrizePos(result)
  setPrizeRate(result)
  return result
}

// 计算位置
function calcPrizePos (data: PrizeItem[]) {
  // 每条边的格子数
  const cells = Math.floor(data.length / 4)
  let currLen = 0
  let i = 0
  let j = 0
  while (currLen < cells * 4) {
    const item = data[currLen++]
    if (item) {
      // 计算x、y轴位置
      item.y = i * PrizeSize
      item.x = j * PrizeSize
    }

    if (i === 0 && j < cells) { // 左上角到右上角
      j++
    } else if (j === cells && i < cells) { // 右上角到右下角
      i++
    } else if (i === cells && j > 0) { // 右下角到左下角
      j--
    } else if (j === 0 && i >= 0) { // 左下角到左上角
      i--
    }
  }
  return data.slice(0, currLen)
}

// 设置中奖概率
function setPrizeRate (data: PrizeItem[]) {
  let totalFrequency = 0
  for (let i = 0; i < data.length; i++) {
    totalFrequency += data[i].frequency
  }
  
  for (let i = 0; i < data.length; i++) {
    let prev = data[i - 1]
    let curr = data[i]
    
    curr.rate = curr.frequency / totalFrequency
    curr.from = !prev ? 0 : prev.to
    curr.to = curr.from + curr.rate
  }
}

export default function getPrizeList (callback?: Function) {
  loadExcelFile('./public/files/data.xlsx', (res: WorkBook) => {
    const list: xlsxItem[] = utils.sheet_to_json(res.Sheets[res.SheetNames[0]])
    const prizeList = adapterPrizeList(list)
    callback && callback({
      prizeList,
      avgCells: Math.floor(prizeList.length / 4) + 1
    })
  })
}