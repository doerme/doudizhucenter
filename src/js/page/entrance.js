require('../../css/page/entrance.scss');
// 引入base
require('./base');
import Slider from '../components/slider';
import { requestCreateGameRoom, requestEnterGameRoom } from '../util/api';

(function () {
  const ROOM_TYPE = {
    passer: 1,
    default: 2,
    laizi: 3
  }
  let gameTicket = 4;
  let roomType = ROOM_TYPE.default;
  let gameScore = 2;
  let useRemember = false;
  $(function () {
    uiInit();
    eventInit();
  })

  function uiInit () {
    Slider.init($('.game-slider'));
    Slider.onMinus = _minusScore;
    Slider.onPlus = _plusScore;
  }

  function _minusScore () {
    console.log('------');
    if (gameScore === 1) {
      return false;
    }
    const oldScore = gameScore;
    if (gameScore === 2) {
      gameScore = 1;
    } else {
      gameScore = 2;
    }
    $('.js-score').html(gameScore);
    return true;
  }

  function _plusScore () {
    if (gameScore === 5) {
      return false;
    }
    const oldScore = gameScore;
    if (gameScore === 1) {
      gameScore = 2;
    } else {
      gameScore = 5;
    }
    $('.js-score').html(gameScore);
    return true;
  }

  function eventInit () {
    // 玩法选择
    $('.btn-wrapper').on('click', 'a', function (e) {
      e.preventDefault();
      const $this = $(this);
      if (!$this.hasClass('selected')) {
        $this.addClass('selected').siblings().removeClass('selected');
        const type = $this.data('type');
        roomType = ROOM_TYPE[type];
        console.log('room type: ', roomType);
      }
    });
    // 游戏局数
    $('.js-game-ticket').on('click', 'div', function () {
      const $this = $(this);
      if (!$this.hasClass('selected')) {
        $this.addClass('selected').siblings().removeClass('selected'); 
        gameTicket = $(this).data('count');
      }
    });
    // 记牌器
    $('.js-remember').on('click', function () {
      $(this).toggleClass('selected');
      useRemember = $(this).hasClass('selected');
      console.log('remember: ', useRemember);
    });
    // 组局使用门票  1组局者支付门票 2 AA支付门票
    $('.js-total-play').on('click', function () {
      _requestCreateGameRoom(1);
    });
    // AA组局
    $('.js-aa-play').on('click', function () {
      _requestCreateGameRoom(2);
    });
  }

  function _requestCreateGameRoom (gameType) {
    const data = {
      game_type: gameType,
      room_type: roomType,
      score: gameScore,
      number: gameTicket,
      is_count: useRemember ? 1 : 0
    }
    console.log(data);
    requestCreateGameRoom(data, function (res) {
      console.log(res);
    })
  }
})()