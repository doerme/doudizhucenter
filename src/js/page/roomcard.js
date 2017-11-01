require('../../css/page/roomcard.scss')
// 引入base
require('./base');
import Toast from '../components/toast';
import { requestCreateCard } from '../util/api';
import { parseQuery } from '../util';

(function () {
  let totalCard = 0;
  $(function () {
    console.log(window.location)
    renderInit();    
    eventInit();
  })
  
  function renderInit () {
    const params = parseQuery(window.location.search);
    totalCard = Number(params.num);
    $('.js-total-card').html(totalCard);
    $('.js-input-num').html(0);
    $('.card-input').val(0);
  }

  function eventInit () {
    // 制作房卡
    $('.create-btn').on('click', function () {
      const inputNum = $('.js-input-num').html();
      console.log(inputNum);
      if (inputNum == 0) {
        Toast('请输入房卡数量');
        return;
      }
      requestCreateCard($(this), inputNum, (res) => {
        window.location.href = `/share.html?hb_id=${res.hb_id}`;
      })
    });
    // 监听input输入
    $('.card-input').on('input', function () {
      console.log($(this).val());
      const currentVal = Number($(this).val());
      $('.js-input-num').html(currentVal);
    });
  }
})()