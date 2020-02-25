import validator = require('validator');
import {
    ParameterException
} from '../core/http-exception';
import lodash = require("lodash");
import {
    findMembers
} from './util';
const {
    get,
    last,
    set,
    cloneDeep
} = lodash;
class LinValidator {
    data: Own.ExternalObject = {}
    parsed: Own.ExternalObject = {}
    alias!: {};
    [property: string]: unknown;
    //private可以帮你绑定this 一定要用
    private _assembleAllParams(ctx: Koa.ExtendableContext) {
        //获取所需参数
        return {
            body: ctx.request.body,
            query: ctx.request.query,
            path: ctx.params,
            header: ctx.request.header
        }
    }

    public get(path: string, parsed = true) {
        if (parsed) {
            //get 通过路径获取对象的值
            //无视
            const value = get(this.parsed, path, null)
            if (value == null) {
                const keys = path.split('.')
                //last 最后一个元素
                const key = last(keys)
                return get(this.parsed.default, <string>key)
            }
            return value
        } else {
            return get(this.data, path)
        }
    }

    private _findMembersFilter(this: LinValidator, key: keyof LinValidator) {
        //调用带validator开头的函数
        if (/validate([A-Z])\w+/g.test(String(key))) {
            return true
        }
        if (this[key] instanceof Array) {
            (this[key] as Array<Rule>).forEach((value: Rule) => {
                const isRuleType = value instanceof Rule
                if (!isRuleType) {
                    throw new Error('验证数组必须全部为Rule类型')
                }
            })
            return true
        }
        return false
    }

    public async validate(ctx: Koa.ExtendableContext, alias = {}) {
        this.alias = alias
        //返回参数
        let params = this._assembleAllParams(ctx)
        this.data = cloneDeep(params)
        this.parsed = cloneDeep(params)
        //this 实例
        const memberKeys = findMembers(this, {
            filter: this._findMembersFilter.bind(this)
        })

        const errorMsgs = []
        // const map = new Map(memberKeys)
        for (let key of memberKeys) {
            const result = await this._check(key, alias)
            if (!result.success) {
                errorMsgs.push(result.msg)
            }
        }
        if (errorMsgs.length != 0) {
            throw new ParameterException(errorMsgs)
        }
        ctx.v = this
        return this
    }

    private async _check(key: string, alias: Own.ExternalObject = {}) {
        const isCustomFunc = typeof (this[key]) == 'function' ? true : false
        let result;
        if (isCustomFunc) {
            try {
                await (this[key] as Function)(this.data)
                result = new RuleResult(true)
            } catch (error) {
                result = new RuleResult(false, error.msg || error.message || '参数错误')
            }
            // 函数验证
        } else {
            // 属性验证, 数组，内有一组Rule
            const rules = this[key]
            const ruleField = new RuleField(<Rule[]><unknown>rules)
            // 别名替换
            key = alias[key] ? alias[key] : key
            const param = this._findParam(key)

            result = ruleField.validate(param.value)

            if (result.pass) {
                // 如果参数路径不存在，往往是因为用户传了空值，而又设置了默认值
                if (param.path.length == 0) {
                    set(this.parsed, ['default', key], result.legalValue)
                } else {
                    set(this.parsed, param.path, result.legalValue)
                }
            }
        }
        if (!result.pass) {
            const msg = `${isCustomFunc ? '' : key}${result.msg}`
            return {
                msg: msg,
                success: false
            }
        }
        return {
            msg: 'ok',
            success: true
        }
    }

    private _findParam(key: string) {
        let value
        value = get(this.data, ['query', key])
        if (value) {
            return {
                value,
                path: ['query', key]
            }
        }
        value = get(this.data, ['body', key])
        if (value) {
            return {
                value,
                path: ['body', key]
            }
        }
        value = get(this.data, ['path', key])
        if (value) {
            return {
                value,
                path: ['path', key]
            }
        }
        value = get(this.data, ['header', key])
        if (value) {
            return {
                value,
                path: ['header', key]
            }
        }
        return {
            value: null,
            path: []
        }
    }
}

class RuleResult {
    constructor(public pass: boolean, public msg = '') {

    }
}
class RuleFieldResult extends RuleResult {
    constructor(public pass: boolean, msg = '', public legalValue: string | number | boolean | null = null) {
        super(pass, msg)
    }
}
class Rule {
    params: any[];
    message?: string;
    constructor(public name: string, public msg?: string, ...params: any[]) {
        this.message = msg;
        this.params = params;
    }

    validate(field: string) {
        if (this.name == 'isOptional')
            return new RuleResult(true)
        if (!(validator as Own.ExternalObject)[this.name](field + '', ...this.params)) {
            return new RuleResult(false, this.msg || this.message || '参数错误')
        }
        return new RuleResult(true, '')
    }
}

class RuleField {
    constructor(public rules: Rule[]) {
    }
    validate(field: string | null) {
        if (field == null) {
            // 如果字段为空
            const allowEmpty = this._allowEmpty()
            const defaultValue = this._hasDefault()
            if (allowEmpty) {
                return new RuleFieldResult(true, '', defaultValue)
            } else {
                return new RuleFieldResult(false, '字段是必填参数')
            }
        }

        const filedResult = new RuleFieldResult(false)
        for (let rule of this.rules) {
            let result = rule.validate(field)
            if (!result.pass) {
                filedResult.msg = result.msg
                filedResult.legalValue = null
                // 一旦一条校验规则不通过，则立即终止这个字段的验证
                return filedResult
            }
        }
        return new RuleFieldResult(true, '', this._convert(field))
    }

    _convert(value: string) {
        for (let rule of this.rules) {
            if (rule.name == 'isInt') {
                return parseInt(value)
            }
            if (rule.name == 'isFloat') {
                return parseFloat(value)
            }
            if (rule.name == 'isBoolean') {
                return value ? true : false
            }
        }
        return value
    }

    _allowEmpty() {
        for (let rule of this.rules) {
            if (rule.name == 'isOptional') {
                return true
            }
        }
        return false
    }

    _hasDefault() {
        for (let rule of this.rules) {
            const defaultValue = rule.params[0]
            if (rule.name == 'isOptional') {
                return defaultValue
            }
        }
    }
}



export {
    Rule,
    LinValidator
}