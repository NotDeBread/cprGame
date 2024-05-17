let gameActive = false

const game = doge('game')
const header = doge('webHeader')
function startGame() {
    gameActive = true

    //Remove header
    header.style.height = 0
    header.style.padding = '0px 50px'

    //Go fullscreen
    document.body.requestFullscreen()

    //Adjust game height
    game.style.height = window.innerHeight + 'px'
    setTimeout(() => {
        game.style.height = '100dvh'
        game.style.transition = 'filter ease-in-out 1s'

        game.style.filter = 'brightness(0%)'
        setTimeout(() => {
            doge('playbutton').style.display = 'none'
            startCutscene(cutscenes.intro)
            game.style.filter = 'brightness(100%)'
        }, 2000);
    }, 750);
    
    doge('playbutton').style.animation = 'playButtonAnim 2000ms ease-out 1 forwards'
}

const textures = [
    'ambulance.gif',
    'areyouokbg.png',
    'cprBG.png',
    'story0.gif',
    'story1.gif',
    'story2.gif'
]

function loadTexures(path, next) {
    let loaded = 0
    let total = textures.length
    for(const image in path) {
        const img = new Image()
        img.onload = () => {
            loaded++

            doge('texturesLoaded').innerText = `Loading Textures... ${loaded}/${total}`

            if(loaded === total) {
                if(next) {
                    next()
                }
            }
        }
        img.src = `media/${path[image]}`
    }
}
loadTexures(textures, () => {doge('texturesLoaded').innerText = 'All textures loaded!'})