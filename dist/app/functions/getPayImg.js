"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("~/core/http-exception");
const driver_1 = require("~/app/utils/driver");
const url = {
    LOGIN_URL: 'https://selfmanager.gdut.edu.cn/sso_login',
    Pay_URL: 'https://selfmanager.gdut.edu.cn/selfRechargeAction'
};
async function getCampusNetworkPayQRcode(schoolId, password) {
    const driver = driver_1.createAutoDestroyDriver(600000);
    let src = "";
    try {
        await login(driver, url.LOGIN_URL, { schoolId, password });
    }
    catch (err) {
        throw new http_exception_1.ParameterException(`登录步骤失败,具体原因:${err.message}`);
    }
    try {
        await toPayPage(driver, url.Pay_URL);
        src = await getSrc(driver);
    }
    catch (_a) {
        throw new http_exception_1.Forbbiden('无法获取付款图片地址');
    }
    await driver.close();
    return src;
}
exports.getCampusNetworkPayQRcode = getCampusNetworkPayQRcode;
;
async function login(driver, url, { schoolId = '', password = '' }) {
    await driver.get(url);
    await driver.findElement({
        id: 'username'
    }).sendKeys(schoolId);
    await driver.findElement({
        id: 'password'
    }).sendKeys(password);
    await driver.findElement({
        className: 'auth_login_btn'
    }).click();
    const loginUrl = await driver.getCurrentUrl();
    if (url === loginUrl) {
        const err = new Error();
        err.message = '账户密码错误';
        throw err;
    }
}
exports.login = login;
async function toPayPage(driver, url) {
    await driver.get(url);
    await driver.findElement({
        id: 'rechargeMonth'
    }).sendKeys('1');
    await driver.findElement({
        css: 'input[value="充值"]'
    }).click();
    await driver.findElement({
        css: 'input[value="确认支付"]'
    }).click();
}
async function getSrc(driver) {
    let src = "";
    while (src === "") {
        try {
            src = await driver.findElement({
                id: 'PayImg'
            }).getAttribute('src');
        }
        catch (err) {
            src = "";
        }
    }
    return src;
}
