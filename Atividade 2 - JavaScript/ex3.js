let num = parseInt(prompt('Escolha um número de 1 a 10: '));

console.log(`Tabuada de ${num}: `);
for (let i = 1; i <= 10; i++) {
    let res = num * i;
    console.log(`${num} x ${i} = ${res}`)
}
