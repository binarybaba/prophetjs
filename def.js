/*requirements*/

var m = new Message("hello", 1124);
var n = new Message("hey");

var a1 = 1,
    a2 = 2,
    a3 =3;
var o = new Message("Custom Message", 25, 10,20,30);
m.foo().bar().baz(function(){
    console.log("--- baz callback ---");
    console.log(a1,a2,a3);
})
o.baz(function(){
    console.log("--- new baz callback --- ");
})