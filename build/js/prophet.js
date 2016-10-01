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
/*
 Todo: Make parent margin-left change on xs, sm, md, and lg ref: https://uxpin.s3.amazonaws.com/responsive_web_design_cheatsheet.pdf

 Todo: Wrap it up in a function and call it on this.stylize() and window.resize*/
Message.Util.rePosition();
window.addEventListener('resize', Message.Util.rePosition);
var Message = (function () {
    /*Todo: Take position parameters and calculate placement via screen. and screen.height */
    function Message(text, options, cb) {
        this._id = Message.idGen();
        this._text = text ? text : "Awesome! Got it.";
        if (typeof (options) === "function")
            this.cb = options;
        else if (typeof (options) === "object" && !Array.isArray(options)) {
            this._type = options.type || "default";
            this._id = options.id || Message.idGen();
            this._duration = options.duration || 4000;
            this._class = options.class || "";
        }
        this.cb = typeof (options) === "function" ? options : cb;
        /*this._type = options.type ? options.type.toLowerCase() : "default";
        this._id = options.id ? options.id : Message.idGen();
        this._duration = +options.duration ? +options.duration : 4000;
        this._class = options.class ? " "+options.class : "";*/
        Message.Stack[Message.Stack.length] = this;
        this.init();
        return this;
    }
    Message.idGen = function () {
        return Date.now() % 10000;
    };
    /*Todo: make single clear function in future which clears a specific toast by taking an id as a param. if no id, clears all*/
    Message.clearAll = function () {
        var messages = document.querySelectorAll('ul#prophet > li');
        for (var i = 0, len = messages.length; i < len; i++) {
            messages[i].classList.remove('prophet-message-active');
            Message.parent.removeChild(messages[i]);
        }
    };
    Message.prototype.init = function () {
        var _this = this;
        this.cbFired = false;
        this.toast = document.createElement('li');
        var toast = this.toast;
        _a = ["message " + this._class, this._text], toast.className = _a[0], toast.innerText = _a[1];
        this.stylize();
        toast.addEventListener('click', function () {
            toast.classList.remove('prophet-message-active');
            if (_this.cb) {
                _this.cb(_this._id);
                _this.cbFired = true;
            }
            Message.parent.removeChild(toast);
        });
        var _a;
    };
    Message.prototype.show = function () {
        var _this = this;
        var toast = this.toast;
        Message.parent.appendChild(this.toast);
        setTimeout(function () {
            toast.classList.add('prophet-message-active');
        }, 10);
        setTimeout(function () {
            toast.classList.remove('prophet-message-active');
            try {
                Message.parent.removeChild(toast);
            }
            catch (e) { }
            if (!_this.cbFired)
                if (_this.cb)
                    _this.cb(_this._id);
        }, this._duration);
        return this;
    };
    Message.prototype.stylize = function () {
        var foundPos = Message.Util.find(Message.stylePresets, this._type);
        /*Make all copying loop instead of manual in next ver*/
        /*Todo: Make default in else block*/
        if (foundPos !== -1) {
            this.toast.style.backgroundColor = Message.stylePresets[foundPos].backgroundColor;
            this.toast.style.color = Message.stylePresets[foundPos].color;
        }
        /* this.toast.style.maxWidth = Message.Util.getSizes().width*0.4+'px';
        console.info(Message.Util.getSizes().width);*/
    };
    Message.Util = {
        find: function (objArr, keyToFind) {
            return objArr.map(function (preset) { return preset.type; }).indexOf(keyToFind);
        },
        toDash: function (prop) {
            return prop.replace(/([A-Z])/g, function ($1) { return "-" + $1.toLowerCase(); });
        },
        getSizes: function () {
            var viewportwidth;
            var viewportheight;
            // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
            if (typeof window.innerWidth != 'undefined') {
                viewportwidth = window.innerWidth, viewportheight = window.innerHeight;
            }
            else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
                viewportwidth = document.documentElement.clientWidth,
                    viewportheight = document.documentElement.clientHeight;
            }
            else {
                viewportwidth = document.getElementsByTagName('body')[0].clientWidth, viewportheight = document.getElementsByTagName('body')[0].clientHeight;
            }
            return { width: viewportwidth, height: viewportheight };
        },
        rePosition: function () {
        }
    };
    Message.Dbg = {
        stackTrace: function () { return console.dir(Message.Stack); },
        presets: function () { return console.dir(Message.stylePresets); }
    };
    Message.parent = document.getElementById('prophet');
    Message.stylePresets = [
        { type: "default", backgroundColor: "#1c2e2d", color: "#FAFAFA" },
        { type: "success", backgroundColor: "#4daf7c", color: "#FAFAFA" },
        { type: "error", backgroundColor: "#D45A43", color: "#FAFAFA" }
    ];
    Message.config = {
        types: function (newPresets) {
            newPresets = [].concat(newPresets);
            for (var i = 0, len = newPresets.length, current; i < len; i++) {
                var pos = Message.Util.find(Message.stylePresets, newPresets[i].type);
                current = newPresets[i];
                if (pos !== -1)
                    for (var key in current)
                        Message.stylePresets[pos][key] = current[key];
                else
                    Message.stylePresets[Message.stylePresets.length] = current;
            }
        }
    };
    Message.Stack = [];
    return Message;
}());
Message.Util.rePosition();
//# sourceMappingURL=prophet.js.map