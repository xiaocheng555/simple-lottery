
<script lang="tsx">
import { toPx, rAF } from "@/utils"
import tween from "@/utils/tween"
import { computed, ref } from "vue"
import usePrizeList, { PrizeSize } from './usePrizeList'

export default {
  name: 'home',
  setup () {
    const { prizeList, avgCells } = usePrizeList() // 奖品列表
    const activeIndex = ref<number>(-1)
    const listStyle = computed(() => {
      if (avgCells.value) {
        return {
          width: toPx(avgCells.value * PrizeSize),
          height: toPx(avgCells.value * PrizeSize)
        }
      }
    })
    
    const increaseActiveIndex = () => {
      if (activeIndex.value >= prizeList.value.length - 1) {
        activeIndex.value = 0
      } else {
        activeIndex.value++ 
      }
    }
    
    // 开始抽奖
    const runLottery = () => {
      const hitNum = Math.random() // 随机抽取一个中奖数字
      const hitIndex = findPrizeByHitNumber(hitNum) // 找到抽中的奖品
      if (hitIndex === -1) return  // 基本不会出现
      
      playLotteryAmin(hitIndex) // 执行抽奖动画
    }
    
    let timer: any
    const playLotteryAmin = (hitIndex: number) => {
      const idx = prizeList.value.length - 1 
      const slowAminWalk = 8
      
      linearAmin(() => {
        slowAmin()
      })
      
      // 开始匀速运动
      function linearAmin (callback?: Function) {
        timer && clearInterval(timer)
        let currCount = 0
        timer = setInterval(() => {
          currCount++
          increaseActiveIndex()
          
          // 至少两圈
          if (currCount > idx * 2) {
            // 与命中的值差n时才做减速运动
            if (activeIndex.value + slowAminWalk === hitIndex || activeIndex.value - idx - 1 + slowAminWalk === hitIndex) {
              // 结束匀速运动
              timer && clearInterval(timer)
              callback && callback()
            }
          }
        }, 50)
      }
      
      // 减速运动
      function slowAmin () {
        const duration = 1500 // 动画持续时间
        const beginTime = Date.now() // 开始时间
        let count = 0
        
        const aminFn = () => {
          const progress = (Date.now() - beginTime) / duration // 进度
          const x = slowAminWalk * tween.easeOutCirc(progress) // 当前位移
          
          if (Math.floor(x) !== count) {
            increaseActiveIndex()
            count = Math.floor(x)
          }
          if (progress < 1) {
            rAF(aminFn)
          } else {
            activeIndex.value = hitIndex
          }
        }
        rAF(aminFn)
      }
    }
    
    // 根据中奖数字找到对应奖品
    const findPrizeByHitNumber = (num: number) => {
      return prizeList.value.findIndex(prize => (num >= prize.from && num <= prize.to))
    }
    
    return () => (
      <div class="home">
        <div class="prize-list-wrap" style={listStyle.value}>
          <div class="prize-list">
            {
              prizeList.value.map((prize, index) => (
                <div 
                  class={ [index === activeIndex.value ? 'active' : '', 'prize-item'] }
                  style={{ 
                    left: toPx(prize.x),
                    top: toPx(prize.y), 
                    width: toPx(prize.w),
                    height: toPx(prize.h)
                  }}>
                  <div class="prize-item-inner">
                    <div class="prize-item-container">
                      <p class="prize-item-name">{ prize.name }</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <button onClick={runLottery}>开始抽奖</button>
        {activeIndex.value}
      </div>
    )
  }
}
</script>

<style lang="less">
body {
  background: #FFD7A2;
}
</style>

<style lang="less" scoped>
.home {
  height: 100%;
}
.prize-list-wrap {
  margin: 0 auto;
  margin-top: 100px;
  padding: 10px;
  border: 4px solid #F2A775;
  border-radius: 30px;
  background-color: #FECC95;
}
.prize-list {
  position: relative;
}
.prize-item {
  box-sizing: border-box;
  position: absolute;
  padding: 2px;
  &.active {
    .prize-item-inner {
      border: 4px solid #FBEB69;
      background: rgba(255, 255, 255, .8);
    }
  }
}
.prize-item-inner {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  text-align: center;
  line-height: 100%;
  background: rgba(255, 255, 255, .5);
}
.prize-item-container {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
}
.prize-item-name {
  font-size: 16px;
  color: #999;
  font-weight: 600;
}
</style>