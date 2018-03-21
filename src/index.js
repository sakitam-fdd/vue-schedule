import VueSchedule from './components';

const install = function (Vue, opts = {}) {
  Vue.component('VueSchedule', VueSchedule);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default VueSchedule
