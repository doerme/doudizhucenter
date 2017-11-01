require('../../css/page/cardhistory.scss');
// 引入base
require('./base');
import { requestRoomCardList } from '../util/api';
import { formatTime } from '../util';
(function () {

  let totalPage = 0;
  let currentPage = 1;

  $(function () {
    _eventInit();
    _requestRoomCardList();
  })

  function _eventInit () {
    var self = this;
    $('.load-more-btn').on('click', function () {
      _requestRoomCardList();
    });
  }

  function _requestRoomCardList () {
    requestRoomCardList(currentPage, (res) => {
      totalPage = res.page_count;
      if (totalPage === currentPage) {
        $('.load-more-btn').hide();
      } else {
        $('.load-more-btn').show();
      }
      _renderCardList(res.list);
      currentPage = currentPage + 1;
    });
  }

  function _renderCardList (cardArr) {
    let $list = $('.card-list');
    if (currentPage == 1) {
      $list.empty();    
    }
    for (let i = 0; i < cardArr.length; i++) {
      const card = cardArr[i];
      const html = '<li>' +
                    '<div class="left">' +
                      '<p>' + card.content + '</p>' +
                      '<p>' + formatTime(card.mktime) + '</p>' +
                    '</div>' +
                    '<p class="count"><span>'+ card.je +'</span>张</p>' +
                  '</li>'
      $list.append($(html));
    }
  }
})()