// call

// es3
Function.prototype.call2 = function (context) {
    var context =
        (Object.keys(Object(context)).length ? Object(context) : window) ||
        global;
    context.fn = this;

    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push("arguments[" + i + "]");
    }

    var result = eval("context.fn(" + args + ")");
    delete context.fn;
    return result;
};

// 测试一下
var value = 2;

var obj = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    };
}

bar.call(null); // 2

console.log(bar.call2(null, "kevin", 18));

// se6
Function.prototype.newCall = function (context, ...params) {
    if (typeof context === "object" || typeof context === "function") {
        context = context || window;
    } else {
        context = Object.create(null);
    }

    let fn = Symbol();
    context[fn] = this;
    const res = context[fn](...params);
    delete context[fn]; //不能delete context.fn,Symbol 值作为对象属性名时，不能用点运算符
};

// apply

// es3
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push("arr[" + i + "]");
        }
        result = eval("context.fn(" + args + ")");
    }

    delete context.fn;
    return result;
};

// es6
Function.prototype.newApply = function (context, parameter) {
    if (typeof context === "object" || typeof context === "function") {
        context = context || window;
    } else {
        context = Object.create(null);
    }
    let fn = Symbol();
    context[fn] = this;
    const res = context[fn](...parameter);
    delete context[fn];
    return res;
};
let person = {
    name: "Abiel"
};
function sayHi(age, sex) {
    console.log(this.name, age, sex);
}
sayHi.newApply(person, [25, "男"]); //Abiel 25 男


