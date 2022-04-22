const http = require("http");

const hostname = process.env.PORT || "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  // console.log({
  //     req,
  //     res
  // })
  console.log("path", req);

  switch (req.url) {
    case "/": {
      res.statusCode = 200;
    //   res.setHeader("Content-Type", "text/plain");
      res.end("GroupDrive Backend Root");
    }
    case "/test": {
      res.statusCode = 200;
    //   res.setHeader("Content-Type", "text/plain");
      res.end("GroupDrive Backend test");
    }
    default: {
      res.statusCode = 200;
    //   res.setHeader("Content-Type", "text/plain");
      res.end("GroupDrive Backend default");
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
