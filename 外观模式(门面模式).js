// 也可译为门面模式。它为子系统中的一组接口提供一个一致的界面， Facade模式定义了一个高层接口，
// 这个接口使得这一子系统更加容易使用。引入外观角色之后，使用者只需要直接与外观角色交互，
// 使用者与子系统之间的复杂关系由外观角色来实现，从而降低了系统的耦合度。

// https://www.cnblogs.com/linda586586/p/4237093.html

// 另外一个例子，比如经常会用js设置元素的颜色、尺寸：
var element = document.getElementById("content");
content.style.color = "red";
content.style.height = "200px";

// 可以对这个操作进行包装：
function setStyles(id, styles) {
    var element = document.getElementById(id);
    for (var key in styles) {
        if (styles.hasOwnProperty(key)) {
            element.style[key] = styles[key];
        }
    }
}

setStyles("content", {
    color: "red",
    height: "200px"
});

// 如果有一批元素，需要设置同样的属性，可以进行再次包装：

function setCSS(ids, styles) {
    for (var i = 0, len = ids.length; i < len; i++) {
        setStyles(ids[i], styles);
    }
}
