// let titulo = document.querySelector('h1')
// titulo.innerHTML = 'Jogo do número secreto'

// let paragrafo = document.querySelector('p')
// paragrafo.innerHTML = "Escolha um número entre 1 e 10"

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag)
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function exibirMensgemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p',"Escolha um número entre 1 e 10");
}
exibirMensgemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroAleatorio){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensatemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
        exibirTextoNaTela('p', mensatemTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroAleatorio){
            exibirTextoNaTela('p', 'O número secreto é menor...')
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior...')
        }
       
    }
    tentativas++;
    limparCampo()

}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = []
    }

    // verifica se o número sorteado está incluido na lista
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio()
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}
function limparCampo(){
    let chute = document.querySelector('input');
    chute.value='';
    chute.focus();
}

function reiniciarJogo(){
    numeroAleatorio=gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensgemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}