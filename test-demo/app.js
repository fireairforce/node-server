const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  // 获取到请求的方法
  const method = req.method;
  // 获取到请求的url
  const url = req.url;
  const path = url.split("?")[0];
  // 把url参数转换成对象的形式
  const query = querystring.parse(url.split("?")[1]);
  // 设置内容的返回格式为json
  res.setHeader("Content-type", "application/json");

  // 设置返回的数据
  const resData = {
    method,
    url,
    path,
    query
  };
  // 返回结果
  if (method === "GET") {
    // 这里返回的永远都是字符串的格式，json格式的字符串
    res.end(JSON.stringify(resData));
  }
   //   POST形式的返回接口
  if (method === "POST") {
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
        resData.postData = postData;
        res.end(JSON.stringify(resData));
    });
  }
});

server.listen(8999);
console.log("OK");
