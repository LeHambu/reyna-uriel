import { generarNumeroAleatorio, mostrarNumeros, ordenarAscendente, ordenarDescendente } from './numeros.js';

const numeros = [];

document.getElementById('btn-generar').addEventListener('click', () => {
    console.log('click');
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