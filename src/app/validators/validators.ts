import { ParameterException } from '~/core/http-exception'
import {
    LinValidator,
    Rule
} from '~/lib/lin-validator-v2';

class AccountValidator extends LinValidator {
    schoolId = [
        new Rule('isInt', '学号应为10为数字'),
        new Rule('isLength', '学号应为10为数字', { max: 10, min: 10 })
    ]
    password = [
        new Rule('isLength', '密码至少6个字符', {
            mix: 6,
            max: 32
        })
    ]
}
class PayNetValidator extends AccountValidator {
    months = new Rule('isInt', '月数应为小于6的数字', { min: 1, max: 6 })
}
export {
    AccountValidator,
    PayNetValidator
}