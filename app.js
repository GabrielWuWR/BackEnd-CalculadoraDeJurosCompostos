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


//Função para verificar se um numero é realmente válido
function verificaNumero(num) {
    let numero = num;

    let numeroConvertido = Number(numero);

    if (isNaN(numeroConvertido) || numeroConvertido < 0 || numeroConvertido > 10000 || num === '') {
        return false;
    } else {
        return true;
    }
};

//Função para tirar % e substituir , por .
function tratarNumero(num) {
    if (!num) return false;

    let formatando = num.toString().replace('%', '').trim();
    formatando = formatando.replace(',', '.');

    const numeroConvertido = Number(formatando);
    return numeroConvertido;
};

//Função para calcular o montante final ela considera se o calculo é em meses ou anos
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
};

//Função para retornar todos os dados no final
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
};

console.log('');
console.log('******************* VIVA MODA *******************');
entradaDeDados.question('Digite o nome do cliente: ', (nome) => { //Pedindo o nome do cliente
    let nomeCliente = nome;

    entradaDeDados.question('Digite o nome do produto: ', (produto) => { //Pedindo o nome do produto
        let nomeProduto = produto;

        entradaDeDados.question('Insira o valor da compra: ', (compra) => { //Pedindo o valor da compra
            let valorCompra = tratarNumero(compra);

            if (verificaNumero(valorCompra)) {
                entradaDeDados.question('Insira o valor da taxa de juros: ', (taxa) => { //Pedindo a taxa de juros
                    let valorTaxa = tratarNumero(taxa);

                    if (verificaNumero(valorTaxa)) { //caso o valor da taxa for superior a 1 dividimos por 100
                        if (valorTaxa > 1) {
                            valorTaxa = valorTaxa / 100;
                        };

                        //O sistema permite o cálculo por meses ou anos
                        entradaDeDados.question('Você quer calcular o tempo em meses(M) ou anos(A): ', (resposta) => {
                            if (resposta.toLowerCase() == 'm') { //Pedindo o tempo em meses
                                entradaDeDados.question('Insira o tempo de pagamento em MESES: ', (pagamento) => {
                                    let tempoPagamento = pagamento;

                                    if (verificaNumero(tempoPagamento)) {
                                        let montante = calculaMontante(valorCompra, valorTaxa, tempoPagamento, 'm');
                                        let diferenca = montante - valorCompra;

                                        mostrarResultado(nomeCliente, nomeProduto, valorCompra.toFixed(2), tempoPagamento, montante, diferenca.toFixed(2));
                                        entradaDeDados.close();
                                    } else { //Caso seja um número inválido ele da um erro
                                        console.log(ERRO);
                                        entradaDeDados.close();
                                    };
                                });

                            } else if (resposta.toLowerCase() == 'a') { //Pedindo o tempo em anos
                                entradaDeDados.question('Insira o tempo de pagamento em ANOS: ', (pagamento) => {
                                    let tempoPagamento = tratarNumero(pagamento);

                                    if (tempoPagamento !== false) {
                                        let montante = calculaMontante(valorCompra, valorTaxa, tempoPagamento, 'a');
                                        let diferenca = montante - valorCompra;

                                        //Para o calculo em anos apenas multiplicamos o tempo de pagamento por 12
                                        mostrarResultado(nomeCliente, nomeProduto, valorCompra.toFixed(2), tempoPagamento * 12, montante, diferenca.toFixed(2));
                                        entradaDeDados.close();
                                    } else { //Caso seja um número inválido ele da um erro
                                        console.log(ERRO);
                                        entradaDeDados.close();
                                    };
                                });
                            } else { //Caso seja uma resposta inválida ele da um erro
                                console.log('De uma resposta válida, você pode calcular o tempo em meses(M) ou anos(A)');
                                entradaDeDados.close();
                            };
                        });

                    } else { //Caso seja um número inválido ele da um erro
                        console.log(ERRO);
                        entradaDeDados.close();
                    };
                });

            } else { //Caso seja um número inválido ele da um erro
                console.log(ERRO);
                entradaDeDados.close();
            };
        });
    });
});