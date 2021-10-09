// 只允许被实例化依次的类
let Single = function(name) {
    this.name = name;
}

Single.prototype.getName = function() {
    return this.name;
}

let getInstance = (function() {
    let instance = null;
    return function(name) {
        if(instance) {
            return instance;
        } else {
            return new Single(name);
        }
    }
})()

// 测试单体模式的实例,所以one===two
let one = getInstance("one");
let two = getInstance("two");