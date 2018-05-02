<template>
  <div class="vue-schedule-week">
    <table cellpadding="5">
      <thead>
      <tr>
        <td
          v-for="(week, index) in weeks"
          :key="index"
          class="week" :class="tables[index] && tables[index]['selected'] ? 'thead-selected' : ''">
          <span>{{tables[index] && tables[index]['day']}}</span>
          <span>{{' ' + week}}</span>
        </td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td
          v-for="(item, key) in tables"
          :key="key"
          :class="{'selected': item.selected, 'disabled': item.disabled}"
          @click="select(item, $event)">
          <vue-schedule-week-items :item-child="item"></vue-schedule-week-items>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import { WEEKS } from '../../utils/constants';
  import Timer from '../../utils/date'
  import { getCurrentTime } from '../../utils';
  import VueScheduleWeekItems from './item';
  export default {
    name: 'vue-schedule-week',
    props: {
      value: {
        type: [String, Array, Number, Date],
        default: function () {
          return getCurrentTime()
        }
      },
      weeks: {
        type: Array,
        default: function () {
          return WEEKS
        }
      },
      scheduleList: []
    },
    data () {
      return {
        tables: [],
        currentYear: 0, // 当前年份
        currentMonth: 0, // 当前月份
        currentWeek: 0, // 当前周数
        currentDay: 0 // 当前日期
      }
    },
    watch: {
      value () {
        this.init()
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      calcTimer () {
        if (Array.isArray(this.value) && this.value.length > 0) {
          this.currentYear = parseInt(this.value[0]);
          this.currentMonth = parseInt(this.value[1]) - 1;
          this.currentDay = parseInt(this.value[2]);
        }
      },
      init () {
        const now = new Date();
        this.currentYear = now.getFullYear();
        this.currentMonth = now.getMonth();
        this.currentDay = now.getDate();
        if (this.value.length > 0) {
          this.currentYear = parseInt(this.value[0]);
          this.currentMonth = parseInt(this.value[1]) - 1;
          this.currentDay = parseInt(this.value[2]);
        }
        this.tables = Timer(new Date(this.currentYear, this.currentMonth, this.currentDay)).getWeeks();
      },
      // 选中日期
      select (k1, k2, child, e) {
        if (e !== undefined) e.stopPropagation()
        this.currentDay = this.days[k1][k2].day
        this.today = [k1, k2]
        const clickDay = [this.currentYear, this.zero ? this.zeroPad(this.currentMonth + 1) : this.currentMonth + 1, this.zero ? this.zeroPad(this.days[k1][k2].day) : this.days[k1][k2].day]
        if (child.addAble && (!child.persons || child.persons.length === 0)) { // 只有可添加的才能触发事件
          this.$emit('select', clickDay, child)
        }
      }
    },
    components: {
      VueScheduleWeekItems
    }
  }
</script>

<style lang="scss" scoped>
  .vue-schedule-week {
    margin: auto;
    width: 100%;
    height: calc(100% - 10px);
    min-width: 300px;
    background: #fff;
    font-family: "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    user-select: none;
    table {
      clear: both;
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
      border-collapse: collapse;
      color: #444444;
      thead {
        td {
          text-transform: uppercase;
          height: 40px;
          background-color: #eef1f6;
          vertical-align: middle;
          font-size: 14px;
          pointer-events: none !important;
          cursor: default !important;
          span:nth-child(1) {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            font-weight: bold;
          }
          span:nth-child(2) {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
          }
        }
      }
      td {
        margin: 2px !important;
        padding: 0px 0;
        width: 14.28571429%;
        height: 44px;
        text-align: center;
        vertical-align: middle;
        font-size: 14px;
        line-height: 125%;
        cursor: pointer;
        vertical-align: top;
      }
      tbody {
        tr {
          td {
            border: 1px solid #dce1e5;
            .vue-schedule-items {
              border: 1px solid transparent;
              box-sizing: border-box;
            }
          }
        }
      }
    }

    .thead-selected {
      span:nth-child(1) {
        background-color: #1e9fff;
        color: #ffffff;
      }
    }

    .selected {
      background-color: #e9f6fe;
      color: #1e9fff;
      .vue-schedule-week-items {
        border: 1px solid #1e9fff;
      }
    }
  }
</style>
