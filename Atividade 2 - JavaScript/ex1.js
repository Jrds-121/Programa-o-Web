
const numAleatorio = Math.floor(Math.random() * 20) + 1;
// console.log(numAleatorio);
let num = 0;

window.confirm ('Descubra o número secreto.');
num = parseInt(prompt('Escolha um número de 1 a 20: ')); 

while (num != numAleatorio) {
    if (num > numAleatorio){
        window.alert (`${num} é MAIOR que o número secreto.`);
        num = parseInt(prompt('Escolha novamente  um número de 1 a 20: '))
    } else {
        window.alert (`${num} é MENOR que o número secreto.`);
        num = parseInt(prompt('Escolha novamente  um número de 1 a 20: '))
 }
}
 
window.alert(`Parabéns, você acertou! O número secreto era ${num}!!`);
