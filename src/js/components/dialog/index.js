// 加载模块css
require('./css/dialog.scss')
// 加载模板
var html = require('./tmpl/dialog.html');

import { requestImgCode, requestBindPhone, requestSendSms } from '../../util/api';
import { validPhoneNum } from '../../util';
import Toast from '../toast';

function _init () {
  console.log('dialog init...')
  $('body').append($(html));
  const $dialog = $('.v-dialog');
  
  _requestBindPhone();
  
  let session_id = '';
  
  function _requestBindPhone () {
    requestImgCode(function (res) {
      console.log(res);
      session_id = res.session_id;
      $('.js-img-code').attr('src', res.pic_captcha);
    })
  }
  
  $('.js-close-dialog').on('click', function () {
    $dialog.hide();
  });
  $('.js-img-code').on('click', function () {
    _requestBindPhone();
  });
  $('.js-send-sms').on('click', function () {
    const pic_captcha = $('.js-input-img').val();
    const mobile = $('.js-input-phone').val();
    if (!validPhoneNum(mobile)) {
      Toast('请输入合法的手机号');
      return;
    }
    if (!pic_captcha.length) {
      Toast('请输入图形验证码');
      return;
    } 
    if (!mobile.length) {
      return;
    }
    const data = { mobile, session_id, pic_captcha };
    requestSendSms(data, function (res) {
      console.log('短信验证码： ', res);
      Toast('短信发送成功');
    });
  });
  $('.js-bind').on('click', function () {
    const mobile = $('.js-input-phone').val();
    const sms_captcha = $('.js-input-sms').val();
    if (!validPhoneNum(mobile)) {
      Toast('请输入合法的手机号');
      return;
    }
    if (!sms_captcha.length) {
      Toast('请输入短信验证码');
      return;
    } 
    requestBindPhone({ mobile, sms_captcha }, function (res) {
      console.log('绑定手机号: ', res);
      Toast('绑定手机号成功');
      $dialog.hide();
    });
  });
  
}
export default {
  init () {
    _init();
  },
  show () {
    $('.js-input-img').val('');
    $('.js-input-phone').val('');
    $('.js-input-sms').val('');
    $('.v-dialog').show();
  },
  hide () {
    $('.v-dialog').hide();
  }
}