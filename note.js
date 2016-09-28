/*TODO: TEST!!!*/
var styleList = [
    { type : "foo", prop : "foo"},
    { type : "bar", prop : "bar"},
    { type: "something", prop : "another"}
];

var custom = [
    { type : "foo", prop : "custom foo" },
    { type : "baz", prop : "new baz"},
    { type : "bar", prop : "new bar"}
];

function find(objArr, keyToFind){
    var foundPos = objArr.map(function(preset){
        return preset.type;
    }).indexOf(keyToFind);
    return foundPos;
}


function set(custom){
    for(var i = 0, current; i< custom.length; i++){
        var pos = find(styleList, custom[i].type);
        current = custom[i];
        if(pos !== -1)
            for(var key in current) styleList[pos][key] = current[key];
        else styleList[styleList.length] = current;
    }
}

set(custom);
/*console.log(find(styleList, "bar"))*/
console.log(styleList);



