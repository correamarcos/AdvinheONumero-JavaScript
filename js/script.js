//GERA O NUMERO ALEATORIO DO JOGO
let numberRandom = Math.floor(Math.random() * 100) + 1;

//VARIAVEIS COM OS CAMPOS DO PALPITE E ENVIO DO PALPITE
let uShot = document.querySelector('.userShot');
let submitShot = document.querySelector('.submitShot');

//VARIAVEIS COM OS CAMPOS RESULTADO, HISTORICO PALPITES E DICAS
let lastResults = document.querySelector('.lastResults');
let divination = document.querySelector('.divination');
let upOrDown = document.querySelector('.upOrDown');

//CONTADOR E DECLARAÇÃO DO BOTÃO REINICIAR
let countShot = 1;
let btnRestart;

window.onload = function(){
  uShot.focus();
}

//CRIANDO MENSAGENS QUE SERÃO EXIBIDAS
let acertou = 'Acertô Mizeravi';
let errouTudo = 'Ô loco, Errrroooouuu tudo bixo';
let errou = 'Errrroooouuu';

//FUNÇÃO PARA VERIFICAR O PALPITE DO USUARIO
function verifyShot(){

  let userShot = Number(uShot.value);

  if (countShot === 1) {
    lastResults.textContent = 'Ultimos Palpites: ';
  }
  lastResults.textContent += userShot + ' ';

  if (userShot === numberRandom) {

    //ACERTOU
    divination.textContent = acertou;
    divination.style.backgroundColor = 'green';
    divination.style.color = "#ffff";
    upOrDown.textContent = '';
    gameOver();

  }else if (countShot === 10) {

    //ERROU TUDO
    divination.textContent = errouTudo;
    divination.style.backgroundColor = 'red';
    divination.style.color = "#ffff";
    upOrDown.textContent = '';
    gameOver();

  }else {

    //ERROU
    divination.textContent = errou;
    divination.style.backgroundColor = 'red';
    divination.style.color = "#ffff";

    //VERIFICANDO SE O VALOR DO PALPITE ESTÁ ABAIXO OU ACIMA DO SORTEADO
    userShot < numberRandom ? upOrDown.textContent = 'Palpite muito baixo' : upOrDown.textContent = 'Palpite muito alto';

  }

  countShot++;
  uShot.value = '';
  uShot.focus();

}

//ACRESCENTANDO EVENTO NO BOTÃO ENVIAR PALPITE  
submitShot.addEventListener('click', verifyShot);

//ACRESCENTANDO EVENTO DE ENVIO DE PALPITE COM TECLA ENTER
document.addEventListener('keypress', function(e){
    if(e.which == 13){
      if (divination.textContent != acertou && divination.textContent != errouTudo){
        verifyShot();
      }else {
        alert('O jogo Terminou!!');
      }
    }  
},false);

//FUNÇÃO QUE FINALIZA O JOGO 
function gameOver(){
  
  uShot.disabled = true;
  submitShot.disabled = true;

  btnRestart = document.createElement('button');
  btnRestart.textContent = 'Reiniciar Jogo';
  document.body.appendChild(btnRestart);
  btnRestart.addEventListener('click', gameRestart);

}

//FUNÇÃO QUE REINICIA O JOGO 
function gameRestart(){

  countShot = 1;

  let resetAll = document.querySelectorAll('.results p');
  for(let i = 0; i < resetAll.length; i++){
    resetAll[i].textContent = '';
  }

  btnRestart.parentNode.removeChild(btnRestart);

  uShot.disabled = false;
  submitShot.disabled = false;
  uShot.value = '';
  uShot.focus();  

  numberRandom = Math.floor(Math.random() * 100) + 1;

}