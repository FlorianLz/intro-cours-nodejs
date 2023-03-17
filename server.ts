import path from "path";
import http from "http";
import os from "os";
import express, { RequestHandler } from "express";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use("/public/", express.static(path.join(".", "assets")));

app.get("/", (req: RequestHandler, res: any) => {
  const ret = "Hello World!!";
  res.send(ret);
});

app.post("/", (req: RequestHandler, res: any) => {
  const ret = { value: Math.round(Math.random() * 1000) / 1000 };
  res.json(ret);
});

io.on("connection", (socket: Socket) => {
  console.log(`[${Date.now()}] - WS "connection"`);

  socket.on("disconnect", () => {
    console.log(`[${Date.now()}] - WS "disconnect"`);
  });

  socket.on("refresh", (...args: any[]) => {
    console.log(
      `[${Date.now()}] - WS "refresh" with data ${JSON.stringify(args)}`
    );
    const data = {
      optimalThreadNumbers: os.availableParallelism(),
      cores: os.cpus().length,
      freeMem: os.freemem(),
      totalMem: os.totalmem(),
      hostName: os.hostname(),
      loadAvg: os.loadavg(),
      platform: os.platform(),
      upTime: os.uptime(),
    };
    const htmlData = JSON.stringify(data);
    socket.emit("nodetop", htmlData);
  });
});

const port = 8080;
httpServer.listen(port, () => {
  console.log(`Hello world server listening on ${port} ...`);
});
