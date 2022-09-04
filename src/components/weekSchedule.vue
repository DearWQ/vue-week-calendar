<template>
  <div class="course-week">
    <div class="week-top">
      <div class="week-btn-wrap">
        <span @click="getLastWeek">上周</span>
        <span @click="getCurWeek">本周</span>
        <span @click="getNextWeek">下周</span>
      </div>
      <span class="w-today-date"> {{ todayDate }}</span>
      <div class="w-choose-status">
        <div v-for="sta in cardStatus">
          <span class="square" :style="{background:sta.color}"></span>
          <span class="title">{{ sta.title }}</span>
        </div>
      </div>
    </div>
    <div class="week-table">
      <div class="table-header">
        <div class="table-week">
          <template v-for="(item,index) of weeks">
            <span class="w-first" v-if="index===0" :key="index">{{ item }}</span>
            <span v-else :key="index">{{ item }}</span>
          </template>
        </div>
        <div class="w-table-date">
          <template v-for="(item,index) of months">
            <span class="w-first" v-if="index===0" :key="index">
            </span>
            <template v-else>
              <span :key="index" class="w-day-item" :class="{'w-isCurDate':item&&item.isCurDate}">
                {{ `${item && item.isCurDate ? item && item.showDate + '(今天)' || '' : item && item.showDate || ''}` }}
              </span>
            </template>
          </template>
        </div>
      </div>
      <div class="w-time-period-list">
        <ul class="w-time-period-row">
          <!--循环时段，看时段有多少个-->
          <template v-if="planList.length>0">
            <li class="w-time-period-col" v-for="(period,p_index) in planList"
                :key="`period${p_index}`">
              <!--第一列显示时段-->
              <div class="w-time-period"> {{ period.timePeriod }}</div>
              <!-- 后面显示周一到周日的计划-->
              <div class="w-row-day">
                <!-- 循环显示每周的日期-->
                <template v-for="(month,m_index) of months">
                  <!-- v-if="month" 去除数据处理的时候移除数组第一个为empty的问题-->
                  <div v-if="month" :key="`month${m_index}`" class="w-things" @click="handleCardDetail(month,period)">
                    <!-- 循环每个时间段的计划-->
                    <template v-for="(row,t_index) of period.schedule">
                      <!-- 根据日期和计划的日期匹配 显示 然后根据状态显示进行中 已过期 未开始-->
                      <template v-if="!period.isExpend">
                        <div v-if="row.date===month.date&&t_index<2"
                             :key="`thing${t_index}`"
                             class="w-thing-item"
                             @click="handleDetail(row)"
                             :style="{background: cardStatus[row.status].color}">
                          <slot name="thing" :row="row"></slot>
                        </div>
                      </template>
                      <template v-if="period.isExpend">
                        <div v-if="row.date===month.date"
                             :key="`thing${t_index}`"
                             class="w-thing-item"
                             @click="handleDetail(row)"
                             :style="{background: cardStatus[row.status].color}">
                          <slot name="thing" :row="row"></slot>
                        </div>
                      </template>
                      <div class="w_expand"
                           v-if="period.schedule.length>2&&(period.schedule.length-1)===t_index&&!period.isExpend&&row.date===month.date"
                           @click="handleExpand(period)">展开
                      </div>
                      <div class="w_shrink"
                           v-if="period.schedule.length>2&&(period.schedule.length-1)===t_index&&period.isExpend&&row.date===month.date"
                           @click="handleExpand(period)">收缩
                      </div>
                    </template>

                  </div>
                </template>
              </div>
            </li>
          </template>
          <div class="w-noMore" v-else><span>暂无数据</span></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate, getCurDay } from '../utils/MyTools'

export default {
  name: 'WSchedule',
  props: {
    planList: {
      type: Array,
      default: []
    },
    cardStatus: {
      type: Object,
      default: () => {
        return {
          1: {
            title: '已过期',
            color: '#9CADADB7'
          },
          2: {
            title: '进行中',
            color: '#FF6200'
          },
          3: {
            title: '未开始',
            color: '#3291F8'
          },
        }
      }
    },
    isFirstDayOfMondayOrSunday: {
      type: Number,
      default: 1,
    }
  },
  data () {
    return {
      weeks: [
        '时段', '周一', '周二', '周三', '周四', '周五', '周六', '周日',
      ],
      todayDate: '',
      months: [],
      curDate: '',
      nowDate: new Date(),
    }
  },
  watch: {
    isFirstDayOfMondayOrSunday: {
      handler (val) {
        if (val > 1) {
          let arr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          const arr1 = arr.slice(val - 1)
          const arr2 = arr.slice(0, val - 1)
          this.weeks = ['时段', ...arr1, ...arr2]
          console.log('周排列', this.weeks)

        }
      },
      immediate: true
    }
  },
  mounted () {
    this.getCurWeek()
  },
  methods: {
    //展开与缩放操作
    handleExpand (row) {
      row.isExpend = !row.isExpend
    },
    /**
     * 获取 时间
     * @param time
     */
    getWeek (time) {
      this.curDate = new Date(time)
      //当前是周几
      const whichDay = time.getDay()
      let num = 0
      if (this.isFirstDayOfMondayOrSunday <= whichDay) {
        num = this.isFirstDayOfMondayOrSunday
      } else {
        num = this.isFirstDayOfMondayOrSunday - 7
      }
      const weekDay = time.getDay() - num
      time = this.addDate(time, weekDay * -1)
      for (let i = 0; i < 7; i++) {
        const { year, month, day } = formatDate(i === 0 ? time : this.addDate(time, 1))
        this.months.push({
          date: `${year}-${month}-${day}`,
          showDate: `${month}-${day}`,
          timestamp: new Date(`${year}-${month}-${day}`).getTime()
        })
      }
      this.months.sort((a, b) => a.timestamp - b.timestamp)
      delete this.months[0]
      this.todayDate = `${this.months[1].date} ~ ${this.months[this.months.length - 1].date}`
    },
    /**
     * 处理日期
     * @param date
     * @param n
     * @returns {*}
     */
    addDate (date, n) {
      date.setDate(date.getDate() + n)
      return date
    },
    /**
     * 上周
     */
    getLastWeek () {
      const date = this.addDate(this.curDate, -7),
          { year, month, day } = formatDate(date),
          dateObj = {
            date: `${year}-${month}-${day}`,
            timestamp: new Date(`${year}-${month}-${day}`).getTime()
          }
      this.dealDate(date)
      this.$emit('changeWeek', dateObj)
    },
    /**
     * 本周
     */
    getCurWeek () {
      const { year, month, day } = formatDate(new Date()),
          dateObj = {
            date: `${year}-${month}-${day}`,
            timestamp: new Date(`${year}-${month}-${day}`).getTime()
          }
      this.dealDate(new Date())
      this.$emit('changeWeek', dateObj)
    },
    /**
     * 下周
     */
    getNextWeek () {
      const date = this.addDate(this.curDate, 7),
          { year, month, day } = formatDate(date),
          dateObj = {
            date: `${year}-${month}-${day}`,
            timestamp: new Date(`${year}-${month}-${day}`).getTime()
          }
      this.dealDate(date)
      this.$emit('changeWeek', dateObj)
    },
    /**
     * 显示当天日期状态
     * @param date
     */
    dealDate (date) {
      this.months = ['']
      this.getWeek(date)
      const curDate = getCurDay()
      this.months.forEach(item => {
        item.isCurDate = item.date === curDate
      })
    },
    /**
     * 点击卡片子内容查看详情
     * @param row
     */
    handleDetail (row) {
      this.$emit('handleDetail', row)
    },
    /**
     * 点击卡片查看全部内容
     * @param month
     * @param period
     */
    handleCardDetail (month, period) {
      this.$emit('handleCardDetail', { ...month, ...period })
    }
  }
}
</script>

<style>
ul {
  list-style: none;
}

ul, li {
  margin: 0;
  padding: 0;
}

.course-week {
  width: 100%;
  border: 1px solid #ddd;
  padding: 1%;
  box-sizing: border-box;
}

.week-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 1%;
  box-sizing: border-box;

}

.week-top .week-btn-wrap {
  width: 200px;
  display: flex;
  justify-content: space-around;
  color: #409EFF;
}

.week-top .week-btn-wrap span {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}

.w-today-date {
  font-weight: bold;
  font-size: 16px;
}

.w-choose-status {
  display: flex;
  justify-content: flex-end;
  width: 200px;
}

.w-choose-status > div {
  width: 100%;
  flex: 1;
  display: flex;
  padding: 0 2%;
  white-space: nowrap;
  line-height: 20px;
  box-sizing: border-box;
}

.w-choose-status > div .square {
  display: flex;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  box-sizing: border-box;
}

.w-choose-status > div .title {
  display: flex;
  align-items: center;
  line-height: 16px;
  padding-left: 4px;
  font-size: 14px;
  box-sizing: border-box;
}


.week-table {
  display: flex;
  flex-direction: column;
}

.week-table .table-header {
  width: 100%;
  height: 80px;
  background: #EAEDF2;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #EAEDF2;
  box-sizing: border-box;
}

.table-header .w-table-date, .table-week {
  width: 100%;
  height: 40px;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;

}

.table-header .w-table-date > span, .table-week > span {
  flex: 1;
  color: #000;
  height: 100%;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}


.w-table-date .w-day-item, .table-week .w-day-item {
  color: #000;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.week-table .w-time-period-list {
  width: 100%;
}

.w-time-period-list .w-time-period-row {
  width: 100%;
  min-height: 60px;
}

.w-time-period-col {
  width: 100%;
  min-height: 60px;
  display: flex;
}

.w-time-period-col .w-time-period {
  width: 12.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #EAEDF2;
  border-bottom: 1px solid #EAEDF2;
  box-sizing: border-box;
}

.w-time-period-col .w-row-day {
  width: 87.5%;
  display: flex;
  justify-content: center;
}

.w-row-day .w-things {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #EAEDF2;
  border-bottom: 1px solid #EAEDF2;
  box-sizing: border-box;
}

.w-row-day .w-things:last-child {
  border-right: 1px solid #EAEDF2;
}

.w-things .w-thing-item {
  display: flex;
  width: 80%;
  font-size: 14px;
  flex-direction: column;
  justify-content: space-around;
  min-height: 90px;
  border-radius: 10px;
  margin: 2% 1%;
  padding: 1% 2%;
  cursor: pointer;
  color: #fff;
  background: #FF6200;
  box-sizing: border-box;
  transition: all 1s linear .5s;
}


.w-isCurDate {
  color: #FF2525 !important;
}

.w-noMore {
  min-height: 200px;
  padding: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(156, 173, 173, 0.3);
  color: #9CADADB7;
  box-sizing: border-box;
}

.w_expand, .w_shrink {
  color: #0A98D5;
  cursor: pointer;
  width: 100%;
  padding: 2% 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>