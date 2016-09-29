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

document.getElementById('trigger').addEventListener('click', function(){

    new Message({
        id: document.getElementById('id').value,
        text: document.getElementById('txt').value,
        type: document.getElementById('type').value,
        duration: document.getElementById('duration').value,
        class: "test stuff2 stuff3",
        onClickCallback: function(id){
            document.getElementById('res').innerHTML = "On Click!!"
        }
    }, function(id){
        document.getElementById('res').innerHTML = "On Away!"
    });
    
})



/*Message.config.types([
    { type : "success", backgroundColor: "dwdw", color: "sdwdw" },
    { type : "tip", backgroundColor: "tip bg", color: "tip color" }
]);*/


