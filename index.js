function makeFunc() {
    var value =         "Mozilla"    ;
    var displayName = function () {
        console.log(value);
    }
    return {
        a: displayName, b: value
    }
}

var myFunc = makeFunc();
myFunc.b = "Google";
myFunc.a();
