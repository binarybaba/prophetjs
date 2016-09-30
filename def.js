var calcSize = function(){
        document.getElementById('screen-width').innerHTML = screen.width.toString();
        document.getElementById('screen-height').innerHTML = screen.height.toString();
        document.getElementById('screen-availWidth').innerHTML = screen.availWidth.toString();
        document.getElementById('screen-availHeight').innerHTML = screen.availWidth.toString();
}
calcSize();


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
document.getElementById('trigger').addEventListener('click', function(){

    new Message(document.getElementById('txt').value, {
        id: document.getElementById('id').value,
        type: document.getElementById('type').value,
        duration: document.getElementById('duration').value,
        class: "test stuff2 stuff3",
        onClickCallback : onc
    }, ona);
    
})

/*onclick callback only works on click;*/
/*onaway only works on away*/
 



/*Message.config.types([
    { type : "success", backgroundColor: "dwdw", color: "sdwdw" },
    { type : "tip", backgroundColor: "tip bg", color: "tip color" }
]);*/


