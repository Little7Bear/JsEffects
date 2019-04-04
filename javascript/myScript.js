
/**
 * 缓动动画
 * @param {*} element 
 * @param {*{"left":100,"width":500,...}} json 
 * @param {Function} fn 
 */
function buffer(element, json, fn) {
    clearInterval(element.timer);
    var begin = 0, target = 0, speed = 0, flag;

    element.timer = setInterval(function () {
        flag = true;
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                if ("opacity" === key) {//设置透明度
                    begin = Math.round(parseFloat(getCSSAttrValue(element, key)) * 100);
                    target = parseInt(parseFloat(json[key] * 100));
                } else if ("scrollTop" === key) {
                    begin = Math.ceil(element.scrollTop);
                    target = parseInt(json[key]);
                } else {
                    begin = parseInt(getCSSAttrValue(element, key)) || 0;
                    target = parseInt(json[key]);
                }

                speed = (target - begin) * 0.2;
                speed = target > begin ? Math.ceil(speed) : Math.floor(speed);
                if ("opacity" === key) {
                    element.style.opacity = (begin + speed) / 100;
                    element.style.filter = 'alpha(opacity=' + (begin + speed) + ')';
                } else if ("scrollTop" === key) {
                    element.scrollTop = begin + speed;
                } else if ("zIndex" === key) {
                    element.style[key] = json[key];
                } else {
                    element.style[key] = begin + speed + 'px';
                }

                if (begin !== target) {
                    flag = false;
                };

                if (flag) {
                    clearInterval(element.timer);
                    if (fn) {
                        fn();
                    }
                };
            };
        };
    }, 20);
};

//获得css的样式值
function getCSSAttrValue(element, attr) {
    if (element.currentStyle) {
        return element.currentStyle;
    } else {
        return window.getComputedStyle(element, null)[attr];
    };
};

/**
 * 匀速动画
 * @param {*} element 
 * @param {*目标值} target 
 * @param {*步长} speed 
 */
function constant(element, target, speed) {
    clearInterval(element.timer);
    var dir = element.offsetLeft < target ? speed : -speed;
    element.timer = setInterval(function () {
        element.style.left = element.offsetLeft + dir + 'px';
        if (Math.abs(target - element.offsetLeft) < Math.abs(dir)) {
            clearInterval(element.timer);
            element.style.left = target + 'px';
        }
    }, 20);
};

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

/**
 *返回兼容的元素宽度或高度,用法：client().height 或者 client().width
 */
function client() {
    if (window.innerWidth !== null) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    } else if (document.compatMode === 'CSS1Compat') {	//判断是不是W3c标准的浏览器
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    };
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    };
};

/**
 * 返回兼容的scrollTop或scrollWidth,用法：scroll().top 或者 scroll().left
 */
function scroll() {
    if (window.pageXOffset !== null) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        };
    } else if (document.compatMode === 'CSS1Compat') {	//判断是不是W3c标准的浏览器
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollWidth
        };
    };
    return {
        top: document.body.scrollTop,
        left: document.body.scrollWidth
    };
};