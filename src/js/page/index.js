require('../../css/page/index.scss')
// 引入base
require('./base');
import Dialog from '../components/dialog';
import { requestUrlInfo } from '../util/api';

(function () {
  let userInfo = {};
  $(function () {
    _requestUrlInfo();
    eventInit();
  });

  function eventInit () {
    $('.js-phone').on('click', function () {
      if (!userInfo.phone) {
        Dialog.init();        
        Dialog.show();        
      }
    });
  }
  
  function _requestUrlInfo () {
    requestUrlInfo((res) => {
      console.log(res);
      userInfo = res;
      renderUserInfo();
    })
  }

  function renderUserInfo () {
    $('.js-avatar').attr('src', userInfo.headimgurl);
    $('.js-nickname').html(userInfo.nickname);
    $('.js-card').html(Number(userInfo.RC));
    $('.js-diamond').html(Number(userInfo.ZS));
    userInfo.phone ? $('.js-phone').addClass('verified') : $('.js-phone').removeClass('verified');
  }
})();