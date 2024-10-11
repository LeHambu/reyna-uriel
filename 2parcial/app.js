
function generarNumeroAleatorio(numeros) {
    if (numeros.length >= 99) return;

    let numeroAleatorio;
    do {
        numeroAleatorio = Math.floor(Math.random() * 99) + 1;
    } while (numeros.includes(numeroAleatorio));

    numeros.push(numeroAleatorio);
}


function mostrarNumeros(numeros) {
    const container = document.getElementById('number-container');
    container.innerHTML = '';

    numeros.forEach(numero => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = numero;
        container.appendChild(box);
    });
}


function ordenarAscendente(numeros) {
    numeros.sort((a, b) => a - b);
}


function ordenarDescendente(numeros) {
    numeros.sort((a, b) => b - a);
}


const numeros = [];

document.getElementById('btn-generar').addEventListener('click', () => {
    generarNumeroAleatorio(numeros);
    mostrarNumeros(numeros);
});

document.getElementById('btn-asc').addEventListener('click', () => {
    ordenarAscendente(numeros);
    mostrarNumeros(numeros);
});

document.getElementById('btn-desc').addEventListener('click', () => {
    ordenarDescendente(numeros);
    mostrarNumeros(numeros);
});