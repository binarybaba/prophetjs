var styleList = [
    { type : "foo", prop : "foo"},
    { type : "bar", prop : "bar"}
];

var custom = [
    { type : "foo", prop : "new foo" },
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
    for(var i = 0, shared=false, current; i< custom.length; i++){
        console.log("Finding", custom[i].type, "in styleList")
        var pos = find(styleList, custom[i].type);
        current=custom[i];
        if(pos !== -1) { console.log("Found at index", pos); shared = true;}
        else {console.log("Not found"); }

    }

    if (shared) {
        for(var key in current){
            console.log("SHARED BLOCK: Setting", styleList[pos], "'s ",styleList[pos][key], "to ", current[key]);
            styleList[pos][key] = current[key];
        }
    }else{
        console.log("NOT SHARED BLOCK: Setting styleList's last element to",current);
        styleList[styleList.length] = current;
    }

}

console.log(set(custom));
/*console.log(find(styleList, "bar"))*/



