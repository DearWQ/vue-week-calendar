# wschedule 周日程

## components setup
```
npm i wschedule -S
```

### components use
``` html
<template>
  <div id="app">
    <WSchedule :planList="timePeriodList" :isFirstDayOfMondayOrSunday="5" @handleDetail="handleDetail" @handleCardDetail="handleCardDetail" @changeWeek="changeWeek">
      <template v-slot:thing="{row}">
        <span>时段：{{ row.timePeriod }}</span>
        <span>课程：{{ row.course }}</span>
        <span>值班员：{{ row.watchman }}</span>
        <span>地点：{{ row.place }}</span>
      </template>
    </WSchedule>
  </div>
</template>
```
``` javascript
<script>
import Vue from 'vue'
import WSchedule from 'wschedule'
import "wschedule/dist/wschedule.css";
Vue.use(WSchedule)
export default {
  data() {
    /**
     * 获取当天时间
     * @returns {string}
     */
    function getCurDay(){
      var datetime = new Date();
      var year = datetime.getFullYear();
      var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      return `${year}-${month}-${date}`
    }
    return {
      timePeriodList: [
        {
          timePeriod: '08:00~10:00',
          isExpend:false,
          schedule: [
            {
              timePeriod: '08:00~10:00',
              date: getCurDay(),
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 1,
            }, {
              timePeriod: '08:00~10:00',
              date: getCurDay(),
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 1,
            }, {
              timePeriod: '08:00~10:00',
              date: getCurDay(),
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 1,
            }, {
              timePeriod: '08:00~10:00',
              date: getCurDay(),
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 1,
            }, {
              timePeriod: '08:00~10:00',
              date: getCurDay(),
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 1,
            }, {
              timePeriod: '08:00~10:00',
              date: getCurDay(),
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 1,
            },
            {
              date: getCurDay(),
              timePeriod: '08:00~10:00',
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 2,
            },
            {
              date: getCurDay(),
              timePeriod: '08:00~10:00',
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 3,
            }

          ]
        },
        {
          timePeriod: '10:00~12:00',
          isExpend:false,
          schedule: [
            {
              timePeriod: '10:00~12:00',
              date: getCurDay(),
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 1,
            },
            {
              date: getCurDay(),
              timePeriod: '10:00~12:00',
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 2,
            },
            {
              date: getCurDay(),
              timePeriod: '10:00~12:00',
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 3,
            }

          ]
        },
        {
          timePeriod: '14:00~16:00',
          isExpend:false,
          schedule: [
            {
              timePeriod: '14:00~16:00',
              date: getCurDay(),
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 1,
            },
            {
              date: getCurDay(),
              timePeriod: '14:00~16:00',
              course: '大学英语',
              watchman: 'wqq',
              place: 'ces',
              status: 2,
            },

          ]
        }
      ],
    }
  },
  methods: {
    /**
     * 点击详情
     * @param row
     */
    handleDetail(row){
      console.log(row)
    },
    /**
     * 点击卡片查看全部内容
     */
    handleCardDetail(row) {
      console.log(row)
    },
    /**
     * 切换周
     * @param date
     */
    changeWeek(date){
      console.log(date)
    }
  },
  }
</script>
```

### Attributes
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|data|显示数据：timePeriod:必须存在的字段；schedule：必须存在{内容：date为日期必须存在且格式为2022-01-29}|Array|--|--
|cardStatus|卡片内容对应状态信息颜色：title对应状态 color对应背景颜色|Object|--|{1: {title: '已过期',color: '#8E8E93'},2: { title: '进行中',color: '#FF6200'},3: {title: '未开始',color: '#3291F8'},}
|isFirstDayOfMondayOrSunday|第一天显示的是周几|Number|--|1: 周一,2: 周二,3: 周三,4: 周四,5: 周五,6: 周六,7: 周日,|
### Events
|名字|说明|类型|可选值|默认值|
|---|---|---|---|---|
|handleDetail|查看每个卡片日程详情|function|--|--
|handleCardDetail|查看每个卡片全部信息|function|--|--
|changeWeek|通过切换周改变日期|function|--|--

### slot 
|name|说明
|---|---|
|thing|卡片内容
 