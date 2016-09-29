/* @preserve
 * TERMS OF USE - PROPHETJS
 * Open source under the MIT License.
 * Copyright 2016 Amin Mohamed Ajani All rights reserved.
 */

/**
 * Polyfill DATE.NOW
 * Production steps of ECMA-262, Edition 5, 15.4.4.19 */
if (!Date.now) { Date.now = function now() { return new Date().getTime(); }; }
/**
 * Polyfill ARRAY MAP
 * Production steps of ECMA-262, Edition 5, 15.4.4.19
 * Reference: http://es5.github.io/#x15.4.4.19 */
if (!Array.prototype.map) {
   Array.prototype.map = function(callback, thisArg) {
        var T, A, k;
        if (this == null)  throw new TypeError(' this is null or not defined');
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function')  throw new TypeError(callback + ' is not a function');
        if (arguments.length > 1)  T = thisArg;
        A = new Array(len); k = 0;
        while (k < len) { var kValue, mappedValue;
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

interface IStylePreset {
    type : string;
    backgroundColor : string;
    color : string
}
interface IMessageOptions{
    id? : number;
    text : string;
    type?: string;
    duration? :number; //defaults to 3000 milliseconds
    class? : string;
    onClickCallback?: Function;
}


class Message{
    static Util = {
        find : (objArr : Array<IStylePreset>, keyToFind : string) : number => {
                var foundPos = objArr.map(function(preset){ return preset.type; }).indexOf(keyToFind);
                return foundPos;
            },
        toDash: (prop : string): string => {
                return prop.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
        }
    };
    static Dbg = {
        stackTrace: (): void => console.dir(Message.Stack),
        presets: () : void => console.dir(Message.stylePresets)

    };
    static parent : HTMLElement = document.getElementById('prophet');
    static stylePresets : Array<IStylePreset> = [
        { type: "default", backgroundColor: "#37474f" , color: "#ECEFF1"},
        { type: "success", backgroundColor: "#37474f", color: "#ECEFF1" },
        { type: "error", backgroundColor: "#d32f2f", color: "#EEE"}
        ];
    static config : Object = {
        types(newPresets : IStylePreset | Array<IStylePreset>) : void {
            newPresets = [].concat(newPresets);
            for(var i = 0, len = newPresets.length, current; i< len; i++){
                var pos = Message.Util.find(Message.stylePresets, newPresets[i].type)
                current = newPresets[i];
                if(pos !== -1) for(var key in current) Message.stylePresets[pos][key] = current[key];
                else Message.stylePresets[Message.stylePresets.length] = current;
            }
        }
    };
    static Stack : Array<Message> = [];
    static idGen() : number{
        return Date.now()%10000;
    }
    _id : number;
    _text : string;
    _type: string;
    _duration :number; //defaults to 3000 milliseconds
    _class : string;
    onClickCallback: Function;


    /*Todo: list of promise-like callbacks, buttons, icons, */
    /*Todo: Take position parameters and calculate placement via screen. and screen.height*/
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

    constructor(options : IMessageOptions, cb : Function) {
        this._text = typeof(options) === "string" ? options : options.text;
        this._type = options.type ? options.type : "default";
        this._id = options.id ? options.id : Message.idGen();
        this._duration = +options.duration ? +options.duration : 4000;
        this._class = options.class ? " "+options.class : "";
        if(typeof(options.onClickCallback) === "function"){
            this.onClickCallback = options.onClickCallback;
            if(cb) cb = options.onClickCallback;
        } /*Override cb if an onclick callback is present*/
        Message.Stack[Message.Stack.length] = this;
        return this.init(cb);
    }
    init(cb : Function ): Message{
        var _this = this;
        var cbFired : boolean = false;
        var toast = document.createElement('li');
        [toast.className, toast.innerText] = ["message"+ this._class, this._text];
        this.stylize(toast);
        toast.addEventListener('click', function(){
            toast.classList.remove('prophet-message-active');
            Message.parent.removeChild(toast);
            if(_this.onClickCallback) _this.onClickCallback(_this._id);
            cbFired = true;
        });
        Message.parent.appendChild(toast);
        setTimeout(function(){
            toast.classList.add('prophet-message-active');
        },10);
        setTimeout(function(){
            toast.classList.remove('prophet-message-active');
            if(!cbFired) if(cb) cb(_this._id);
            Message.parent.removeChild(toast);
            //catch when user manually clears the notification
        },this._duration);
        return this;
    }
    stylize(toast : HTMLElement){
        console.dir(this);
        console.dir(toast);
        var foundPos = Message.Util.find(Message.stylePresets,this._type);
        /*Make all copying loop instead of manual in next ver*/
        /*Todo: Make default in else block*/
        if (foundPos !== -1){
            toast.style.backgroundColor = Message.stylePresets[foundPos].backgroundColor;
            toast.style.color = Message.stylePresets[foundPos].color;
        }
    }
    
}


