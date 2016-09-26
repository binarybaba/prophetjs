//polyfill
if (!Date.now) { Date.now = function now() { return new Date().getTime(); }; }

class Message {
    id : number;
    message : string;
    type: string;
    constructor(message, id){
        this.message = message;
        this.id = id ? id : Message.idGen();
        //TODO: make stack of notifications and remove them
        var elem = document.getElementById('message');
        
        elem.innerText = this.message;
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

