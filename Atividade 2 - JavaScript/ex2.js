const numAleatorio = Math.floor(Math.random() * 3);
const op = ["pedra", "papel", "tesoura"];
const opComputador = op[numAleatorio]
let opUsuario;

window.alert ('Jogo de Pedra, Papel ou Tesoura.');
opUsuario = window.prompt('Escolha pedra, papel ou tesoura: '); 

if (opUsuario == opComputador ){
    window.alert (`Empate! Ambos escolheram ${opComputador}.`);
    console.log(`Empate! Ambos escolheram ${opComputador}.`);
} else if ( opUsuario == "pedra" && opComputador == "tesoura" || opUsuario == "papel" && opComputador == "pedra" || opUsuario == "tesoura" && opComputador == "papel" ) {
    window.alert (`Você Ganhou! ${opUsuario} ganha de ${opComputador}.`);
    console.log(`Você Ganhou! ${opUsuario} ganha de ${opComputador}.`);
} else if (opUsuario == "tesoura" && opComputador == "pedra" || opUsuario == "pedra" && opComputador == "papel" || opUsuario == "papel" && opComputador == "tesoura" ){
    window.alert (`Você perdeu :( ${opUsuario} perde de ${op[numAleatorio]}.`);
    console.log(`Você perdeu :( ${opUsuario} perde de ${opComputador}.`);
} else {
    window.alert (`Escolha inválida, tente outra vez.`);
    console.log(`Escolha inválida, tente outra vez..`);
}