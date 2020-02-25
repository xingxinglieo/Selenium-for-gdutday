"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lin_validator_v2_1 = require("~/lib/lin-validator-v2");
class AccountValidator extends lin_validator_v2_1.LinValidator {
    constructor() {
        super(...arguments);
        this.schoolId = [
            new lin_validator_v2_1.Rule('isInt', '学号应为10为数字'),
            new lin_validator_v2_1.Rule('isLength', '学号应为10为数字', { max: 10, min: 10 })
        ];
        this.password = [
            new lin_validator_v2_1.Rule('isLength', '密码至少6个字符', {
                mix: 6,
                max: 32
            })
        ];
    }
}
exports.AccountValidator = AccountValidator;
class PayNetValidator extends AccountValidator {
    constructor() {
        super(...arguments);
        this.months = new lin_validator_v2_1.Rule('isInt', '月数应为小于6的数字', { min: 1, max: 6 });
    }
}
exports.PayNetValidator = PayNetValidator;
