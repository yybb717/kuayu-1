//JSONP

//封装ＪＳＯＮＰ
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const random = `yyJSONPCallbackName` + Math.random();
    window[random] = x => {
      resolve(x); //成功就执行resolve函数
    };
    const script = document.createElement("script");
    script.src = `${url}?functionName=${random}`;
    script.onload = () => {
      script.remove();
    };
    script.onerror = () => {
      reject();
    }; //失败就执行reject函数
    document.body.appendChild(script);
  });
}

//调用jsonp函数
jsonp("http://localhost:8888/friends.json").then(x => {
  console.log(x);
});
//CORS
const request = new XMLHttpRequest();
request.open("GET", "http://localhost:8888/friends.json");
request.onreadystatechange = () => {
  if (request.readyState === 4) {
    if (request.status >= 200 && request.status < 300) {
      console.log(request.response);
    }
  }
};
request.send();
