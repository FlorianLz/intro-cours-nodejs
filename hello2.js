"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const { log } = console;
//Lire package.json
const buffer = (0, fs_1.readFileSync)("package.json");
const txt = buffer.toString();
//Extraire le nom du package et sa version
const { name: packageName, version: packageVersion } = JSON.parse(txt);
// "Hello" 'nom du package' v 'version'
log(`Hello ${packageName} v${packageVersion}`);
