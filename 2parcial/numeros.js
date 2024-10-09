
export function generarNumeroAleatorio(numeros) {
    if (numeros.length >= 99) return;
    let numeroAleatorio;
    do {
        numeroAleatorio = Math.floor(Math.random() * 99) + 1;
    } while (numeros.includes(numeroAleatorio));

    numeros.push(numeroAleatorio);
}

export function mostrarNumeros(numeros) {
    const container = document.getElementById('number-container');
    container.innerHTML = '';

    numeros.forEach(numero => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = numero;
        container.appendChild(box);
    });
}

export function ordenarAscendente(numeros) {
    numeros.sort((a, b) => a - b);
}

export function ordenarDescendente(numeros) {
    numeros.sort((a, b) => b - a);
}