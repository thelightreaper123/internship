let solution;
let no1 = parseFloat(prompt("enter first number:"));
let no2 = parseFloat(prompt("enter second number:"));
let symbol = prompt("Enter symbol for the task you want to complete(+ - * /)")
if(symbol == "+"){
    solution = no1 + no2;
}
else if(symbol == "-"){
    solution = no1 - no2;
}
else if(symbol == "*"){
    solution = no1 * no2;
}
else if(symbol == "/"){
    solution = no1 / no2;
}
else{
    solution = "ERROR!! input correct symbol and try again";
}