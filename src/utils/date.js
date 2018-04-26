import { padStart } from '../utils'

class Timer {
  static getOriginDate (params) {
    let reg;
    if (!params) return new Date();
    if (params instanceof Date) return params;
    reg = String(params).match(/^(\d{4})-?(\d{2})-?(\d{1,2})$/);
    if (reg) {
      return new Date(reg[1], reg[2] - 1, reg[3])
    }
    return new Date(params)
  }
  constructor (options) {
    /**
     * 原始时间戳
     */
    this._date = Timer.getOriginDate(options);

    /**
     * 是否为夏令时
     * 实际返回的是本地时间与 GMT 时间或 UTC 时间之间相差的分钟数
     * @type {number}
     * @private
     */
    this._zone = this._date.getTimezoneOffset() / 60;
    this._zoneStr = padStart(String(this._zone * -1).replace(/^(.)?(\d)/, '$10$200'), 5, '+')

    /**
     * 年份
     * @type {number}
     * @private
     */
    this._year = this._date.getFullYear();

    /**
     * 月份
     * @type {number}
     */
    this._month = this._date.getMonth();

    /**
     * 日期
     * @type {number}
     * @private
     */
    this._day = this._date.getDate();

    /**
     * week
     * @type {number}
     */
    this._week = this._date.getDay();

    /**
     * hours
     * @type {number}
     */
    this._hours = this._date.getHours();

    /**
     * minutes
     * @type {number}
     */
    this._minutes = this._date.getMinutes();

    /**
     * seconds
     * @type {number}
     */
    this._seconds = this._date.getSeconds();

    /**
     * 毫秒
     * @type {number}
     */
    this._ms = this._date.getMilliseconds();
  }

  /**
   * 是否闰年
   * @returns {boolean}
   */
  isLeapYear () {
    return ((this._year % 4 === 0) && (this._year % 100 !== 0)) || (this._year % 400 === 0)
  }

  /**
   * 判断时间是否相同
   * @param that
   * @returns {boolean}
   */
  isSame (that) {
    return this.valueOf() === that.valueOf()
  }

  /**
   * 判断是否为之前
   * @param that
   * @returns {boolean}
   */
  isBefore (that) {
    return this.valueOf() < that.valueOf()
  }

  /**
   * 判断是否之后
   * @param that
   * @returns {boolean}
   */
  isAfter (that) {
    return this.valueOf() > that.valueOf()
  }

  /**
   * clone time
   * @returns {Timer}
   */
  clone () {
    return new Timer(this)
  }

  /**
   * 获取原始时间戳
   * @returns {Date}
   */
  toDate () {
    return new Date(this._date);
  }

  /**
   * 转化为数组
   * @returns {*[]}
   */
  toArray () {
    return [
      this._year,
      this._month,
      this._day,
      this._hours,
      this._month,
      this._seconds,
      this._ms
    ]
  }

  /**
   * 转换为JSON
   * @returns {string}
   */
  toJSON () {
    return this._date.toISOString()
  }

  /**
   * 转换为Object
   * @returns {{years: number, months: number, date: number, hours: number, minutes: number, seconds: number, milliseconds: number}}
   */
  toObject () {
    return {
      years: this._year,
      months: this._month,
      date: this._day,
      hours: this._hours,
      minutes: this._minutes,
      seconds: this._seconds,
      milliseconds: this._ms
    }
  }
}

export default params => (new Timer(params))
