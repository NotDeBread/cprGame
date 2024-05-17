let cprGameActive = false
let health = 75
let bpm = 0
let paramedicTime = 45

setInterval(() => {
    if(cprGameActive) {
        health -= (0.02 + (0.1 - paramedicTime / 2000))
        updateHealthBar()
    }
}, 10);

const rhythmButton = doge('rhythmButton')
rhythmButton.timings = []
rhythmButton.lastTiming = 0
rhythmButton.onmousedown = () => {
    with(rhythmButton) {
        if(lastTiming) {
            //ADD TIMING
            const timing = Date.now() - lastTiming
            timings.push(timing)

            //REMOVE FIRST IF > 10
            if(timings.length > 10) {
                timings.shift()
            }

            //GET AVERAGE TIMING
            let total = 0
            for(let i = 0; i < timings.length; i++) {
                total += timings[i]
            }
            const average = total / timings.length

            //CHANGE COUNTER
            doge('BPMCounter').innerText = `BPM: ${DeBread.round((60 / average) * 1000)}`
            bpm = DeBread.round((60 / average) * 1000)

            //CHANGE HEALTHBAR
            // health -= Math.abs(timing - 500) / 250

            let goodnessText = ''
            if(Math.abs(timing - 500) < 100) {
                health++
                goodnessText = 'OK'
                if(Math.abs(timing - 500) < 50) {
                    health++
                    goodnessText = 'Good!'
                }
                if(Math.abs(timing - 500) < 25) {
                    health++
                    goodnessText = 'Great!'
                }
                if(Math.abs(timing - 500) < 10) {
                    health += 5
                    goodnessText = 'Perfect!'
                }
            } else {
                health--
                if(Math.abs(timing - 500) > 200) {
                    health--
                }
                if(Math.abs(timing - 500) > 300) {
                    health--
                }
                if(Math.abs(timing - 500) < 400) {
                    health--
                }

                if(timing - 500 > 0) {
                    goodnessText = 'Too slow!'
                } else {
                    goodnessText = 'Too fast!'
                }
            }
            doge('goodness').innerText = goodnessText

            if(health > 100) {
                health = 100
            }

            if(health < 0) {
                health = 0
            }

            updateHealthBar()

            const timingDiv = document.createElement('div')
            timingDiv.classList.add('timing')
            timingDiv.style.left = ((timing - 500) / 2) - 2.5 + 125 + 'px'
            doge('timingBar').append(timingDiv)
            setTimeout(() => {
                timingDiv.remove()
            }, 3000);
        }

        lastTiming = Date.now()
    
        //CLICK EFFECT
        const buttonEffect = document.createElement('div')
        buttonEffect.classList.add('rhythmButtonEffect')
        rhythmButton.append(buttonEffect)
        setTimeout(() => {
            buttonEffect.remove()
        }, 750);
    }
}

let medicInterval
function startMedicTimer() {
    medicInterval = setInterval(() => {
        paramedicTime--
        doge('paramedicDisplay').innerText = `PARAMEDICS ARRIVE IN 0:${paramedicTime.toString().padStart(2, 0)}`

        if(paramedicTime === 5) {
            doge('paramedicDisplay').style.animation = 'paramedicAnim 1s ease-out infinite forwards'
        }
        if(paramedicTime === 0) {
            doge('paramedicDisplay').style.animation = 'none'
            cprGameActive = false
            clearInterval(medicInterval)
            doge('gameCPR').style.pointerEvents = 'none'

            doge('fakeAmbulance').style.animation = `
            fakeAmbulanceAnim 3s linear 1 forwards, 
            fakeAmbulanceJumpIn 500ms ease-out 1s 1 forwards, 
            fakeAmbulanceJumpOut 500ms ease-in 1.5s 1 forwards`
            doge('fakeAmbulanceContainer').style.opacity = 1

            setTimeout(() => {
                doge('gameCPR').style.animation = 'shrink 250ms ease-in 1 forwards'
            }, 1250);

            setTimeout(() => {
                doge('gameCPR').style.display = 'none'
                doge('fakeAmbulanceContainer').style.opacity = 0
                doge('results').style.opacity = 1
                doge('retryButton').style.opacity = 1
                doge('retryButton').style.pointerEvents = 'unset'
                doge('retryButton').onclick = () => {
                    location.reload()
                }
            }, 3000);
        }
    }, 1000); 
}

function updateHealthBar() {
    doge('innerHealthBar').style.width = `${health}%`
    doge('innerHealthBar').style.backgroundColor = `hsl(${health}deg, 100%, 50%)`

    if(DeBread.round(health) === 0) {
        DeBread.shake(doge('healthBarContainer'), 10, 5, 5, 250)
        cprGameActive = false
        clearInterval(medicInterval)
        doge('failedScreen').style.display = 'flex'
    }
} updateHealthBar()