/**
 * 获取当前时间戳
 * @returns {number}
 */
const getCurrentTime = () => {
  return (new Date()).getTime()
};

export {
  getCurrentTime
}
