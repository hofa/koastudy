const { ValidatorChecker,
    ValidatorErrorDefine,
    ValidatorKeyDefine,
    Validator, Sanitizer } = require('./validator2')

const validatorRules = {
    // username: "required|len:6,32|unique:user,username",
    username: "required|len:7,32",
    password: "required",
    email: "required|email",
    email2: "email",
    num: "eq:1",
    num1: "eqeq:2",
    num2: "min:3|max:255",
    num3: "int",
    num4: "numeric",
    // date: "date",
    // mobile: "match:^1[3|4|5|7|8]\d{9}$",
    mobile: { match: /^1[3|4|5|7|8]\d{9}$/ },
    json: "json",
    array: "array",
    bool: "boolean",
    string: "string"
};

const postData = {
    "username": "a12345_!",
    "password": "abasdfas",
    "email": "firebel@163.com",
    "email2": "",
    "chinese": "中国人",
    "chinese2": "",
    "num": 1,
    "idcard": "445381198912254533",
    "date": "2019-08-12",
    "date2": "2019-08-12 12:11:00",
    "date3": "2019-08-12 12:11:00",
    "notchinese": "123",
    "contains": "qabc12345555",
    "aaa": "abc a",
    "num1": "10",
    "url": "https://www.google.com",
    "ip": "127.0.0.1",
    "username2": "liudehua001",
    "password": "a123456",
    "boolean": "1",
    "json": '{"a": "1"}',
    "lower": "abc",
    "upper": "ABC",
    "numeric": "17.90",
    "numeric2": 17.90,
    "in": "bbc",
    "notin": "bbbc",
    "email": "418796716@qq.com",
    "custom": "abc1234",
    "abcd": " adfasdfasdf "
}

var a = 1
const validatorRules1 = {
    "username": "required|len:6,32|alnum:_!",
    "password": "required",
    "chinese": "chinese",
    "chinese2": "optional|chinese",
    "num": `required|eq:${a}`,
    "idcard": "idcard",
    "date": "date",
    "date2": "date",
    "date3": { "date": "", "before": "2019-08-12 13:11:00", "after": "2019-08-12 12:11:00" },
    "notchinese": "notchinese",
    "contains": "contains:a,b,c|notwhitespace",
    "aaa": "whitespace",
    "num1": "int|min:2|max:10",
    "url": "url",
    "ip": "ip",
    "username2": "username",
    "password": "password",
    "boolean": "boolean",
    "json": "json",
    "lower": "lower",
    "upper": "upper",
    "numeric": "numeric",
    "numeric2": "numeric",
    "in": "in:abc,bbc",
    "notin": "notin:abc,bbc",
    "email": "email",
    "custom": {
        custom: function (val) {
            return true
        }
    },
    "abcd": "abcd:1,32"
}

const v = Validator()
// const v = Validator({
//     listenError: (errorType, params, exception) => {


//     }
// })
v.extend({
    validatorErrorDefine: {
        email: "{field}格式不正确",
        abcd: "{field}测试v1={val1}, v2={val2}"
    },
    validatorKeyDefine: {
        email: '邮箱',
        abcd: '{我是测试字段}'
    },
    validatorChecker: {
        abcd: (val, val1, val2) => {
            return v.getChecker().len(val, val1, val2)
        }
    }
})
if (v.isValid(postData, validatorRules1)) {
    console.log("vali success");
} else {
    console.log('vali error', v.getErrors())
    console.log('vali error2', v.getErrorsByKeyValue())
}

var sPostData = v.getSanitizerData()
console.log("sanitizerData", sPostData)

// const assert = require('assert')

// const checker = new Checker()
// r = checker.len("abc", 1, 5)
// assert.equal(r, true)

// r = checker.len("abc", 4, 5)
// assert.equal(r, false)

// r = checker.len("abc", 2, 2)
// assert.equal(r, false)

// r = checker.len("abc", 2)
// assert.equal(r, true)

// r = checker.int("123")
// assert.equal(r, true)

// r = checker.int("a12")
// assert.equal(r, false)

// r = checker.int(123)
// assert.equal(r, true)

// r = checker.numeric("123")
// assert.equal(r, true)

// r = checker.numeric("12.3")
// assert.equal(r, true)

// r = checker.numeric(12.3)
// assert.equal(r, true)


// class A {
//     b() {
//         console.log("hello")
//     }

//     c() {
//         this.b()
//     }
// }
// var a = new A()
// a["c"].apply(a, [])

// var sanitizer = new Sanitizer
// console.log(sanitizer["int"]("1"))
console.log("finish!")



