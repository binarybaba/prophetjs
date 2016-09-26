//polyfill
if (!Date.now) { Date.now = function now() { return new Date().getTime(); }; }

class Message {
    message : string;
    id : number;
    constructor(msg : string, id : number, ...rest){
        this.message = msg;
        this.id = id ? id : Message.idGen();
        console.log(rest);
        return this;
    }
    static idGen(){
        return Date.now();
    }
    foo(){
        console.log(this.message, "-", this.id, "Chain Started in Foo");
        return this;
    }
    bar(){
        console.log("Bar visited");
        return this;
    }
    baz(cb){
        console.log("Baz visited");
        cb();
    }
}
