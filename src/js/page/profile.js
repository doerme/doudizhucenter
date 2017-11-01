require('../../css/page/profile.scss');
// 引入base
require('./base');
import Toast from '../components/toast';
import Dialog from '../components/dialog';
import { requestUrlInfo } from '../util/api';

(function () {
  let userInfo = {};
  // 入口
  $(function () {
    eventInit();
    requestInit();
  });

  function eventInit () {
    $('.js-to-roomcard').on('click', function (e) {
      e.preventDefault();
      window.location.href = `/roomcard.html?num=${userInfo.RC || 0}`;
    });
    $('.js-nickname').on('click', function (){
      if (!userInfo.phone) {
        Dialog.init();
        Dialog.show();        
      }
    })
  }

  function requestInit () {
    requestUrlInfo((res) => {
      console.log(res);
      userInfo = res;
      renderUserInfo();
    })
  }

  function renderUserInfo () {
    $('.js-nickname').html(userInfo.nickname);
    $('.js-avatar').attr('src', userInfo.headimgurl);
    $('.js-room-count').html(Number(userInfo.RC));
    $('.js-identifier').html(userInfo.identifier);
    userInfo.phone ? $('.js-nickname').addClass('verified') : $('.js-nickname').removeClass('verified');
  }
})()






