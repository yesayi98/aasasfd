import dateFilter from "../filters/date.filter";

export default {
  bind: function (el, { value }) {
    el.classList.add('tooltip-able');

    let tooltip = el.dataset.tooltip;

    el.innerHTML = el.innerHTML + "<span class='tooltip-text "+ tooltip +"'>" + dateFilter(value, 'datetime') + "</span>";

  },

  unbind: function (el) {

  }
}
