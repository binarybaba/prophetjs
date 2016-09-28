document.getElementById('trigger').addEventListener('click', function(){

    new Message({
        id: document.getElementById('id').value,
        text: document.getElementById('txt').value,
        type: document.getElementById('type').value,
        duration: document.getElementById('duration').value,
        class: "stuff stuff2 stuff3",
        onClickCallback: function(id){
            alert("On Click", id);
        }
    }, function(id){
        alert("On Away");
    });
    
})

Message.Dbg.presets();

console.log("updating styles");

/*Message.config.types([
    { type : "success", backgroundColor: "dwdw", color: "sdwdw" },
    { type : "tip", backgroundColor: "tip bg", color: "tip color" }
]);*/


