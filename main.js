let textInput = document.getElementById("input");
let add = document.getElementById("btn1")
let display = document.getElementById("tasks");

add.addEventListener('click', function(){
    var paragraph = document.createElement("p")
    paragraph.innerText = textInput.value
    display.appendChild(paragraph);
    textInput.value =" ";
    var btn = document.createElement('button')
    btn.innerText = "remove"
    display.appendChild(btn);
    btn.addEventListener('click', function(){
        display.removeChild(paragraph);
        display.removeChild(btn);
    })
});
