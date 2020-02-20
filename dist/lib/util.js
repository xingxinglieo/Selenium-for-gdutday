"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findMembers(instance, params) {
    const { prefix, specifiedType, filter } = params;
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (Object.getPrototypeOf(instance) === null)
            return [];
        // Reflect.ownKeys方法用于返回对象的所有属性，基本等同于
        // Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
        let names = Reflect.ownKeys(instance);
        names = names.filter(name => _shouldKeep(name));
        // 过滤掉不满足条件的属性或方法名
        return [...names, ..._find(Object.getPrototypeOf(instance))];
    }
    function _shouldKeep(value) {
        //过滤形参是字符串，传入value
        if (filter && filter(value))
            return true;
        else if (prefix && value.startsWith(prefix))
            return true;
        else if (specifiedType && (instance[value] instanceof specifiedType))
            return true;
        else
            return false;
    }
    return _find(instance);
}
exports.findMembers = findMembers;
// const generateToken = function (uid, scope) {
//     const secretKey = global.config.security.secretKey
//     const expiresIn = global.config.security.expiresIn
//     const token = jwt.sign({
//         uid, 
//         scope
//     }, secretKey, {
//         expiresIn: expiresIn
//     })
//     return token
// }
