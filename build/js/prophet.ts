//polyfill
if (!Date.now) { Date.now = function now() { return new Date().getTime(); }; }

class Message {
    /*Todo: set min width of li elements and and find a way to animate the stack up by maybe
    * Todo: setting storing the position and animate them up;
    * Todo: Make notification fadeout in like 3 seconds after active configurable
    * */
    id : number;
    message : string;
    type: string;
    constructor(message, id){
        this.message = message ? message : 'Success!';
        this.id = id ? id : Message.idGen();
        //TODO: make stack of notifications and remove them
        var toAttach = document.getElementById('prophet');
        /*var toAttach = document.getElementsByTagName('body')[0];*/
        var notification = document.createElement('li');
        [notification.className, notification.innerText] = ["message", this.message];
        /*notification.innerText=this.message;*/
        toAttach.appendChild(notification);
        setTimeout(function(){
            notification.classList.remove('active');
            toAttach.removeChild(notification);
        },3000);
        notification.addEventListener('click', function(){
            notification.classList.remove('active');
            toAttach.removeChild(notification);
        });
        setTimeout(function(){
            notification.classList.add('active');
        },10);
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

