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
/*Todo: Implemenet for better type checking
interface  IStylePreset {
    type : string;
    backgroundColour : string;
    color: string;
}
interface IStylePresets extends Array<IStylePreset>{}
 */
/* :::CURRENT FEATURES:::::::::::::::::::::::::
* a. Override supported auto-generated ID
* b. 3 presets: error, success, default
* c. Support for setting new presets along with color codes
* d. A stack of all Messages delivered by prophet
* e. support for new classes to override
* f. support for a single callback function*/
var Message = (function () {
    /*Todo: list of promise-like callbacks, buttons, icons, */
    /*
    @param options Object of options
        @param options.text the text of the message
        @param options.type the type of message (success, error, custom...)
        @param options.id the id of the message
        @param options.duration duration of the message
        @param options.class string of custom classes
        @param options.onClickCallback function to execute when clicked on notification
     @param cb callback to execute after the message is auto-removed (gets overridden if onClickCallback is specified)
    */
    function Message(options, cb) {
        /*initializations with defaults*/
        var _this = this;
        var cbFired = false;
        this._text = typeof (options) === "string" ? options : options.text;
        this._type = options.type ? options.type : "default";
        this._id = options.id ? options.id : Message.idGen();
        this._duration = +options.duration ? +options.duration : 4000;
        this._class = options.class ? " " + options.class : "";
        /*this.onClickCallback = typeof(options.onClickCallback) === "function" ? options.onClickCallback : false*/
        if (typeof (options.onClickCallback) === "function") {
            this.onClickCallback = options.onClickCallback;
            if (cb)
                cb = options.onClickCallback;
        }
        /*TODO: Override cb with on clickcallback and use cbFired to prevent double firing on away*/
        Message.Stack[Message.Stack.length] = this;
        /*Creation*/
        var notification = document.createElement('li');
        _a = ["message" + this._class, this._text], notification.className = _a[0], notification.innerText = _a[1];
        this.stylize(notification);
        notification.addEventListener('click', function () {
            notification.classList.remove('prophet-message-active');
            if (_this.onClickCallback)
                _this.onClickCallback(_this._id);
            cbFired = true;
            Message.parent.removeChild(notification);
        });
        Message.parent.appendChild(notification);
        setTimeout(function () {
            notification.classList.add('prophet-message-active');
        }, 10);
        setTimeout(function () {
            notification.classList.remove('prophet-message-active');
            if (!cbFired)
                if (cb)
                    cb(_this._id);
            Message.parent.removeChild(notification);
            //catch when user manually clears the notification
        }, this._duration);
        return this; // for chaining
        var _a;
    }
    Message.idGen = function () {
        return Date.now();
    };
    Message.prototype.type = function (type) {
        this._type = type;
        console.dir(this);
        /*TODO: add css of the notification*/
        return this;
    };
    Message.prototype.stylize = function (notification) {
        notification.style;
    };
    Message.Util = {
        find: function (objArr, keyToFind) {
            var foundPos = objArr.map(function (preset) { return preset.type; }).indexOf(keyToFind);
            return foundPos;
        }
    };
    Message.Dbg = {
        stackTrace: function () { return console.dir(Message.Stack); },
        presets: function () { return console.dir(Message.stylePresets); }
    };
    Message.parent = document.getElementById('prophet');
    Message.stylePresets = [
        { type: "default", backgroundColor: "#37474f", color: "#ECEFF1" },
        { type: "success", backgroundColor: "#37474f", color: "#ECEFF1" },
        { type: "error", backgroundColor: "#d32f2f", color: "#EEE" }
    ];
    Message.config = {
        /*TODO: set extra types and modify existing types*/
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
//# sourceMappingURL=prophet.js.map