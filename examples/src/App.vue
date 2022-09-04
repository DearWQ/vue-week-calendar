<template>
  <div id="app">
    <WSchedule :planList="timePeriodList" :isFirstDayOfMondayOrSunday="7" @handleDetail="handleDetail" @handleCardDetail="handleCardDetail" @changeWeek="changeWeek">
      <template v-slot:thing="{row}">
        <span>时段：{{ row.timePeriod }}</span>
        <span>课程：{{ row.course }}</span>
        <span>值班员：{{ row.watchman }}</span>
        <span>地点：{{ row.place }}</span>
      </template>
    </WSchedule>
  </div>
</template>

<script>

// import Vue from 'vue'
// import WSchedule from 'wschedule'
// import "wschedule/dist/wschedule.css";
// Vue.use(WSchedule)
import WSchedule from '../../src/components/weekSchedule'
export default {
  name: 'App',
  components: {
    WSchedule,
  },
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
