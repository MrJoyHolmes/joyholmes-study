// 原型链继承
function Animal(name, age) {
    this.name = name || "Animal";
    this.age = age || 0;
    this.type = ["1", "2"];
    this.sleep = function () {
        console.log(this.name + "sleep");
    };
}
Animal.prototype.eat = function (food) {
    console.log(this.name + "sleep" + food);
};

function Cat(name, color) {
    this.name = name || "Cat";
    this.color = color || "gray";
}

Cat.prototype = new Animal();

let cat1 = new Cat("miaomiao", "orange");
let cat2 = new Cat("mimi", "white");
cat1.type.push("3");
console.log(cat2.type);

// 特点：

// 非常纯粹的继承关系，实例是子类的实例，也是父类的实例
// 父类新增原型方法/原型属性，子类都能访问到
// 简单，易于实现
// 缺点：

// 要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行，不能放到构造器中
// 无法实现多继承
// 来自原型对象的所有属性被所有实例共享（来自原型对象的引用属性是所有实例共享的）（详细请看附录代码： 示例1）
// 创建子类实例时，无法向父类构造函数传参

// 2、借用构造函数继承
function Dog(name, age, color) {
    Animal.call(this, name, age);
    this.color = color || "gray";
}

let dog = new Dog("wangwang", 3, "balck");

// 重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
// 　　　　特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
// 　　　　　　　2、解决了原型链继承缺点1、2、3。
// 　　　　　　　3、可以继承多个构造函数属性（call多个）。
// 　　　　　　　4、在子实例中可向父实例传参。
// 　　　　缺点：1、只能继承父类构造函数的属性。无法继承原型链上的属性方法。
// 　　　　　　　2、无法实现构造函数的复用。（每次用每次都要重新调用）
// 　　　　　　　3、每个新实例都有父类构造函数的副本，臃肿。

// 3、组合继承

function Chicken(name, age, color) {
    // 继承Animal构造函数里面的属性
    Animal.call(this, name, age);
    this.color = color || "gray";
}

// 继承Animal原型链中的属性，实例属性也继承，被上面call继承覆盖，没有作用并修改构造函数指向
Chicken.prototype = new Animal();
Chicken.prototype.constructor = Chicken;

// 特点：

// 弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
// 既是子类的实例，也是父类的实例
// 不存在引用属性共享问题
// 可传参
// 函数可复用
// 缺点：

// 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）

// 4、寄生组合继承

function Duck(name, age, color) {
    // 继承Animal构造函数里面的属性
    Animal.call(this, name, age);
    this.color = color || "yellow";
}

// 继承Animal原型链中的属性，并修改构造函数指向
(function () {
    // 构造纯净的函数，这里只需要继承Animal原型即可
    function Super() {}
    Super.prototype = Animal.prototype;
    Duck.prototype = new Super();
    Duck.prototype.constructor = Duck;
})();

