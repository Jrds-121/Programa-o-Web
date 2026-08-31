let num = parseInt(prompt('Escolha um número: '));
let soma = 0;
let x = "";

for (let i = 1; i <= num; i++) {
    let um = "1".repeat(i);
    let termo = parseInt(um);
    soma += termo;
    x += um;
    if (i < num){
        x +=  " + ";
    }
}  

console.log(x);
console.log(`A soma é: ${soma}`);