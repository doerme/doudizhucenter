import './toast.scss';

var toastTimer = null;

export default function Toast (str, cb, time = 2000) {
  var toastEle = $('#toast');
  if ($('#toast').length == 0) {
    toastEle = $(`<p id="toast"></p>`);
    $('body').append(toastEle);
  }
  toastEle.html(str).addClass('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEle.html('').removeClass('show');
    cb && cb();
  }, time)
}