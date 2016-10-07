


Message.config.types({
    type: "tip",
    backgroundColor:"#f6dda4",
    color:"#313131"
})

document.getElementById('clear').addEventListener('click', function(){
    Message.clearAll();
})

document.getElementById('trigger').addEventListener('click', function(){
    var text = document.getElementById('txt').value;
    var type = document.getElementById('type').value;
    new Message(text,{
        type:type,
        duration:document.getElementById('duration').value
    }).show();


})


