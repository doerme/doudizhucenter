import Toast from '../../js/components/toast';
console.log(process.env);
const baseUrl = 'http://testddz.tcpan.com';
// 获取个人信息
const userInfoUrl = {
  type: 'get',
  url: baseUrl + '/app/user/userInfo'
};
// 创建房卡
const createRoomCard = {
  type: 'post',
  url: baseUrl + '/app/roomCard/create'
};
// 领取房卡
const receiveRoomCard = {
  type: 'get',
  url: baseUrl + '/app/roomCard/receive'
};
// 房卡历史记录
const roomCardList = {
  type: 'get',
  url: baseUrl + '/app/roomCard/log'
};
// 房卡红包详情
const roomCardPockect = {
  type: 'get',
  url: baseUrl + '/app/roomCard/eject'
};
// 购买会员卡
const vipBuy = {
  type: 'get',
  url: baseUrl + '/app/user/vipPay'
};
// 创建房间
const createGameRoom = {
  type: 'post',
  url: baseUrl + '/app/ddzRoom/create'
};
// 加入房间
const enterGameRoom = {
  type: 'get',
  url: baseUrl + '/app/ddzRoom/join '
};
// 绑定手机
const bindPhone = {
  type: 'post',
  url: baseUrl + '/app/user/bindingPhone'
};
// 发送短信验证码
const sendSms = {
  type: 'post',
  url: baseUrl + '/app/user/getSmsCaptcha'
};
// 获取图形验证码
const getImgCode = {
  type: 'get',
  url: baseUrl + '/app/user/getPicCaptcha'
};


$.ajaxSettings = $.extend($.ajaxSettings, {
  error: function () {
    Toast('请求失败');
  }
});

const CLASS_ING = 'v-ing';
const _request = (dom, api, options = {}, cb, errCb) => {
  if (dom.hasClass(CLASS_ING)) {
    Toast('正在请求中');
    return
  };
  dom.addClass(CLASS_ING);
  $.ajax({
    type: api.type,
    url: api.url,
    dataType: 'json',
    data: options,
    success: function (res) {
      if (res.code == 0) {
        cb && cb(res.data);
      } else {
        errCb && errCb();
        Toast(res.msg);
      }
    },
    complete: function () {
      dom.removeClass(CLASS_ING);
    }
  });
}

// 获取个人信息
export const requestUrlInfo = (cb, errCb) => {
  $.ajax({
    type: userInfoUrl.type,
    url: userInfoUrl.url,
    success: function (res) {
      if (res.code == 0) {
        cb && cb(res.data);
      } else {
        errCb && errCb();
        Toast(res.msg);
      }
    }
  })
}

// 创建房卡
export const requestCreateCard = (dom, member, cb, errCb) => {
  _request(dom, createGameRoom, { member }, cb, errCb);
  // $.ajax({
  //   type: createRoomCard.type,
  //   url: createRoomCard.url,
  //   dataType: 'json',
  //   data: {
  //     member
  //   },
  //   success: function (res) {
  //     if (res.code == 0) {
  //       cb && cb(res.data);
  //     } else {
  //       errCb && errCb();
  //       Toast(res.msg);
  //     }
  //   }
  // })
}

// 领取房卡
export const requestReceiveCard = (dom, hb_id, cb, errCb) => {
  _request(dom, receiveRoomCard, { hb_id }, cb, errCb);
  // $.ajax({
  //   type: receiveRoomCard.type,
  //   url: receiveRoomCard.url,
  //   dataType: 'json',
  //   data: { hb_id },
  //   success: function (res) {
  //     if (res.code == 0) {
  //       cb && cb(res.data);
  //     } else {
  //       errCb && errCb();
  //       Toast(res.msg);
  //     }
  //   }
  // })
}

// 房卡历史记录
export const requestRoomCardList = (page = 1, cb, errCb) => {
  $.ajax({
    type: roomCardList.type,
    url: roomCardList.url,
    dataType: 'json',
    data: {
      page: page
    },
    success: function (res) {
      if (res.code == 0) {
        cb && cb(res.data);
      } else {
        errCb && errCb();
        Toast(res.msg);
      }
    }
  });
}

// 购买会员卡
export const requestBuyVip = (dom, cb, errCb) => {
  _request(dom, vipBuy, null, cb, errCb);
  // $.ajax({
  //   type: vipBuy.type,
  //   url: vipBuy.url,
  //   success: function (res) {
  //     if (res.code == 0) {
  //       cb && cb(res.data);
  //     } else {
  //       errCb && errCb();
  //       Toast(res.msg);
  //     }
  //   },
  // })
}

// 获取房卡红包详情
export const requestRoomCardPockectDetail = (hb_id, cb, errCb) => {
  $.ajax({
    type: roomCardPockect.type,
    url: roomCardPockect.url,
    dataType: 'json',
    data: { hb_id },
    success: function (res) {
      if (res.code == 1) {
        cb && cb(res.data);
      } else {
        errCb && errCb();
        Toast(res.msg);
      }
    }
  });
}
// 创建房间
export const requestCreateGameRoom = (roomInfo = {}, cb) => {
  $.ajax({
    type: createGameRoom.type,
    url: createGameRoom.url,
    dataType: 'json',
    data: roomInfo,
    success: function (res) {
      if (res.code == 0) {
        cb && cb(res.data);
      } else {
        errCb && errCb();
        Toast(res.msg);
      }
    }
  })
}

// 加入房间
export const requestEnterGameRoom = (room_id, cb) => {
  $.ajax({
    type: enterGameRoom.type,
    url: enterGameRoom.url,
    dataType: 'json',
    data: { room_id },
    success: function (res) {
      if (res.code == 0) {
        cb && cb(res.data);
      } else {
        errCb && errCb();
        Toast(res.msg);
      }
    }
  })
}

// 获取图形验证码
export const requestImgCode = (cb, errCb) => {
  $.ajax({
    type: getImgCode.type,
    url: getImgCode.url,
    success: function (res) {
      if (res.code == 0) {
        cb && cb(res.data);
      } else {
        errCb && errCb();        
        Toast(res.msg);
      }
    }
  })
}
// 发送短信验证码
export const requestSendSms = (data, cb, errCb) => {
  $.ajax({
    type: sendSms.type,
    url: sendSms.url,
    dataType: 'json',
    data: data,
    success: function (res) {
      if (res.code == 0) {
        cb && cb(res.data);
      } else {
        errCb && errCb();        
        Toast(res.msg);
      }
    }
  });
}
// 绑定手机
export const requestBindPhone = (data, cb, errCb) => {
  $.ajax({
    type: bindPhone.type,
    url: bindPhone.url,
    dataType: 'json',
    data: data,
    success: function (res) {
      if (res.code == 0) {
        cb && cb(res.data);
      } else {
        errCb && errCb();        
        Toast(res.msg);
      }
    }
  });
}