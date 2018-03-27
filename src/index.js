import VueSchedule from './components';
import VueScheduleWeek from './components/week'

const components = [
  VueSchedule,
  VueScheduleWeek
];

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  ...components
};

module.exports.default = module.exports;
