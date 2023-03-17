"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const os_1 = __importDefault(require("os"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer);
app.use("/public/", express_1.default.static(path_1.default.join(".", "assets")));
app.get("/", (req, res) => {
    const ret = "Hello World!!";
    res.send(ret);
});
app.post("/", (req, res) => {
    const ret = { value: Math.round(Math.random() * 1000) / 1000 };
    res.json(ret);
});
io.on("connection", (socket) => {
    console.log(`[${Date.now()}] - WS "connection"`);
    socket.on("disconnect", () => {
        console.log(`[${Date.now()}] - WS "disconnect"`);
    });
    socket.on("refresh", (...args) => {
        console.log(`[${Date.now()}] - WS "refresh" with data ${JSON.stringify(args)}`);
        const data = {
            optimalThreadNumbers: os_1.default.availableParallelism(),
            cores: os_1.default.cpus().length,
            freeMem: os_1.default.freemem(),
            totalMem: os_1.default.totalmem(),
            hostName: os_1.default.hostname(),
            loadAvg: os_1.default.loadavg(),
            platform: os_1.default.platform(),
            upTime: os_1.default.uptime(),
        };
        const htmlData = JSON.stringify(data);
        socket.emit("nodetop", htmlData);
    });
});
const port = 8080;
httpServer.listen(port, () => {
    console.log(`Hello world server listening on ${port} ...`);
});
