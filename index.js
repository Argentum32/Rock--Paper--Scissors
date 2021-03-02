// const paper = document.getElementById('paper')
//       rock = document.getElementById('rock')
//       scissors = document.getElementById('scissors')
// paper.addEventListener('click', () => isWin('paper'))
// rock.addEventListener('click', () => isWin('rock'))
// scissors.addEventListener('click', () => isWin('scissors'))
const main = document.querySelector('.main')
      scoreElement = document.getElementById('score')
      score = localStorage.getItem('score') || 12
      starterMarkup = main.innerHTML
      choises = ['paper', 'rock', 'scissors']
      rules = document.querySelector('.footer')
      overlay = document.getElementById('overlay')
      modal = document.querySelector('.modal')
      closeBtn = document.querySelector('.closeBtn')

main.addEventListener('click', (e) => e.target && e.target.id == 'paper' ? isWin('paper') : false)
main.addEventListener('click', (e) => e.target && e.target.id == 'rock' ? isWin('rock') : false)
main.addEventListener('click', (e) => e.target && e.target.id == 'scissors' ? isWin('scissors') : false)
main.addEventListener('click', (e) => e.target && e.target.id == 'playAgain' ? main.innerHTML = starterMarkup : false)
function renderingCounter(){
    scoreElement.innerHTML = score
}
renderingCounter()

rules.addEventListener('click', () => openRules())
overlay.addEventListener('click', () => closeRules())
closeBtn.addEventListener('click', () => closeRules())
function openRules(){
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeRules() {
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function renderChooses(yChoose, oChoose, result){
    main.innerHTML = `
        <div class='chooses'>
            <p>YOU PICKED</p>
            <p>THE HOUSE PICKED</p>
            <div class="${yChoose}">
                <img id='${yChoose}' src='./images/icon-${yChoose}.svg'>
            </div>
            <div class='empty'> </div>
        </div>`
        
    setTimeout(() => document.querySelector('.empty').outerHTML = `
        <div class="${oChoose}">
            <img id='${oChoose}' src='./images/icon-${oChoose}.svg'>
        </div> `, 1500)

    setTimeout(() => {
        main.innerHTML = `
            <div class='result'>
                <div class='owner'>
                    <p>YOU PICKED</p>
                    <p>THE HOUSE PICKED</p>
                </div>
                <div class='finish'>
                    <div class="${yChoose} ${result ? yChoose+'Winner' : ''}">
                        <img id='${yChoose}' src='./images/icon-${yChoose}.svg'>
                    </div>
                    
                    <div class="${oChoose} ${!result ? oChoose+'Winner' : ''}">
                        <img id='${oChoose}' src='./images/icon-${oChoose}.svg'>
                    </div>
                    <div class='returnContainer'>
                        <h1> YOU ${result ? 'WIN' : 'LOSE'}</h1>
                        <button id='playAgain' style="color: ${result ? 'green' : 'red'}">PLAY AGAIN</button>
                    </div>
                </div>
            </div>`,
        counter(result)
    }, 3000)
}

function counter(result){
    result ? score++ : score--
    renderingCounter()
    localStorage.setItem('score', score)
}

function isWin(choose){
    let oppositeVars = choises.filter(i => i!=choose)
    oppositeChoose = oppositeVars[Math.round(Math.random())]
    let result = choose === 'paper' & oppositeChoose === 'rock' ||
                 choose === 'rock' & oppositeChoose === 'scissors' ||
                 choose === 'scissors' & oppositeChoose === 'paper' ? true : false
    renderChooses(choose, oppositeChoose, result) 
}


