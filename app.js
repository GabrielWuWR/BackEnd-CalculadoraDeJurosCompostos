/******************************************
 * Objetivo: Construir uma calculadora de juros compostos
 * Autor: Gabriel
 * Data: 04/02/2026
 * Versão: 1.0.4.26
 *****************************************/

//Criando o readline
const console = require('console');
const readline = require('readline');
const ERRO = 'Ops digite um numero válido!';

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function verificaNumero(num) {
    let numero = num;

    if (typeof numero === 'string') {
        numero = numero.replace(',', '.');
    }

    let numeroConvertido = Number(numero);

    if (isNaN(numeroConvertido) || numeroConvertido < 0 || num === '') {
        return false;
    } else {
        return true;
    }
}

console.log('******************* VIVA MODA *******************')
entradaDeDados.question('Digite o nome do cliente: ', (nome) => {
    nomeCliente = nome;

    entradaDeDados.question('Digite o nome do produto: ', (produto) => {
        nomeProduto = produto;

        entradaDeDados.question('Insira o valor da compra: ', (compra) => {
            valorCompra = compra;

            if (verificaNumero(valorCompra)) {

                entradaDeDados.question('Você quer calcular o tempo em meses(M) ou anos(A): ', (resposta) => {
                    if (resposta.toLowerCase() == 'm') {
                        entradaDeDados.question('Insira o tempo de pagamento em meses: ', (pagamento) => {
                            tempoPagamento = pagamento;

                            if (verificaNumero(tempoPagamento)) {

                            } else {
                                console.log(ERRO);
                                entradaDeDados.close();
                            }
                        });

                    } else if (resposta.toLowerCase() == 'a') {
                        entradaDeDados.question('Insira o tempo de pagamento em anos: ', (pagamento) => {
                            tempoPagamento = pagamento;

                            if (verificaNumero(tempoPagamento)) {

                            } else {
                                console.log(ERRO);
                                entradaDeDados.close();
                            }
                        });
                    } else {
                        console.log('De uma resposta válida, você pode calcular o tempo em meses(M) ou anos(A)');
                        entradaDeDados.close();
                    }
                });
            } else {
                console.log(ERRO);
                entradaDeDados.close();
            }

        });
    });
});