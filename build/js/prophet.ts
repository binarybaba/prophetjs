/*!
 * Prophetjs v0.0.9
 * Copyright 2016 Amin Mohamed Ajani (http://allrightamin.xyz, http://twitter.com/AminSpeaks)
 * Open source under the MIT License (https://github.com/binarybaba/prophetjs/blob/master/LICENSE)
 * All rights reserved.
 */


/**
 * Polyfill DATE.NOW
 * Production steps of ECMA-262, Edition 5, 15.4.4.19 */
if (!Date.now) { Date.now = function now() { return new Date().getTime(); }; }
/**
 * Polyfill ARRAY.MAP
 * */

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
/*Polyfill TEXTCONTENT for IE8*/
if (Object.defineProperty
    && Object.getOwnPropertyDescriptor
    && Object.getOwnPropertyDescriptor(Element.prototype, "textContent")
    && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
    (function() {
        var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
        Object.defineProperty(Element.prototype, "textContent",
            {
                get: function() {
                    return innerText.get.call(this);
                },
                set: function(s) {
                    return innerText.set.call(this, s);
                }
            }
        );
    })();
}

interface IStylePreset {
    type : string;
    backgroundColor : string;
    color : string
}
interface IMessageOptions{
    id? : number;
    type?: string;
    duration? :number; //defaults to 4000 milliseconds
    class? : string;
    position?: string; ///*NEXTVER: left,right,center?: */

}


class Message{
    static Util = {
        find : (objArr : Array<IStylePreset>, keyToFind : string) : number => {
                return objArr.map(function(preset){ return preset.type; }).indexOf(keyToFind);                
            },
        toDash: (prop : string): string => {
                return prop.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
        },
        getSizes: () =>{
            var viewportwidth;
            var viewportheight;
            // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
            if (typeof window.innerWidth != 'undefined'){ viewportwidth = window.innerWidth, viewportheight = window.innerHeight }
            // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
            else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
                viewportwidth = document.documentElement.clientWidth,
                viewportheight = document.documentElement.clientHeight
            }
            // older versions of IE
            else{ viewportwidth = document.getElementsByTagName('body')[0].clientWidth, viewportheight = document.getElementsByTagName('body')[0].clientHeight }
            return { width: viewportwidth , height:viewportheight}

        },
        rePosition: () :void =>{

            var width = Message.Util.getSizes().width;
            /*NEXTVER: portrait and landscape modes*/
            var height = Message.Util.getSizes().height;
            var p = <HTMLElement>document.getElementsByClassName('prophet')[0];
            if(width<240) p.style.marginLeft="10px";
            else if (width>240 && width < 320)  p.style.marginLeft=0.3*width+"px";
            else if (width>320 && width < 480)  p.style.marginLeft=0.35*width+"px";
            else if (width>480 && width < 600)  p.style.marginLeft=0.5*width+"px";
            else if (width>600 && width < 720)  p.style.marginLeft=0.6*width+"px";
            else if (width>720 && width < 1024) p.style.marginLeft=0.7*width+"px";
            else if (width > 1024) p.style.marginLeft=(0.75*width)+"px";
            else if (width > 1024) p.style.marginLeft=(0.75*width)+"px";

        }

    };
    static Dbg = {
        stackTrace: (): void => console.dir(Message.Stack),
        presets: () : void => console.dir(Message.stylePresets)
    };
    static parent : HTMLElement = <HTMLElement>document.getElementsByClassName('prophet')[0];
    static stylePresets : Array<IStylePreset> = [
        { type: "default", backgroundColor: "#1c2e2d" , color: "#FAFAFA"},
        { type: "success", backgroundColor: "#4daf7c", color: "#FAFAFA" },
        { type: "error", backgroundColor: "#D45A43", color: "#FAFAFA"}
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
    /*NEXTVER: make single clear function in future which clears a specific toast by taking an id as a param. if no id, clears all*/
    static clearAll() : void {
        var messages = document.querySelectorAll('ul.prophet > li');
        for(var i = 0, len = messages.length; i< len; i++){
            messages[i].classList.remove('prophet-message-active');
            Message.parent.removeChild(messages[i]);
        }
    }

    _id : number;
    _text : string;
    _type: string;
    _duration :number;
    _class : string;
    cbFired:boolean;
    toast:HTMLElement;
    cb: Function;
    callStack : [Function]; //NEXTVER: promises maybe?

    constructor(text: string, options : IMessageOptions, cb : Function) {
        //--- Default values ---
        this._text = text || "Awesome!";
        this._id = Message.idGen();
        this._type ="default";
        this._duration = 4000; //defaults to 4000 milliseconds
        this._class = " ";
        if (options){
            this.cb = cb;
            if(typeof(options) === "function" ) this.cb = options;
            else if(typeof(options) === "object" && !Array.isArray(options)){
                this._type = options.type || this._type;
                this._id = options.id || this._id;
                this._duration= options.duration || this._duration;
                this._class=options.class || this._class;
            }

        }
        this.cb = typeof(options) === "function" ? options: cb;
        Message.Stack[Message.Stack.length] = this;
        this.init();
        return this;
    }
    init(): void{
        var _this = this;
        this.cbFired = false;
        this.toast = document.createElement('li');
        var toast = this.toast;
        [toast.className, toast.textContent] = ["message "+ this._class, this._text];
        this.stylize();
        toast.addEventListener('click', function(){
            toast.classList.remove('prophet-message-active');
            if(_this.cb){
                _this.cb(_this._id);
                _this.cbFired = true;
            }
            setTimeout(function(){
                Message.parent.removeChild(toast);
            },60);
        });

    }
    show(): Message{
        var _this = this;
        var toast = this.toast;
        Message.parent.appendChild(this.toast);
        setTimeout(function(){
            toast.classList.add('prophet-message-active');
        },10);
        setTimeout(function(){
            toast.classList.remove('prophet-message-active');
            if(!_this.cbFired) if(_this.cb) _this.cb(_this._id);
            setTimeout(function(){
                try {Message.parent.removeChild(toast);} catch (e){}
            }, 30);
        },this._duration);
    return this;
    }
    stylize(){
        var foundPos = Message.Util.find(Message.stylePresets,this._type);
        /*NEXTVER: Make all copying loop instead of manual in next ver*/
        if (foundPos !== -1){
            this.toast.style.backgroundColor = Message.stylePresets[foundPos].backgroundColor;
            this.toast.style.color = Message.stylePresets[foundPos].color;
        }
    }

}

if (typeof module !== "undefined")
    module["exports"] = Message;
else
    window["Message"] = Message;

