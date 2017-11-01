require('../../css/page/vip.scss');
// 引入base
require('./base');
import { requestBuyVip } from '../util/api';

(function () {
  // 入口
  $(function () {
    renderInit();
    eventInit();
  });

  function renderInit () {
    
  }

  function eventInit () {
    $('.js-check-privacy').on('click', function () {
      $(this).toggleClass('checked');
    });
    $('.js-commit-pay').on('click', function () {
      requestBuyVip($(this), function (res) {
        window.location.href = res.pay_url;
      });
    })
  }
})()


