import './slider.scss';
import html from './slider.html';

let lastCurWidth = 0;
let slideWidth = 0;
let halfSlideWidth = 0;
const Slider = {
  onMinus: () => {},
  onPlus: () => {},
  init (parentEle) {
    var $slider = $(html).clone()
    parentEle.append($slider);
    slideWidth = $('.slide-bg').width();
    halfSlideWidth = Math.floor($('.slide-bg').width() / 2);
    lastCurWidth = halfSlideWidth;
    var that = this;
    $('.js-minus').on('click', function () {
      // cb && cb();
      const enough = that.onMinus();
      enough && that.onChange(0);
    });
    $('.js-plus').on('click', function () {
      // cb && cb();
      const enough = that.onPlus();
      enough && that.onChange(1);
    });
    this.onMove(); 
  },
  // onMinus (cb) {
  //   $('.js-minus').on('click', function () {
  //     cb && cb();
  //   });
  // },
  // onPlus (cb) {
  //   $('.js-plus').on('click', function () {
  //     cb && cb();
  //   });    
  // },
  // 0: left 减少 1: right 增加
  onChange (type) {
  
    const $slideCur = $('.slide-cur');    
    const curWidth = $slideCur.width();
    const $slideTouch = $('.slide-touch');
    const DELTA = 3;
    console.log(curWidth, slideWidth, halfSlideWidth, lastCurWidth);
    if (type === 1) {
      // 加
      // if (curWidth >= 0 && curWidth < halfSlideWidth) {
      //   console.log('1 -> 2');
      //   $slideCur.width(halfSlideWidth);
      //   $slideTouch.css('left', $slideCur.width() + 'px');
      // } else if (curWidth >= halfSlideWidth && curWidth < slideWidth) {
      //   console.log('2 -> 5');
      //   $slideCur.width(slideWidth);
      //   $slideTouch.css('left', $slideCur.width() + 'px');
      // }
      if (lastCurWidth >= 0 && lastCurWidth < halfSlideWidth) {
        console.log('1 -> 2');
        $slideCur.width(halfSlideWidth);
        $slideTouch.css('left', $slideCur.width() + 'px');
        lastCurWidth = halfSlideWidth;
      } else if (lastCurWidth >= halfSlideWidth && lastCurWidth < slideWidth) {
        console.log('2 -> 5');
        $slideCur.width(slideWidth);
        $slideTouch.css('left', $slideCur.width() + 'px');
        lastCurWidth = slideWidth;
      }
    } else {
      // 减
      // if (curWidth > halfSlideWidth && curWidth <= slideWidth) {
      //   console.log('5 -> 2')
      //   $slideCur.width(halfSlideWidth);
      //   $slideTouch.css('left', $slideCur.width() + 'px');
      // } else if (curWidth >= 0 && curWidth <= halfSlideWidth) {
      //   console.log('2 -> 1');
      //   $slideCur.width(0);
      //   $slideTouch.css('left', $slideCur.width() + 'px');
      // }
      if (lastCurWidth > halfSlideWidth && lastCurWidth <= slideWidth) {
        console.log('5 -> 2')
        $slideCur.width(halfSlideWidth);
        $slideTouch.css('left', $slideCur.width() + 'px');
        lastCurWidth = halfSlideWidth;        
      } else if (lastCurWidth >= 0 && lastCurWidth <= halfSlideWidth) {
        console.log('2 -> 1');
        $slideCur.width(0);
        $slideTouch.css('left', $slideCur.width() + 'px');
        lastCurWidth = 0;        
      }
    }
  },
  onMove (cb) {
    var that = this;
    console.log('onchange', this.onChange)
    let startX = 0;
    let lastX = 0;
    const $slideTouch = $('.slide-touch');
    const $slideCur = $('.slide-cur');
    const slideWidth = $('.slide-bg').width();
    const windowWidth = $('body').width();
    const slideStartX = (windowWidth - slideWidth) / 2;
    const slideEndX = slideStartX + slideWidth;
    
    $slideTouch.on('touchstart', function (e) {
      startX = e.changedTouches[0].clientX;
      lastX = startX;
    });
    $slideTouch.on('touchmove', function (e) {
      const clientX = e.changedTouches[0].clientX;
      if (clientX <= slideStartX || clientX >= slideEndX) {
        return;
      }
      // if (clientX - startX >= slideWidth / 2 + 20) {
      //   // cb && cb('right');
      //   console.log('右边超过一半...');
      //   const enough = that.onPlus();
      //   // enough && that.onChange(1);
      //   // return;
      // }
      // if (clientX - startX <= -slideWidth / 2 - 20) {
      //   // cb && cb('left');
      //   console.log('左边超过一半...');
      //   const enough = that.onMinus();
      //   // enough && that.onChange(0);
      //   // return;
      // }
      const delta = clientX - lastX;
      $slideTouch.css('left', clientX - slideStartX+ 'px')
      $slideCur.width($slideCur.width() + delta + 'px');
      lastX = clientX;
    });
    $slideTouch.on('touchend', function (e) {
      const endX = e.changedTouches[0].clientX;
      const ratio = (endX - startX) / halfSlideWidth;
      if (ratio > 1) {
        let enough = that.onPlus();
        enough && that.onChange(1);
        enough = that.onPlus();
        enough && that.onChange(1);
      } else if (ratio > 0) {
        let enough = that.onPlus();
        enough && that.onChange(1);
      } else if (ratio < -1) {
        let enough = that.onMinus();
        enough && that.onChange(0);
        enough = that.onMinus();
        enough && that.onChange(0);
      } else {
        let enough = that.onMinus();
        enough && that.onChange(0);
      }
    });
  }
}

export default Slider;