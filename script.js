// >>>>>>>>>>>>  DOM <<<<<<<<<<<

const avatarJump = document.querySelector(".avatar-run") 
const enemyRun = document.querySelector('.enemy-run') 
const scoreDOM = document.querySelector("#score")
const countdownDOM = document.querySelector('#countdown')

// >>>>>>>>>>>>  Select ALL <<<<<<<<<<<

let avatarList = [
    {index: 0, name: 'mario', jump: ''},
    {index: 1, name: 'dixie', jump: ''},
    {index: 2, name: 'megaman', jump: ''},
    {index: 3, name: 'zero', jump: ''},
    {index: 4, name: 'pikachu', jump: ''},
    {index: 5, name: 'alucard', jump: ''},
    {index: 6, name: 'funky', jump: ''},
    {index: 7, name: 'link', jump: ''},
    {index: 8, name: 'spider-man', jump: ''},
    {index: 9, name:'sonic', jump: ''},
    {index: 10, name:'crash', jump: ''},
] 

let enemyList = [
    {index: 0, name:'robot-0', speed: '1500ms', score: 220},
    {index: 1, name:'robot-1', speed: '1500ms', score: 250},
    {index: 2, name:'robot-2', speed: '1500ms', score: 200},
    {index: 3, name:'dragon-0', speed: '1500ms', score: 280},
    {index: 4, name:'dragon-1', speed: '1500ms', score: 230},
    {index: 5, name:'dragon-2', speed: '1500ms', score: 240},
    {index: 6, name:'dragon-3', speed: '1500ms', score: 260},
    {index: 7, name:'charizard', speed: '1500ms', score: 270},
    {index: 8, name:'dragonite', speed: '1500ms', score: 280},
    {index: 9, name:'articuno', speed: '1500ms', score: 290},
    {index: 10, name:'moltres', speed: '1500ms', score: 290},
    {index: 11, name:'zapdos', speed: '1500ms', score: 290},
    {index: 12, name:'lugia', speed: '1500ms', score: 300},
    {index: 13, name:'klobber', speed: '1500ms', score: 200},
    {index: 14, name:'klasp', speed: '1500ms', score: 200},
]

//selecionar avatar
const avatarName = avatarList[3].name

avatarJump.id = avatarName
avatarJump.src = `imagens/${avatarName}-run.gif`

//desativa imagem e animação do inimigo para contagem inicial
enemyRun.style.animation = 'none'
enemyRun.style.display = 'none'


// >>>>>>>>>>>>  FUNCTIONS <<<<<<<<<<<


// // >>> função START GAME <<<<



let count = 1
// contagem regressiva até começar o jogo
const countdown = setInterval(function(){
    
    if (count < 4) {
        countdownDOM.innerHTML = count
    }
    
    else if (count === 4) {
        countdownDOM.innerHTML = 'GO!'
    }
    else if (count === 5) {
        
        countdownDOM.style.display = "none"
        enemyRun.style.animation = ''
        enemyRun.style.display = 'flex'

        clearInterval(countdown)
    }    

    count++

}, 1000)
 

// >>>  Função Enemy Random <<<


let score = 0
let speed = '1500ms' 
let gameOver = false

// let enemySpeed = ''
const enemyRandom = setInterval(function (){

    //se game over encerra o setInterval
    if (gameOver) {
        clearInterval(enemyRandom)
    }
    else {
        let max = enemyList.length - 1
        let min = 0

        //número aleatório do inimigo 0 a 0.99 truncado e multiplicado pelo max 
        let enemyRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min
        console.log(enemyRandomNumber)
        
        const enemyName = enemyList[enemyRandomNumber].name
        // enemySpeed = enemyList[enemyRandomNumber].speed

        //plota as características do inimigo sorteado
        enemyRun.id = enemyName
        enemyRun.src = `imagens/${enemyName}.gif`

        speed = enemyList[enemyRandomNumber].speed
        enemyRun.style.animationDuration = speed 

        // console.log(enemySpeed)
        
        // faz o somatório do pontos
        
        score += enemyList[enemyRandomNumber].score
        scoreDOM.innerHTML = `SCORE: ${score}`    
    }
    
}, 1500)


// >>> Função Jump <<<

const jump = () => {
    avatarJump.classList.add('jump')

    setTimeout(() => {
        avatarJump.classList.remove('jump')
    }, 700)
}


// >>> Função GAME OVER <<<

const loop = setInterval(() => {
    const enemyPosition = enemyRun.offsetLeft;
    // const megamanPosition = megamanJump.offsetBotton;
    const avatarPositionJump = +window.getComputedStyle(avatarJump).bottom.replace('px', '')
    
    // teste para pegar o valor absoluto da posição do enemy
    // console.log(enemyPosition)
    // console.log(megamanPosition)


    // condição de parada do enemy os valores absolutos (depois de passar), (antes de bater) e 112(altura do pulo) foram encontrados no teste
    if (enemyPosition > -10 && enemyPosition <= 70 && avatarPositionJump < 110){
    
        // valor dinâmico de parada em píxels 
        
        enemyRun.style.animation = 'none'
        enemyRun.style.left = `${enemyPosition}px`

        avatarJump.style.animation = 'none'
        avatarJump.style.bottom = `${avatarPositionJump}px`
        
        // megamanJump.src = 'imagens/megamen-death.gif'

        //liga o display que estava desligado no countdown
        countdownDOM.style.display = "flex"
        countdownDOM.innerHTML = '<span style="color:red"> GAME OVER </span>'
        
        // indica o final para encerar o Enemy Random  
        gameOver = true

        clearInterval(loop)
    }
}, 10)

document.addEventListener('keydown', jump)
