//Variaveis do relógio

const minutesDisplay = document.querySelector(".minutes")
const secondsDisplay = document.querySelector(".seconds")

const buttonPlay = document.querySelector(".play")
const buttonPause = document.querySelector(".pause")
const buttonStop = document.querySelector(".stop")
const buttonAddMinutes = document.querySelector(".add-minutes")
const buttonLessMinutes = document.querySelector(".less-minutes")

//Eventos do relógio

buttonPlay.addEventListener("click", function () {
  buttonPlay.classList.add("hide")
  buttonPause.classList.remove("hide")
  timer.countdown()
  sound.pressButton()
})

buttonPause.addEventListener("click", function () {
  buttonPlay.classList.remove("hide")
  buttonPause.classList.add("hide")
  timer.hold()
  sound.pressButton()
})

buttonStop.addEventListener("click", function () {
  timer.reset()
  timer.hold()
  sound.pressButton()
})

buttonAddMinutes.addEventListener("click", function () {
  fiveMoreMinutes()
  sound.pressButton()
})

buttonLessMinutes.addEventListener("click", function () {
  fiveMinutesLess()
  sound.pressButton()
})

//Funções do relógio

const timer = Timer({
  minutesDisplay,
  secondsDisplay,
})

function Timer({ minutesDisplay, secondsDisplay }) {
  let timerTimeOut
  let minutes = Number(minutesDisplay.textContent)

  function updateTimer(minutes, seconds) {
    minutes = minutes === undefined ? 0 : minutes
    seconds = seconds === undefined ? 0 : seconds

    minutesDisplay.textContent = String(minutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2, "0")
  }

  function reset() {
    buttonPlay.classList.remove("hide")
    buttonPause.classList.add("hide")
    updateTimer(minutes, 0)
    clearTimeout(timerTimeOut)
  }

  function countdown() {
    timerTimeOut = setTimeout(function () {
      let seconds = Number(secondsDisplay.textContent)
      let minutes = Number(minutesDisplay.textContent)
      let isFinished = minutes <= 0 && seconds <= 0

      updateTimer(minutes, 0)

      if (isFinished) {
        updateTimer()
        sound.timeEnd()
        soundBg.soundBgStop()

        reset()
        return
      }

      if (seconds <= 0) {
        seconds = 60
        --minutes
      }
      updateTimer(minutes, String(seconds - 1))
      countdown()
    }, 1000)
  }

  function hold() {
    clearTimeout(timerTimeOut)
  }

  return {
    countdown,
    reset,
    updateTimer,
    hold,
  }
}

function fiveMoreMinutes() {
  let minutes = Number(minutesDisplay.textContent)

  minutesDisplay.textContent = String(minutes + 5).padStart(2, "0")
}

function fiveMinutesLess() {
  let minutes = Number(minutesDisplay.textContent)

  minutesDisplay.textContent = String(minutes - 5).padStart(2, "0")
}

//Audios dos botões do relógio

function Sound() {
  const buttonPressAudio = new Audio(
    "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true"
  )

  const kitchenTimer = new Audio(
    "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true"
  )

  function pressButton() {
    buttonPressAudio.play()
  }

  function timeEnd() {
    kitchenTimer.play()
  }
  return {
    pressButton,
    timeEnd,
  }
}
const sound = Sound()

//Variaveis dos botões de som background

const buttonForestSound = document.querySelector(".forest-sound")
const buttonRainSound = document.querySelector(".rain-sound")
const buttonCoffeeshopSound = document.querySelector(".coffeeshop-sound")
const buttonFiresideSound = document.querySelector(".fireside-sound")

//Audios de background e funções dos audios

function SoundBg() {
  const buttonForestSoundOn = new Audio("./Sounds/Floresta.wav")

  const buttonRainSoundOn = new Audio("./Sounds/Chuva.wav")

  const buttonCoffeeshopSoundOn = new Audio("./Sounds/Cafeteria.wav")

  const buttonFiresideSoundOn = new Audio("./Sounds/Lareira.wav")

  buttonForestSoundOn.volume = 0.5
  buttonRainSoundOn.volume = 0.5
  buttonCoffeeshopSoundOn.volume = 0.5
  buttonFiresideSoundOn.volume = 0.5

  buttonForestSoundOn.loop = true
  buttonRainSoundOn.loop = true
  buttonCoffeeshopSoundOn.loop = true
  buttonFiresideSoundOn.loop = true

  const currentVolumeForest = document.querySelector("#volume-forest")
  const currentVolumeRain = document.querySelector("#volume-rain")
  const currentVolumeCoffeeshop = document.querySelector("#volume-coffeeshop")
  const currentVolumeFireside = document.querySelector("#volume-fireside")

  currentVolumeForest.addEventListener("change", changeVolumeForest)
  function changeVolumeForest() {
    buttonForestSoundOn.volume = currentVolumeForest.value / 10
  }

  currentVolumeRain.addEventListener("change", changeVolumeRain)
  function changeVolumeRain() {
    buttonRainSoundOn.volume = currentVolumeRain.value / 10
  }

  currentVolumeCoffeeshop.addEventListener("change", changeVolumeCoffeeshop)
  function changeVolumeCoffeeshop() {
    buttonCoffeeshopSoundOn.volume = currentVolumeCoffeeshop.value / 10
  }

  currentVolumeFireside.addEventListener("change", changeVolumeFireside)
  function changeVolumeFireside() {
    buttonFiresideSoundOn.volume = currentVolumeFireside.value / 10
  }

  function buttonForestSoundOnPlay() {
    buttonForestSoundOn.play()
    buttonRainSoundOn.pause()
    buttonCoffeeshopSoundOn.pause()
    buttonFiresideSoundOn.pause()
  }

  function buttonRainSoundOnPlay() {
    buttonRainSoundOn.play()
    buttonForestSoundOn.pause()
    buttonCoffeeshopSoundOn.pause()
    buttonFiresideSoundOn.pause()
  }

  function buttonCoffeeshopSoundOnPlay() {
    buttonCoffeeshopSoundOn.play()
    buttonForestSoundOn.pause()
    buttonRainSoundOn.pause()
    buttonFiresideSoundOn.pause()
  }

  function buttonFiresideSoundOnPlay() {
    buttonFiresideSoundOn.play()
    buttonForestSoundOn.pause()
    buttonRainSoundOn.pause()
    buttonCoffeeshopSoundOn.pause()
  }

  function soundBgStop() {
    buttonCoffeeshopSoundOn.pause()
    buttonForestSoundOn.pause()
    buttonRainSoundOn.pause()
    buttonFiresideSoundOn.pause()
  }

  return {
    buttonForestSoundOnPlay,
    buttonRainSoundOnPlay,
    buttonCoffeeshopSoundOnPlay,
    buttonFiresideSoundOnPlay,
    soundBgStop,
    currentVolumeForest,
    currentVolumeRain,
    currentVolumeCoffeeshop,
    currentVolumeFireside,
    changeVolumeForest,
    changeVolumeRain,
    changeVolumeCoffeeshop,
    changeVolumeFireside,
  }
}

const soundBg = SoundBg()

//Eventos e funções das animações dos botões dos audios

buttonForestSound.addEventListener("click", function () {
  soundBg.buttonForestSoundOnPlay()
  buttonForestSound.classList.remove("hider")
  buttonRainSound.classList.add("hider")
  buttonCoffeeshopSound.classList.add("hider")
  buttonFiresideSound.classList.add("hider")

  buttonForestSound.classList.add("hidering", "change-color-sound-controler")
  buttonRainSound.classList.remove("hidering", "change-color-sound-controler")
  buttonCoffeeshopSound.classList.remove(
    "hidering",
    "change-color-sound-controler"
  )
  buttonFiresideSound.classList.remove(
    "hidering",
    "change-color-sound-controler"
  )
})

buttonRainSound.addEventListener("click", function () {
  soundBg.buttonRainSoundOnPlay()
  buttonForestSound.classList.add("hider")
  buttonRainSound.classList.remove("hider")
  buttonCoffeeshopSound.classList.add("hider")
  buttonFiresideSound.classList.add("hider")

  buttonForestSound.classList.remove("hidering", "change-color-sound-controler")
  buttonRainSound.classList.add("hidering", "change-color-sound-controler")
  buttonCoffeeshopSound.classList.remove(
    "hidering",
    "change-color-sound-controler"
  )
  buttonFiresideSound.classList.remove(
    "hidering",
    "change-color-sound-controler"
  )
})

buttonCoffeeshopSound.addEventListener("click", function () {
  soundBg.buttonCoffeeshopSoundOnPlay()
  buttonForestSound.classList.add("hider")
  buttonRainSound.classList.add("hider")
  buttonCoffeeshopSound.classList.remove("hider")
  buttonFiresideSound.classList.add("hider")

  buttonForestSound.classList.remove("hidering", "change-color-sound-controler")
  buttonRainSound.classList.remove("hidering", "change-color-sound-controler")
  buttonCoffeeshopSound.classList.add(
    "hidering",
    "change-color-sound-controler"
  )
  buttonFiresideSound.classList.remove(
    "hidering",
    "change-color-sound-controler"
  )
})

buttonFiresideSound.addEventListener("click", function () {
  soundBg.buttonFiresideSoundOnPlay()
  buttonForestSound.classList.add("hider")
  buttonRainSound.classList.add("hider")
  buttonCoffeeshopSound.classList.add("hider")
  buttonFiresideSound.classList.remove("hider")

  buttonForestSound.classList.remove("hidering", "change-color-sound-controler")
  buttonRainSound.classList.remove("hidering", "change-color-sound-controler")
  buttonCoffeeshopSound.classList.remove(
    "hidering",
    "change-color-sound-controler"
  )
  buttonFiresideSound.classList.add("hidering", "change-color-sound-controler")
})

//Função para trocar entre dark mode e white mode

function toggleMode() {
  const html = document.documentElement
  html.classList.toggle("darkmode")
  sound.pressButton()
}
