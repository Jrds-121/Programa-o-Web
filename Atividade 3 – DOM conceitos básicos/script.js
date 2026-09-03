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

// textos dinamicos / contador de caracteres

let entrada = document.getElementById("entrada");
let resCarac = document.getElementById("resCarac");
let textos = document.getElementById("textos");
let contador2;
let novoParagrafo;

entrada.addEventListener ("input", function(){
    contador2 = entrada.value.replace(/\s/g, "").length;
    resCarac.textContent = contador2;
});

entrada.addEventListener ("keydown", function(event){
    if(event.key == "Enter"){
        novoParagrafo = document.createElement("p")
        novoParagrafo.textContent = entrada.value
        textos.appendChild(novoParagrafo);
    };
});

// adicionar novo item
let addLista = document.getElementById("addLista");
let seleção = document.getElementById("seleção");
let lista = document.getElementById("lista");
let listaOrdenada;
let listaNOrdenada
let novaLista;

addLista.addEventListener ("click", function(){
    if (seleção.value === "ol"){
        listaOrdenada = document.createElement("ol")
        listaOrdenada.textContent = seleção.value
        lista.appendChild(listaOrdenada)

        for (let i=1; i<=3; i++){

        }
        
    } else {

    }
});