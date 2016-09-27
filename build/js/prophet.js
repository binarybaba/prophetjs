/* @preserve
 * TERMS OF USE - PROPHETJS
 * Open source under the MIT License.
 * Copyright 2016 Amin Mohamed Ajani All rights reserved.
 */
/**
 * Polyfill DATE.NOW
 * Production steps of ECMA-262, Edition 5, 15.4.4.19 */
if (!Date.now) {
    Date.now = function now() { return new Date().getTime(); };
}
/**
 * Polyfill ARRAY MAP
 * Production steps of ECMA-262, Edition 5, 15.4.4.19
 * Reference: http://es5.github.io/#x15.4.4.19 */
if (!Array.prototype.map) {
    Array.prototype.map = function (callback, thisArg) {
        var T, A, k;
        if (this == null)
            throw new TypeError(' this is null or not defined');
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function')
            throw new TypeError(callback + ' is not a function');
        if (arguments.length > 1)
            T = thisArg;
        A = new Array(len);
        k = 0;
        while (k < len) {
            var kValue, mappedValue;
            if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue;
            }
            k++;
        }
        return A;
    };
}
var Message = (function () {
    function Message(message, id) {
        this.message = message ? message : 'Success!';
        this.id = id ? id : Message.idGen();
        //TODO: make stack of notifications and remove them
        var notification = document.createElement('li');
        _a = ["message", this.message], notification.className = _a[0], notification.innerText = _a[1];
        Message.parent.appendChild(notification);
        setTimeout(function () {
            notification.classList.remove('active');
            Message.parent.removeChild(notification); //catch when user manually clears the notification
        }, 3000);
        notification.addEventListener('click', function () {
            notification.classList.remove('active');
            Message.parent.removeChild(notification);
        });
        setTimeout(function () {
            notification.classList.add('active');
        }, 10);
        return this;
        var _a;
    }
    Message._showStyles = function () {
        /*console.dir(Message.styleList);*/
        console.dir(Message.stylePresets);
    };
    Message.prototype.stylize = function (a) {
        console.dir(a);
    };
    Message.idGen = function () {
        return Date.now();
    };
    /*Todo: set min width of li elements and and find a way to animate the stack up by maybe
    * Todo: setting storing the position and animate them up;
    * Todo: Make notification fadeout in like 3 seconds after active configurable
    * */
    Message.parent = document.getElementById('prophet');
    Message.stylePresets = [
        { type: "default", "background-color": "#37474f", color: "#ECEFF1" },
        { type: "success", "background-color": "#37474f", color: "#ECEFF1" },
        { type: "error", "background-color": "#d32f2f", color: "#EEE" }
    ];
    Message.set = {
        /*TODO: set extra types and modify existing types*/
        types: function (custom) {
            var more = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                more[_i - 1] = arguments[_i];
            }
        }
    };
    return Message;
}());
//# sourceMappingURL=prophet.js.map