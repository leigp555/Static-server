var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/



  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);
  response.statusCode = 200;
  //路径为 "/"则返回 "/index.html"
  let filePath = path === "/" ? "/index.html" : path;
  let index = filePath.lastIndexOf(".");
  let suffix = filePath.substring(index);
  const fileType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    "jpg": "image/jpeg",
  };
  response.setHeader(
    "Content-Type",
    `${fileType[suffix]||'text/html'};charset=utf-8`
  );
 //文件名不存在时捕捉错误并且返回404
  let string;
  try {
    string = fs.readFileSync(`src/${filePath}`);
  } catch (error) {
    string = "文件不存在";
    request.statusCode = 404;
  }
  response.write(string);
  response.end();

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
