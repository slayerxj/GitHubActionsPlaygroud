document.getElementById("add").onclick = function () {
    var node = document.createElement("li");
    var textnode = document.createTextNode("Static Text");
    node.appendChild(textnode);
    document.getElementById("root").appendChild(node);
}

document.getElementById("remove").onclick = function () {
    var root = document.getElementById("root");
    root.removeChild(root.lastElementChild);
}