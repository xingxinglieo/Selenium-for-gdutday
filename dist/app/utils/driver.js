"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
const path = chromedriver.path;
const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
function createDriver() {
    return new webdriver.Builder()
        .forBrowser('chrome')
        .build();
}
exports.createDriver = createDriver;
function createAutoDestroyDriver(timeout = 30000) {
    const driver = createDriver();
    setTimeout(() => driver.close(), timeout);
    return driver;
}
exports.createAutoDestroyDriver = createAutoDestroyDriver;
