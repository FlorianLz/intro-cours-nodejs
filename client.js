"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
/*http.get("http://localhost:8080/", (res: http.IncomingMessage) => {
  let response = "";
  res.on("data", (chunk: any) => {
    //console.log(`chunk: ${chunk}`);
    response += chunk.toString();
  });
  res.on("end", () => {
    console.log(`Réponse: ${response}`);
  });
});*/
http
    .request({
    method: "POST",
    path: "/",
    hostname: "localhost",
    localPort: 8080,
    protocol: "http:",
    headers: {
        "Content-Type": "application/json",
    },
}, (res) => {
    let txtResponse = "";
    res.on("data", (chunk) => {
        //console.log(`chunk: ${chunk}`);
        txtResponse += chunk.toString();
    });
    res.on("end", () => {
        const obj = JSON.parse(txtResponse);
        console.log(`Réponse: ${txtResponse}`);
    });
})
    .end();
