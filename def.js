

var calcSize = function(){
    var viewportwidth;
    var viewportheight;
    var floater = document.getElementById('floater');

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

    if (typeof window.innerWidth != 'undefined')
    {
        viewportwidth = window.innerWidth,
            viewportheight = window.innerHeight
    }

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

    else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
    {
        viewportwidth = document.documentElement.clientWidth,
            viewportheight = document.documentElement.clientHeight
    }

    // older versions of IE

    else
    {
        viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
            viewportheight = document.getElementsByTagName('body')[0].clientHeight
    }
    document.getElementById('floater').style.marginLeft= (viewportwidth*3/4 ) +'px';
    document.getElementById('screen-width').innerHTML = viewportwidth;
        document.getElementById('screen-height').innerHTML = viewportheight;
        document.getElementById('ml').innerHTML = document.getElementById('floater').style.marginLeft;
        document.getElementById('mr').innerHTML = viewportheight;


}


window.addEventListener('resize', calcSize);
document.addEventListener('DOMContentLoaded', calcSize)

Message.config.types({
    type: "tip",
    backgroundColor:"indianred",
    color:"black"
})
var onc = function(id){
    alert("click callback");
}
var ona = function(id){
    alert("away callback");
}
document.getElementById('clear').addEventListener('click', function(){
    Message.clearAll();
})

document.getElementById('trigger').addEventListener('click', function(){
    var d = new Message(document.getElementById('txt').value, {
        duration : document.getElementById('duration').value,
        type: document.getElementById('type').value
    }).show();


    
})

/*onclick callback only works on click;*/
/*onaway only works on away*/
 



/*Message.config.types([
    { type : "success", backgroundColor: "dwdw", color: "sdwdw" },
    { type : "tip", backgroundColor: "tip bg", color: "tip color" }
]);*/


