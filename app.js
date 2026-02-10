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

    if (isNaN(numeroConvertido) || numeroConvertido < 0 || numeroConvertido > 10000 || num === '') {
        return false;
    } else {
        return true;
    }
}

function tratarNumero(num) {
    if (!num) return false;

    let formatando = num.toString().replace('%', '').trim();
    formatando = formatando.replace(',', '.');

    const numeroConvertido = Number(formatando);
    return numeroConvertido;
}

function calculaMontante(capitalInicial, taxaJuros, tempoPagamento, tipoPagamento) {
    let c = capitalInicial;
    let i = taxaJuros;
    let n = tempoPagamento;

    if (tipoPagamento == 'm') {
        let montante = c * (1 + i) ** n;
        return montante.toFixed(2);
    } else if (tipoPagamento == 'a') {
        n = tempoPagamento * 12;
        let montante = c * (1 + i) ** n;
        return montante.toFixed(2);
    }
}

function mostrarResultado(nomeUser, nomeProduto, valorInicial, vezesParcela, montanteFinal, diferenca) {
    console.log('');
    console.log('******************* [VIVA MODA] *******************');
    console.log(`Muito obrigado por realizar a sua compra conosco Sr(a) ${nomeUser}.`);
    console.log(`A compra do produto ${nomeProduto}, tem um valor de: R$${valorInicial}.`);
    console.log(`A sua compra será parcelada em ${vezesParcela} vezes e o Sr(a) pagará: R$${montanteFinal}.`);
    console.log(`O acréscimo realizado ao valor de: R$${valorInicial} será de R$${diferenca}.`);
    console.log(`Muito obrigado por escolher a VIVA MODA.`);
    console.log(`*******************************************************`);
    console.log('');
}

console.log('******************* VIVA MODA *******************')
entradaDeDados.question('Digite o nome do cliente: ', (nome) => {
    let nomeCliente = nome;

    entradaDeDados.question('Digite o nome do produto: ', (produto) => {
        let nomeProduto = produto;

        entradaDeDados.question('Insira o valor da compra: ', (compra) => {
            let valorCompra = tratarNumero(compra);

            if (verificaNumero(valorCompra)) {
                entradaDeDados.question('Insira o valor da taxa de juros: ', (taxa) => {
                    let valorTaxa = tratarNumero(taxa);

                    if (verificaNumero(valorTaxa)) {
                        if (valorTaxa > 0) {
                            valorTaxa = valorTaxa / 100;
                        }

                        entradaDeDados.question('Você quer calcular o tempo em meses(M) ou anos(A): ', (resposta) => {
                            if (resposta.toLowerCase() == 'm') {
                                entradaDeDados.question('Insira o tempo de pagamento em MESES: ', (pagamento) => {
                                    let tempoPagamento = pagamento;

                                    if (verificaNumero(tempoPagamento)) {
                                        let montante = calculaMontante(valorCompra, valorTaxa, tempoPagamento, 'm');
                                        let diferenca = montante - valorCompra;

                                        mostrarResultado(nomeCliente, nomeProduto, valorCompra, tempoPagamento, montante, diferenca);
                                        entradaDeDados.close();
                                    } else {
                                        console.log(ERRO);
                                        entradaDeDados.close();
                                    }
                                });

                            } else if (resposta.toLowerCase() == 'a') {
                                entradaDeDados.question('Insira o tempo de pagamento em ANOS: ', (pagamento) => {
                                    let tempoPagamento = tratarNumero(pagamento);

                                    if (tempoPagamento !== false) {
                                        let montante = calculaMontante(valorCompra, valorTaxa, tempoPagamento, 'a');
                                        let diferenca = montante - valorCompra;

                                        mostrarResultado(nomeCliente, nomeProduto, valorCompra, tempoPagamento * 12, montante, diferenca);
                                        entradaDeDados.close();
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

            } else {
                console.log(ERRO);
                entradaDeDados.close();
            }
        });
    });
});