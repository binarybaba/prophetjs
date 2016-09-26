//polyfill
if (!Date.now) {
    Date.now = function now() { return new Date().getTime(); };
}
var Message = (function () {
    function Message(message, id) {
        this.message = message;
        this.id = id ? id : Message.idGen();
        //TODO: make stack of notifications and remove them
        var elem = document.getElementById('message');
        elem.innerText = this.message;
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