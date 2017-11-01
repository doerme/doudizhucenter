require('../../css/page/record.scss');
// 引入base
require('./base');
(function () {
  // 入口
  $(function () {
    renderInit();
    eventInit();
  });

  function renderInit () {
    
  }

  function eventInit () {
    $('.status-item').on('click', function () {
      const $this = $(this);
      $this.addClass('selected').siblings().removeClass('selected');
      const index = $this.index();
      console.log(index);
    })
  }
})()

