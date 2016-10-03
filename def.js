


Message.config.types({
    type: "tip",
    backgroundColor:"#fafafa",
    color:"black"
})

document.getElementById('clear').addEventListener('click', function(){
    Message.clearAll();
})

document.getElementById('trigger').addEventListener('click', function(){
    var d = new Message(document.getElementById('txt').value,function(id){
        alert(id);
    });
    d.show();

})


