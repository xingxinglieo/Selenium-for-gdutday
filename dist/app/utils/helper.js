"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getElementTrimInnerText(e) {
    if (e instanceof Array)
        return e.map(e => e.innerText.trim());
    else
        return e.innerText.trim();
}
exports.getElementTrimInnerText = getElementTrimInnerText;
