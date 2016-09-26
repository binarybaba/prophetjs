//polyfill
if (!Date.now) {
    Date.now = function now() { return new Date().getTime(); };
}
var Message = (function () {
    function Message(message, id) {
        this.message = message ? message : 'Success!';
        this.id = id ? id : Message.idGen();
        //TODO: make stack of notifications and remove them
        var toAttach = document.getElementById('prophet');
        /*var toAttach = document.getElementsByTagName('body')[0];*/
        var notification = document.createElement('li');
        _a = ["message", this.message], notification.className = _a[0], notification.innerText = _a[1];
        /*notification.innerText=this.message;*/
        toAttach.appendChild(notification);
        setTimeout(function () {
            notification.classList.remove('active');
            toAttach.removeChild(notification);
        }, 3000);
        notification.addEventListener('click', function () {
            notification.classList.remove('active');
            toAttach.removeChild(notification);
        });
        setTimeout(function () {
            notification.classList.add('active');
        }, 10);
        return this;
        var _a;
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