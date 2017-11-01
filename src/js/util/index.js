export const formatTime = (secs) => {
  const date = new Date(Number(secs) * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export const parseQuery = (search) => {
  let params = {};
  const parts = search.substring(1).split('&');
  for (let i = 0; i < parts.length; i++) {
    const nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
  return params;
}

export const validPhoneNum = (num) => {
  var sMobile = num;
  if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(sMobile))){
    return false;
  }
  return true;
}
