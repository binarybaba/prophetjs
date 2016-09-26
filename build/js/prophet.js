//polyfill
if (!Date.now) {
    Date.now = function now() { return new Date().getTime(); };
}
var Message = (function () {
    function Message(msg, id) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        this.message = msg;
        this.id = id ? id : Message.idGen();
        console.log(rest);
        return this;
    }
    Message.idGen = function () {
        return Date.now();
    };
    Message.prototype.foo = function () {
        console.log(this.message, "-", this.id, "Chain Started in Foo");
        return this;
    };
    Message.prototype.bar = function () {
        console.log("Bar visited");
        return this;
    };
    Message.prototype.baz = function (cb) {
        console.log("Baz visited");
        cb();
    };
    return Message;
}());
//# sourceMappingURL=prophet.js.map