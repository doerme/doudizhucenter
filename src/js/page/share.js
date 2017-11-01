require('../../css/page/share.scss');
// 引入base
require('./base');
import { parseQuery } from '../util';
import { requestRoomCardPockectDetail, requestReceiveCard } from '../util/api';
(function () {
  let hb_id = '';
  // 入口
  $(function () {
    hb_id = parseQuery(window.location.search).hb_id;    
    eventInit();
    _requestRoomCardPockectDetail();
  });

  function eventInit () {
    $('.js-receive').on('click', function () {
      requestReceiveCard($(this), hb_id, function (res) {
        console.log('领取: ', res);
        $('.js-open').hide();
        $('.js-opened').show();
        renderOpened(res);
      });
    });
  }
  
  function _requestRoomCardPockectDetail () {
    requestRoomCardPockectDetail(hb_id, function (res) {
      console.log(res);
      renderOpen(res);
    })
  }

  function renderOpen (hbData) {
    $('.js-nickname').html(hbData.nickname);
    $('.js-avatar').attr('src', hbData.headimgurl);
  }

  function renderOpened (hbData) {
    $('.js-opened-from').html(hbData.nickname);
    $('.js-receive-avatar').attr('src', hbData.headimgurl);
    $('.js-receive-nickname').html(hbData.nickname);
    $('.js-receive-time').html(hbData.time);
    $('.js-receive-num').html(hbData.member);
  }
})()






