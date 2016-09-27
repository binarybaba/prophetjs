var styleList = [
    { type : "foo", prop : "something foo"},
    { type : "bar", prop : "something bar"}
];

var custom = [
    { type : "foo", prop : "something new foo" },
    { type : "baz", prop : "something new baz"},
    { type : "bar", prop : "something new baz"}
];

function find(objArr, keyToFind){
    var foundPos = objArr.map(function(preset){
        return preset.type;
    }).indexOf(keyToFind);
    return foundPos === -1 ? false : foundPos;
}

function set(custom){
    for(var i = 0; i< custom.length; i++){
        var pos = find(styleList, custom[i].type);
        if(pos){

            //update the data at pos dry run please
        }
    }

    var s = find(objArr, "bam");
    return s;
}


console.log(set(custom));


