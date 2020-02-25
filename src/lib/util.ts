interface params {
    filter?: (s: string) => boolean,
    specifiedType?: new () => object,
    prefix?: string

}
function findMembers(instance: Own.ExternalObject, params: params) {
    const {
        prefix,
        specifiedType,
        filter
    } = params
    // 递归函数
    function _find(instance: object): string[] {
        //基线条件（跳出递归）
        if (Object.getPrototypeOf(instance) === null)
            return []
        // Reflect.ownKeys方法用于返回对象的所有属性，基本等同于
        // Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
        let names = <string[]>Reflect.ownKeys(instance)
        names = names.filter(name => _shouldKeep(name))
        // 过滤掉不满足条件的属性或方法名

        return [...names, ..._find(Object.getPrototypeOf(instance))]
    }

    function _shouldKeep(value: string) {
        //过滤形参是字符串，传入value
        if (filter && filter(value)) return true
        else if (prefix && value.startsWith(prefix)) return true
        else if (specifiedType &&(instance[value] instanceof specifiedType)) return true
        else return false
    }

    return _find(instance)
}

export {
    findMembers
}