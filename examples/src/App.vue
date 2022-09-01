<template>
  <div id="app">
    <WSchedule :planList="timePeriodList" :isFirstDayOfMondayOrSunday="7" :hasNumExpend="2" @handleDetail="handleDetail" @handleCardDetail="handleCardDetail" @changeWeek="changeWeek">
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
    function getCurDay(num = 0) {
      var datetime = new Date();
      var year = datetime.getFullYear();
      var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      let day = datetime.getDate()
      if ((day + num) > 0) {
        day = (day + num) < 10 ? "0" + (datetime.getDate() + num) : datetime.getDate() + num;
      } else {
        day = (day - num) < 10 ? "0" + (datetime.getDate() - num) : datetime.getDate() - num;
      }
      return `${year}-${month}-${day}`
    }
    return {
      timePeriodList: [
        {
          timePeriod: '8:00~10:00',
          schedule: [
            {
              isExpend: false,
              [getCurDay()]: [
                {
                  timePeriod: '8:00~10:00',
                  date: getCurDay(),
                  course: '大学英语',
                  watchman: '井底的蜗牛',
                  place: '测试地点',
                  status: 1,
                },
                {
                  timePeriod: '8:00~10:00',
                  date: getCurDay(),
                  course: '大学英语',
                  watchman: '井底的蜗牛',
                  place: '测试地点',
                  status: 2,
                },
                {
                  timePeriod: '8:00~10:00',
                  date: getCurDay(),
                  course: '大学英语',
                  watchman: '井底的蜗牛',
                  place: '测试地点',
                  status: 3,
                },
              ],
            },
            {
              isExpend: false,
              [getCurDay(-1)]: [
                {
                  id: 1,
                  timePeriod: '8:00~10:00',
                  date: getCurDay(-1),
                  course: '大学英语',
                  watchman: '井底的蜗牛',
                  place: '测试地点',
                  status: 1,
                },
              ]
            }
          ]
        },
        {
          timePeriod: '12:00~14:00',
          schedule: [
            {
              isExpend: false,
              [getCurDay()]: [
                {
                  timePeriod: '12:00~14:00',
                  date: getCurDay(),
                  course: '大学英语',
                  watchman: '井底的蜗牛',
                  place: '测试地点',
                  status: 2,
                },
                {
                  timePeriod: '12:00~14:00',
                  date: getCurDay(),
                  course: '大学英语',
                  watchman: '井底的蜗牛',
                  place: '测试地点',
                  status: 3,
                },
              ],
            },
            {
              isExpend: false,
              [getCurDay(-1)]: [
                {
                  timePeriod: '12:00~14:00',
                  date: getCurDay(-1),
                  course: '大学英语',
                  watchman: '井底的蜗牛',
                  place: '测试地点',
                  status: 1,
                },
                {
                  timePeriod: '实验室1',
                  date: getCurDay(-1),
                  course: '大学英语',
                  watchman: '井底的蜗牛',
                  place: '测试地点',
                  status: 1,
                },
                {
                  timePeriod: '实验室1',
                  date: getCurDay(-1),
                  course: '大学英语',
                  watchman: '井底的蜗牛',
                  place: '测试地点',
                  status: 1,
                },
              ]
            }
          ]
        },
        {
          timePeriod: '14:00~16:00',
          schedule: []
        },
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
