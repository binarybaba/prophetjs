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

Message.Dbg.presets();

console.log("updating styles");

/*Message.config.types([
    { type : "success", backgroundColor: "dwdw", color: "sdwdw" },
    { type : "tip", backgroundColor: "tip bg", color: "tip color" }
]);*/


