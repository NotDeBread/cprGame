const cutscenes = {
    intro: {
        data: [
            {
                img: 'story0.gif',
                text: '*You\'re talking to your friend. \n (Press space to progress dialogue)'
            },
            {
                img: 'story1.gif',
                text: '*But something feels off...'
            },            {
                img: 'story2.gif',
                text: '*You start to get worried.'
            },            {
                img: 'story3.gif',
                text: '*Your friend collapses! Perform the steps of CPR to save his life!'
            },
        ],
        done: false,
        whenDone: () => {
            game.style.filter = 'brightness(0%)'
            setTimeout(() => {
                doge('cutscene1').style.display = 'none'
                doge('gameCPR').style.display = 'flex'
                bgImg.style.display = 'none'
                game.style.filter = 'brightness(100%)'
                startCutscene(cutscenes.cprPreTutorial)
            }, 1000);
        }
    },
    cprPreTutorial: {
        data: [
            {
                text: 'Before you do anything, make sure the scene is safe.',
            },
            {
                text: 'If your friend is on something, take them off and put them on the floor.'
            },
            {
                text: 'After you decided that the scene is safe, make sure your friend is unresponsive.'
            },
            {
                text: 'You can do this by shaking them or shouting at them.'
            },
        ],
        whenDone: () => {
            doge('areyouok').style.display = 'flex'
            DeBread.shake(doge('areyouok'), 10, 20, 20, 500)
            setTimeout(() => {
                doge('areyouok').style.display = 'none'
                startCutscene(cutscenes.cprPreTutorial2)
            }, 2500);
        }
    },
    cprPreTutorial2: {
        data: [
            {
                text: 'Seems they\'re unresponsive.',
            },
            {
                text: 'Ok, the next step is to call 9-1-1',
            },
            {
                text: 'If there is someone nearby, make them call 9-1-1, else, do it yourself.'
            }
        ],
        whenDone: () => {
            doge('paramedicDisplay').style.opacity = 1
            DeBread.shake(doge('paramedicDisplay'), 10, 5, 5, 200)
            setTimeout(() => {
                startCutscene(cutscenes.cprTutorial)
            }, 200);
        }
    },
    cprTutorial: {
        data: [
            {
                text: 'Now, start doing chest compressions.'
            },
            {
                text: 'When performing chest compressions, you want to stay beating at a steady 120 BPM.'
            },
            {
                text: 'Thats the same BPM as songs like "Staying Alive" or "Baby Shark".'
            },
            {
                text: 'If you fail to maintain a steady 120 BPM, You friends\' health meter will go down.'
            },
            {
                text: 'If it goes all the way down, they die.'
            },
            {
                text: 'Are you ready? (Press space again to start)'
            }
        ],
        whenDone: () => {
            cprGameActive = true
            doge('gameCPR').style.pointerEvents = 'unset'
            startMedicTimer()
        }
    }
}
// cutscenes.intro.whenDone()
// startGame()

const bgImg = doge('cutsceneImg')
const dialogue = doge('dialogue')
function startCutscene(cutscene) {
    dialogue.style.display = 'unset'
    doge('cutscene1').style.display = 'unset'
    let progress = 0

    document.addEventListener('keydown', ev => {
        if(ev.key === ' ' && !cutscene.done) {
            if(progress < cutscene.data.length - 1) {
                progress++
                update()
            } else {
                cutscene.whenDone()
                cutscene.done = true
                dialogue.style.display = 'none'
            }
        }
    })

    function update() {
        if(cutscene.data[progress].img) {
            bgImg.src = `media/${cutscene.data[progress].img}`
        }
        dialogue.innerText = cutscene.data[progress].text
    } update()
}