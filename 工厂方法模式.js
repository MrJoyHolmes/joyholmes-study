var Factory = function (type, content) {
    if (this instanceof Factory) {
        console.log("构造函数模式",type)
        var s = new this[type](content);
        return s;
    } else {
        console.log("直接执行模式",type)
        return new Factory(type, content);
    }
};

//工厂原型中设置创建类型数据对象的属性
Factory.prototype = {
    Java: function (content) {
        console.log("Java值为", content);
    },
    PHP: function (content) {
        console.log("PHP值为", content);
    },
    Python: function (content) {
        console.log("Python值为", content);
    }
};

//测试用例
Factory("Python", "我是Python");
let factory = new Factory("Java", "我是Java");
