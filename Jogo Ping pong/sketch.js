//Variaveis da Bolinha
let xBolinha=300;
let yBolinha=200;
let diametro = 15;
let raio = diametro / 2;

let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//Variaveis da raquete
let xRaquete = 5;
let yRaquete=150;
let raqueteComprimento=10;
let raqueteAltura =90;

//Variaveis do Oponente
let xRaqueteOponente=585;
let yRaqueteOponente=150;
let velocidadeYOponente;

//Variaveis de colisao;
let colidiu=false;

//Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//Onde a magica acontece
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}


//Cria a bolinha;
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function mostraRaquete(x,y){
  rect(x,y,raqueteComprimento,raqueteAltura);
}


// Função que da a velocidade para a bolinha ;
function movimentaBolinha(){
   xBolinha+= velocidadeXBolinha;
   yBolinha += velocidadeYBolinha;
}

//Momento de colisao da bolinha com a borda. 
function verificaColisaoBorda(){ 
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  } 
 if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  } 

}
//Movimento da raquete 
function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}
//Verifica a colisao da bolinha com a Minha raquete
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento 
      && yBolinha - raio < yRaquete + raqueteAltura
      && yBolinha + raio > yRaquete)
    velocidadeXBolinha *=-1
    raquetada.play();
}

//Verifica se a bolinha colidiu com a raquete
function verificaColisaoRaquete(x,y){
    
  colidiu = collideRectCircle(x,y, raqueteComprimento, raqueteAltura, xBolinha,yBolinha,raio);
  
  if(colidiu){
    velocidadeXBolinha *=-1
    raquetada.play();
  }
}

//Faz a movimentação da raquete do oponente
function  movimentaRaqueteOponente(){
  //87 representa a tela "W"
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  //83 representa a tela "S"
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}

//Função para mostrar o placar na tela
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(255,140,0);
  rect(150,10,40,20);
  fill(255);
  text(meusPontos,170,26);
  fill(255,140,0);
  rect(450,10,40,20);
  fill(255);
  text(pontosDoOponente,470,26);   
}

//Função para marcar o ponto
function marcaPonto(){
  if(xBolinha > 590){
    meusPontos +=1
    ponto.play();
  }
  if(xBolinha < 10){
    pontosDoOponente +=1
    ponto.play();
  }
}