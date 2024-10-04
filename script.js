const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.getElementById('alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const imagemBt = document.querySelector('.app__card-primary-butto-icon') 
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true


const somAlerta = new Audio('/sons/beep.mp3');
const somPlay = new Audio('/sons/play.wav')
const somPause = new Audio('/sons/pause.mp3')


let tempoDeCorridoEmSegundos = 1500
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDeCorridoEmSegundos = 1500
    alterarContexto('foco');
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDeCorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDeCorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto){
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
                
            break;
        case "descanso-curto":
            titulo.innerHTML = `
              Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!.</strong>
            `
            
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar a superfície.<br>
              <strong class="app__title-strong">Faça uma pausa longa.</strong>
          `

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDeCorridoEmSegundos <= 0){
        somAlerta.play()
        window.alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDeCorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar) 

function iniciarOuPausar() {
    if (intervaloId){
        zerar()
        somPause.play()
        imagemBt.setAttribute('src', '/imagens/play_arrow.png')
        return
    }
    somPlay.play()
    iniciarOuPausarBt.textContent = "Pausar"
    imagemBt.setAttribute('src', '/imagens/pause.png')
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    iniciarOuPausarBt.textContent = "Começar"
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDeCorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
