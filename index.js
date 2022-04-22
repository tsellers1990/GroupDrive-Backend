const http = require("http");

const hostname = process.env.PORT || "127.0.0.1";
const port = 3000;

const routes = require("./routes");

const server = http.createServer((req, res) => {
  console.log("path", req);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("GroupDrive Backend Root");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
