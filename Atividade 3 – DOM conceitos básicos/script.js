// contador de cliques

let inc = document.getElementById("inc");
let dec = document.getElementById("dec");
let resNum = document.getElementById("resNum");
let contador = 0; 

inc.addEventListener ("click", function() {
    contador++;
    resNum.textContent = contador;
});

dec.addEventListener ("click", function(){
    if (contador > 0){
        contador--;
        resNum.textContent = contador;
    } else {
        alert("O contador ja está em 0");
    }
});

// textos dinamicos

let entrada = document.getElementById("entrada");
let resCarac = document.getElementById("resCarac");
let textos = document.getElementById("textos");

entrada.onkeydown = function(event){
    if(event.key == "Enter"){
        textos.innerHTML = entrada.value;
        entrada.value = "";
    };
};