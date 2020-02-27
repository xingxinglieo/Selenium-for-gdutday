"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleLog = async (context, next) => {
    console.log(context);
    await next();
};
exports.consoleLog = consoleLog;
// module.exports = catchError;
