"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webdriver = require("selenium-webdriver");
exports.webdriver = webdriver;
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
const path = chromedriver.path;
const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
