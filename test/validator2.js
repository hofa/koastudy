var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var DEFAULT_PARAMS = /=[^,]+/mg;
var FAT_ARROWS = /=>.*$/mg;

function getParameterNames(fn) {
    var code = fn.toString()
        .replace(COMMENTS, '')
        .replace(FAT_ARROWS, '')
        .replace(DEFAULT_PARAMS, '');

    var result = code.slice(code.indexOf('(') + 1, code.indexOf(')'))
        .match(/([^\s,]+)/g);

    return result === null
        ? []
        : result;
}

class ValidatorChecker {
    ascii(val) {
        var ascii = /^[\x00-\x7F]+$/
        var pattern = new RegExp(ascii)
        return pattern.test(val)
    }

    int(val) {
        var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/
        var pattern = new RegExp(int)
        if (typeof val == 'integer') {
            return true
        }
        return pattern.test(val)
    }

    numeric(val) {
        var numeric = /^[+-]?([0-9]*[.])?[0-9]+$/
        var pattern = new RegExp(numeric)
        if (typeof val == 'integer' || typeof val == 'float') {
            return true
        }
        return pattern.test(val)
    }

    len(val, min, max) {
        var min = parseInt(min || 0)
        var max = parseInt(max || 0)
        if (val.length >= min && (max == 0 || val.length <= max)) {
            return true
        }
        return false
    }

    min(val, val2) {
        var val = parseInt(val)
        var val2 = parseInt(val2)
        if (val >= val2) {
            return true
        }
        return false
    }

    max(val, val2) {
        var val = parseInt(val)
        var val2 = parseInt(val2)
        if (val <= val2) {
            return true
        }
        return false
    }

    eq(val, val2) {
        return val == val2
    }

    eqeq(val, val2) {
        return val === val2
    }

    required(val) {
        if (val == null || typeof val == 'undefined') {
            return false
        }

        if (typeof val == 'integer') {
            return true
        }

        if (typeof val == 'array') {
            return val.length > 0
        }

        val = String(val)
        return this.len(val, 1, 0)
    }

    boolean(val) {
        if (typeof val == 'boolean') {
            return val;
        }

        if (typeof val == 'string') {
            return ['true', 'false', '0', '1'].indexOf(val.toLowerCase()) >= 0
        }

        if (typeof val == 'integer') {
            return val == 1 || val == 0
        }
        return false
    }

    array(val) {
        return typeof val == 'array'
    }

    object(val) {
        return typeof val == 'object'
    }

    lower(val) {
        return val === val.toLowerCase()
    }

    upper(val) {
        return val === val.toUpperCase()
    }

    port(val) {
        return this.int(val) && this.min(val, 0) && this.max(val, 65535)
    }

    json(val) {
        try {
            var obj = JSON.parse(val);
            return !!obj && typeof obj == 'object'
        } catch (e) {
            return false
        }
    }

    in(val, val2) {
        return val2.indexOf(val) >= 0
    }

    contains(val, val2) {
        if (typeof val2 == 'string') {
            return val.indexOf(val2) >= 0
        }
        if (typeof val2 == 'array' || typeof val2 == 'object') {
            for (var v in val2) {
                if (val.indexOf(val2[v]) == -1) {
                    return false
                }
            }
            return true
        }
        return false
    }

    email(val) {
        var mailReg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        var pattern = new RegExp(mailReg)
        return pattern.test(val)
    }

    mobile(val) {
        var mobileReg = /^((\+|00)86)?1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        var pattern = new RegExp(mobileReg)
        return pattern.test(mobileReg)
    }

    ipv4(val) {
        var ipv4Reg = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
        if (!ipv4Reg.test(val)) {
            return false;
        }

        var parts = val.split('.').sort(function (a, b) {
            return a - b;
        });
        return parts[3] <= 255;
    }

    ipv6(val) {
        var ipv6Block = /^[0-9A-F]{1,4}$/i
        var blocks = val.split(':')
        var foundOmissionBlock = false
        var foundIPv4TransitionBlock = ipv4(blocks[blocks.length - 1])
        var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8

        if (blocks.length > expectedNumberOfBlocks) {
            return false
        }

        if (val === '::') {
            return true
        } else if (val.substr(0, 2) === '::') {
            blocks.shift()
            blocks.shift()
            foundOmissionBlock = true
        } else if (val.substr(val.length - 2) === '::') {
            blocks.pop()
            blocks.pop()
            foundOmissionBlock = true
        }

        for (var i = 0; i < blocks.length; ++i) {
            if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
                if (foundOmissionBlock) {
                    return false
                }

                foundOmissionBlock = true
            } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
            } else if (!ipv6Block.test(blocks[i])) {
                return false
            }
        }

        if (foundOmissionBlock) {
            return blocks.length >= 1
        }

        return blocks.length === expectedNumberOfBlocks
    }

    ip(val) {
        return this.ipv4(val) || this.ipv6(val)
    }

    url(val) {
        var strRegex = '^((https|http|ftp)://)?'
            + '(([\\w_!~*\'()\\.&=+$%-]+: )?[\\w_!~*\'()\\.&=+$%-]+@)?'
            + '(([0-9]{1,3}\\.){3}[0-9]{1,3}'
            + '|'
            + '(localhost)|'
            + '([\\w_!~*\'()-]+\\.)*'
            + '\\w+\\.'
            + '[a-zA-Z]{1,6})'
            + '(:[0-9]{1,5})?'
            + '((/?)|'
            + '(/[\\w_!~*\'()\\.;?:@&=+$,%#-]+)+/?)$'
        var re = new RegExp(strRegex, 'i')
        if (re.test(encodeURI(val))) {
            return true
        }
        return false
    }

    idcard(val) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var pattern = new RegExp(reg)
        return pattern.test(val)
    }

    match(val, reg) {
        var pattern = new RegExp(reg)
        return pattern.test(val)
    }

    string(val) {
        return typeof val == 'string'
    }

    username(val) {
        return this.alnum(val, '_') && this.len(val, 6, 32)
    }

    password(val) {
        var reg = reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,32}$/;
        var pattern = new RegExp(reg)
        return pattern.test(val)
    }

    whitespace(val) {
        return this.contains(val, " ")
    }

    alnum(val, str) {
        str = str || ''
        var reg = eval("/^[a-z0-9A-Z" + str + "]+$/")
        var pattern = new RegExp(reg)
        return pattern.test(val)
    }

    chinese(val) {
        var reg = /^[\u4E00-\u9FA5]+$/
        return reg.test(val)
    }

    date(val) {
        var date = Date.parse(val);
        return !isNaN(date);
    }

    after(val, val2) {
        var date1 = new Date(val)
        var date2 = new Date(val2)
        return date1 && date2 && date1 >= date2
    }

    before(val, val2) {
        var date1 = new Date(val)
        var date2 = new Date(val2)
        return date1 && date2 && date1 <= date2
    }

    blank(val) {
        return this.contains(val, " ") && this.contains(val, "\n") && this.contains(val, "\r") && this.contains(val, "\t")
    }

    custom(val, func) {
        return func(val, this)
    }

    async unique(val, mp, field) {
        var model = require(mp)
        res = await model.findOne({ where: { field: val } })
        return res ? true : false
    }
}

const ValidatorErrorDefine = {
    default: "{field}验证不通过",
    required: "{field}必须填写",
    len: "{field}长度必须是{val1}-{val2}",
    int: "{field}必须是整数",
    numeric: "{field}必须是数值",
    contains: "{field}必须包含({val2})",
    notwhitespace: "{field}不能包含空格",
    notblank: "{field}不能包含空格、换行符",
    username: "{field}格式不正确，只能包含a-z0-9_",
    password: "{field}格式不正确，必须包含数字和英文",
    alnum: "{field}格式不正确，只能包含a-z0-9A-Z{str}",
    ip: "{field}格式不正确",
    url: "{field}不是一个合法的网络地址",
    chinese: "{field}只能包含中文",
    unique: "{field}已经存在",
    after: "{field}必须大于:{val2}",
    before: "{field}必须小于:{val2}",
    string: "{field}必须是字符串",
    date: "{field}必须是日期格式",
    idcard: "{field}格式不正确",
    email: "{field}格式不正确",
    mobile: "{field}格式不正确",
    port: "{field}范围必须是0-65535",
    match: "{field}匹配不成功",
    min: "{field}值必须大于等于{val}",
    max: "{field}值必须小于等于{val}",
    boolean: "{field}值必须是布尔值",
    eq: "{field}必须等于{val}",
    eqeq: "{field}必须全等于{val}",
    json: "{field}必须是json格式",
    ipv4: "{field}必须是一个合法的ip v4地址",
    ipv6: "{field}必须是一个合法的ip v6地址",
    array: "{field}必须是一个数组",
    object: "{field}必须是一个数组",
    lower: "{field}必须是小写",
    upper: "{field}必须是大写",
    in: "{field}值必须是:{val}",
    ascii: "{field}值必须是ascii"
}

const ValidatorKeyDefine = {
    username: "用户名",
    password: "密码",
    email: "邮箱"
}

class Sanitizer {
    int(val) {
        return parseInt(val)
    }

    numeric(val) {
        return parseFloat(val)
    }

    string(val) {
        return val.trim()
    }

    date(val) {
        return new Date(val)
    }

    json(val) {
        return JSON.parse(val)
    }

    boolean(val) {
        var def = { "true": true, "false": false, "1": true, "0": false }
        if (typeof val == 'string') {
            return def[val] || false
        }
        return val
    }

}

const Validator = function (options) {
    options = options || {};
    var funcSymbol = '|'
    var argSymbol = ':'
    var argSubSymbol = ','
    var validatorErrorDefine = ValidatorErrorDefine
    var validatorKeyDefine = ValidatorKeyDefine
    var validatorChecker = new ValidatorChecker
    var listenError = listenErrors
    var sanitizer = new Sanitizer
    var autoSanitizer = true
    var sanitizer = new Sanitizer
    var skipErrorModel = false

    if (options.skipErrorModel) {
        skipErrorModel = options.skipErrorModel
    }

    if (options.autoSanitizer) {
        autoSanitizer = options.autoSanitizer
    }

    if (options.sanitizer) {
        sanitizer = options.sanitizer
    }

    if (options.funcSymbol) {
        funcSymbol = options.funcSymbol
    }

    if (options.argSymbol) {
        argSymbol = options.argSymbol
    }

    if (options.argSubSymbol) {
        argSubSymbol = options.argSubSymbol
    }

    if (options.validatorErrorDefine) {
        validatorErrorDefine = options.validatorErrorDefine
    }

    if (options.validatorKeyDefine) {
        validatorKeyDefine = options.validatorKeyDefine
    }

    if (options.validatorChecker) {
        validatorChecker = options.validatorChecker
    }

    if (options.listenError) {
        listenError = options.listenError
    }

    function vsplit(validatorRules) {
        const vs = {};
        for (var v in validatorRules) {
            if (typeof validatorRules[v] == 'object') {
                vs[v] = validatorRules[v]
            } else {
                var a = validatorRules[v].split(funcSymbol)
                var sv = {}
                for (var cf in a) {
                    var arg = a[cf].split(argSymbol)
                    if (arg.length == 2) {
                        arg[1] = arg[1].split(argSubSymbol)
                    } else {
                        arg[1] = []
                    }
                    sv[arg[0]] = arg[1]

                }
                vs[v] = sv
            }
        }
        return vs
    }

    function merge(keys, values) {
        var params = {}
        for (var a = 0; a < keys.length; a++) {
            params[keys[a]] = values[a]
        }
        return params
    }

    function messageRender(text, values) {
        var reg = /{[a-z0-9_]+}/gi
        var ma = text.match(reg)
        for (var v in ma) {
            var k = ma[v]
            k = k.replace('{', '').replace('}', '')
            if (k in values) {
                text = text.replace(`{${k}}`, values[k])
            }
        }
        return text
    }

    function each(vs, data) {
        var params = []
        var sanitizerData = {}
        for (var key in vs) {
            var rules = vs[key]
            var val = data[key] || ''
            var sval = val

            if (autoSanitizer && typeof sval == 'string') {
                sval = sanitizer.string(sval)
            }

            if (autoSanitizer) {
                sanitizerData[key] = sval
            }

            for (var func in rules) {
                if (func.toLowerCase() == 'optional' && !validatorChecker.required(val)) {
                    break
                }

                var isNot = func.substr(0, 3).toLowerCase() == 'not' ? true : false
                var runFunc = isNot ? func.substr(3, func.length + 1).toLowerCase() : func
                // console.log(runFunc)
                var ps = getParameterNames(validatorChecker[runFunc])
                // console.log("autoSanitizer:", autoSanitizer, sanitizer.hasOwnProperty(runFunc), runFunc, sanitizer, validatorChecker)
                // process.exit()
                if (autoSanitizer && runFunc in sanitizer) {
                    sval = sanitizer[runFunc](sval)
                    sanitizerData[key] = sval

                }

                try {
                    if (typeof rules[func] == 'object' && ps.length < rules[func].length + 1) {
                        var res = validatorChecker[runFunc].apply(validatorChecker, [val, rules[func]])
                    } else {
                        var res = validatorChecker[runFunc].apply(validatorChecker, [val].concat(rules[func]))
                    }
                    var r = isNot ? res : !res
                } catch (err) {
                    listenErrors("checkerException", [], err)
                    var r = false
                }

                if (r) {
                    if (typeof rules[func] == 'object' && ps.length < rules[func].length + 1) {
                        var m = merge(ps, [val, rules[func].join(",")])
                    } else {
                        var m = merge(ps, [val].concat(rules[func]))
                    }
                    var message = validatorErrorDefine[func] || validatorErrorDefine["default"]
                    m['field'] = `{${key}}`
                    message = messageRender(message, m)
                    message = messageRender(message, validatorKeyDefine)
                    params.push({ field: key, type: func, message: message })
                    break
                }
            }

            if (!skipErrorModel && params.length >= 1) {
                break
            }
        }
        return [params, sanitizerData]
    }

    function listenErrors(errorType, params, e) {
        console.log(errorType, params, e)
    }

    return {
        _params: [],
        _errorType: null,
        _exception: null,
        _intputData: {},
        _sanitizerData: {},
        extend: (options) => {
            if (options.validatorErrorDefine) {
                validatorErrorDefine = Object.assign(validatorErrorDefine, options.validatorErrorDefine)
            }

            if (options.validatorKeyDefine) {
                validatorKeyDefine = Object.assign(validatorKeyDefine, options.validatorKeyDefine)
            }

            if (options.validatorChecker) {
                validatorChecker = Object.assign(validatorChecker, options.validatorChecker)
            }

            if (options.sanitizer) {
                sanitizer = Object.assign(sanitizer, options.sanitizer)
            }
        },

        isValid: (data, validatorRules) => {
            this._intputData = data
            this._params = []
            try {
                var vs = vsplit(validatorRules)
                var res = each(vs, data)
                this._params = res[0]
                this._sanitizerData = res[1]
            } catch (error) {
                listenError("parser", this.params, error)
                return false
            }

            if (this._params.length != 0) {
                listenError("checker", this._params, '')
            }

            return this._params.length == 0
        },

        getInputData: () => {
            return this._intputData
        },

        getSanitizerData: () => {
            return this._sanitizerData
        },

        getErrors: () => {
            return this._params
        },

        getErrorsByKeyValue: () => {
            var ob = {}
            for (var i in this._params) {
                ob[this._params[i]["field"]] = this._params[i]["message"]
            }
            return ob
        },

        getChecker: () => {
            return validatorChecker
        }
    }
}

module.exports = {
    ValidatorChecker,
    ValidatorErrorDefine,
    ValidatorKeyDefine,
    Validator,
    Sanitizer
}