// 不改变原对象的基础上,给对象添加属性或方法
let decorator = function (input, fn) {
    let inputObj = document.getElementById(input);
    if (typeof inputObj.onclick == "function") {
        let oldClickFn = inputObj.onclick;
        inputObj.onclick = function () {
            oldClickFn();
            fn();
        };
    } else {
        inputObj.onclick = fn;
    }
};

//测试用例
decorator("textInp", function () {
    console.log("文本框执行啦");
});
decorator("btn", function () {
    console.log("按钮执行啦");
});
