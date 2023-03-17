import { readFileSync } from "fs";
const { log } = console;
//Lire package.json
const buffer = readFileSync("package.json");
const txt = buffer.toString();
//Extraire le nom du package et sa version
const { name: packageName, version: packageVersion } = JSON.parse(txt);
// "Hello" 'nom du package' v 'version'
log(`Hello ${packageName} v${packageVersion}`);
