"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const marked = require("marked");
const cheerio = require("cheerio");
const data = fs.readFileSync(`${__dirname}/update.md`);
const html = marked(data.toString());
const $ = cheerio.load(html);
exports.message = {
    html: html,
    version: $('h2')[0].children[0].nodeValue,
};
