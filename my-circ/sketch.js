let bkgdColor, foreColor;
let tFont = {};
let pgTextSize = 22;
let inputText = "rosamundi";
let coreTap;
let currentFont = "RiformaLL-Bold"; // Устанавливаем начальный шрифт

let motionType = 0;
let accelType = 3;

let animateOn = true;
let spinOn = true;

let delayCenter = 0;
let scrubTicker = 0;
let loopLength = 0;

let exportSVGon = false;
let isRecording = false;
let mediaRecorder;
let recordedChunks = [];
let recordDuration = 20 * 30; // 20 секунд при 30 кадрах в секунду
let frameCountRecord = 0;
let canvasStream;

function preload() {
    // Загружаем все шрифты
    tFont["EditorialNew-Regular"] = loadFont("resources/EditorialNew-Regular.otf");
    tFont["Inter-Regular"] = loadFont("resources/Inter-Regular.ttf");
    tFont["NeueMontreal-Bold"] = loadFont("resources/NeueMontreal-Bold.ttf");
    tFont["NeueMontreal-Regular"] = loadFont("resources/NeueMontreal-Regular.ttf");
    tFont["RiformaLL-Bold"] = loadFont("resources/RiformaLL-Bold.otf");
    tFont["RiformaLL-Regular"] = loadFont("resources/RiformaLL-Regular.otf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    bkgdColor = color('#000000');
    foreColor = color('#ffffff');

    frameRate(30);
    noSmooth();
    textureMode(NORMAL);
    rectMode(CENTER);

    document.getElementById("text0").value = inputText;

    coreTap = new Tapestry();

    // Настройка для записи анимации
    canvasStream = canvas.captureStream(30); // Захват потока с канваса
    mediaRecorder = new MediaRecorder(canvasStream);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;
}


function draw() {
    clear();
    background(bkgdColor);

    push();
    translate(width / 2, height / 2);
    if (spinOn) {
        rotate(frameCount * -0.001);
    }
    coreTap.run();
    pop();

    if (exportSVGon) {
        save("Tapestry_Animation.svg");
        exportSVGon = false;
    }

    if (isRecording) {
        if (frameCountRecord < recordDuration) {
            frameCountRecord++;
        } else {
            mediaRecorder.stop();
            isRecording = false;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function updateInnerRad(value) {
    innerRad = parseFloat(value);
    coreTap.innerRad = innerRad; // Обновляем значение в объекте Tapestry
    coreTap.setText(); // Перезапускаем текст с новым радиусом
}

function updateTextSize(element) {
    pgTextSize = int(element.value);
    document.getElementById("textSizeValue").innerText = pgTextSize;
    coreTap.setText();
}

function updateLineCount(element) {
    coreTap.lineCount = int(element.value);
    document.getElementById("lineCountValue").innerText = coreTap.lineCount;
    coreTap.setText();
}

function updateLetterSpace(element) {
    coreTap.letterSpacer = float(element.value);
    document.getElementById("letterSpaceValue").innerText = coreTap.letterSpacer;
    coreTap.setText();
}

function updateSpacing(element) {
    coreTap.lineSpace = float(element.value);
    document.getElementById("spacingValue").innerText = coreTap.lineSpace;
    coreTap.setText();
}

function updateOscCount(element) {
    coreTap.oscCount = int(element.value);
    document.getElementById("oscCountValue").innerText = coreTap.oscCount;
    coreTap.setText();
}

function updateText() {
    inputText = document.getElementById("text0").value;
    coreTap.setText();
}

function updateFont() {
    const fontSelect = document.getElementById("fontSelector");
    currentFont = fontSelect.value;
    coreTap.setText(); // Обновляем текст для применения нового шрифта
}

function updateBkgdColor(event) {
    bkgdColor = color(event.target.value);
}

function updateForeColor(event) {
    foreColor = color(event.target.value);
}

function updateMotionType() {
    motionType = int(document.getElementById("motionType").value);
}

function updateAccelType() {
    accelType = int(document.getElementById("accelType").value);
}

function toggleSpin() {
    spinOn = !spinOn;
}

function exportSVG() {
    exportSVGon = true;
}

function startRecording() {
    if (!isRecording) {
        recordedChunks = []; // Очистка предыдущих записей
        mediaRecorder.start();
        frameCountRecord = 0;
        isRecording = true;
    }
}

function stopRecording() {
    if (isRecording) {
        mediaRecorder.stop();
        isRecording = false;
    }
}

function handleDataAvailable(event) {
    if (event.data.size > 0) {
        recordedChunks.push(event.data);
    }
}

function handleStop() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'animation.webm';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    recordedChunks = [];
}

function coreEngine(tk0){
    if(motionType == 0){          // IN-OUT
      if(accelType == 0){
        return easeInOutSine(tk0);
      } else if(accelType == 1){
        return easeInOutCirc(tk0);
      } else if(accelType == 2){
        return easeInOutQuint(tk0);
      } else if(accelType == 3){
        return easeInOutExpo(tk0);
      } else if(accelType == 4){
        return easeInOutBack(tk0);
      } else if(accelType == 5){
        return easeInOutBounce(tk0);
      } else if(accelType == 6){
        return easeInOutElastic(tk0);
      }
    } else if(motionType == 1){  // IN
      if(accelType == 0){
        return easeInSine(tk0);
      } else if(accelType == 1){
        return easeInCirc(tk0);
      } else if(accelType == 2){
        return easeInQuint(tk0);
      } else if(accelType == 3){
        return easeInExpo(tk0);
      } else if(accelType == 4){
        return easeInBack(tk0);
      } else if(accelType == 5){
        return easeInBounce(tk0);
      } else if(accelType == 6){
        return easeInElastic(tk0);
      }
    } else if(motionType == 2){  // OUT
      if(accelType == 0){
        return easeOutSine(tk0);
      } else if(accelType == 1){
        return easeOutCirc(tk0);
      } else if(accelType == 2){
        return easeOutQuint(tk0);
      } else if(accelType == 3){
        return easeOutExpo(tk0);
      } else if(accelType == 4){
        return easeOutBack(tk0);
      } else if(accelType == 5){
        return easeOutBounce(tk0);
      } else if(accelType == 6){
        return easeOutElastic(tk0);
      }
    }
  }


  function looper(x) {
    var newX;
    if(x%2 < 1){
      newX = x%1;
    } else {
      newX = map(x%1, 0, 1, 1, 0);
    }
    return newX;
  }
  
  ////////////////////////////////////// SINE
  function easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  }
  
  function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
  }
  
  function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }
  
  ////////////////////////////////////// CUBIC
  function easeInCubic(x) {
    return x * x * x;
  }
  
  function easeOutCubic(x) {
    return 1 - pow(1 - x, 3);
  }
  
  function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
  
  ////////////////////////////////////// CIRC
  function easeInCirc(x){
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  }
  
  function easeOutCirc(x){
    return sqrt(1 - Math.pow(x - 1, 2));
  }
  
  function easeInOutCirc(x) {
    return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }
  
  ////////////////////////////////////// QUAD
  function easeInQuad(x) {
    return x * x;
  }
  
  function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }
  
  function easeInOutQuad(x) {
    return x < 0.5
      ? 2 * x * x
      : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }
  
  ////////////////////////////////////// QUINT
  function easeOutQuint(x){
    return 1 - Math.pow(1 - x, 5);
  }
  
  function easeInQuint(x) {
    return x * x * x * x * x;
  }
  
  function easeInOutQuint(x) {
    return x < 0.5 
      ? 16 * x * x * x * x * x
      : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }
  
  
  ////////////////////////////////////// EXPO
  function easeInExpo(x) {
    return x === 0 ? 0 : pow(2, 10 * x - 10);
  }
  
  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }
  
  function easeInOutExpo(x) {
    return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
  }
  
  ////////////////////////////////////// BACK
  function easeInBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    
    return c3 * x * x * x - c1 * x * x;
  }
  
  function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }
  
  function easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
  
    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }
  
  ////////////////////////////////////// BOUNCE
  function easeInBounce(x) {
    return 1 - easeOutBounce(1 - x);
  }
  
  function easeOutBounce(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }
  
  function easeInOutBounce(x) {
    return x < 0.5
      ? (1 - easeOutBounce(1 - 2 * x)) / 2
      : (1 + easeOutBounce(2 * x - 1)) / 2;
  }
  
  ////////////////////////////////////// ELASTIC
  function easeInElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    
    return x === 0
      ? 0
      : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }
  
  function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }
  
  function easeInOutElastic(x) {
    const c5 = (2 * Math.PI) / 4.5;
  
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
  }
  
  
  

function easeInOutExpo(x) {
    return x === 0
        ? 0
        : x === 1
        ? 1
        : x < 0.5
        ? pow(2, 20 * x - 10) / 2
        : (2 - pow(2, -20 * x + 10)) / 2;
}

class Tapestry {
    constructor() {
        this.lineCount = 36;
        this.oscCount = 5;
        this.innerRad = 150;
        this.outerRad = 700;
        this.lineSpace = 0.8; // Теперь это межстрочное расстояние
        this.letterSpacer = 1.0; // Интервал между буквами

        this.lineRad = [];
        this.lineAng = [];
        this.lineAngStart = [];
        this.lineAngMax = [];
        this.lineFullAng = [];
        this.nDelay = -1;
        this.mDelay = -2;
        this.animWindow = 90;
        this.pauseWindow = 70;
        this.ticker = [];
        this.scrubDelay = [];
        this.centerYtarget = 0;
        this.centerY = [];
        this.ranRotTarget = [];
        this.ranRot = [];
        this.justifyMode = 3;

        this.setText();
    }

    setText() {
        textSize(pgTextSize);
        textFont(tFont[currentFont]);

        this.lineDistCore = textWidth("O") * this.letterSpacer;
        this.inputTextLine = [];

        for (let m = 0; m < this.lineCount; m++) {
            this.inputTextLine[m] = inputText;
            this.ranRotTarget[m] = random(-PI, PI);

            if (floor(m / this.oscCount) % 2 < 1) {
                for (let p = 0; p < m % this.oscCount; p++) {
                    this.inputTextLine[m] += " " + inputText;
                }
            } else {
                for (let p = this.oscCount - 1; p > (m % this.oscCount) - 1; p--) {
                    this.inputTextLine[m] += " " + inputText;
                }
            }
        }

        for (let m = 0; m < this.lineCount; m++) {
            this.lineRad[m] = this.innerRad + m * pgTextSize * this.lineSpace;
            this.lineAngStart[m] = this.lineDistCore / this.lineRad[m];
            this.lineAngMax[m] = TWO_PI / this.inputTextLine[m].length;

            this.ticker[m] = [];
            this.scrubDelay[m] = [];
            this.lineAng[m] = [];
            this.centerY[m] = [];
            for (let n = 0; n < this.inputTextLine[m].length; n++) {
                let mDist = dist(m, 0, 0, 0);
                let nDist = dist(n, 0, 0, 0);

                let mDelay = mDist * this.mDelay;
                let nDelay = nDist * this.nDelay;

                this.ticker[m][n] = mDelay + nDelay;
                this.scrubDelay[m][n] = this.ticker[m][n];
                this.lineAng[m][n] = 0;
                this.centerY[m][n] = 0;
            }
        }

        this.centerYtarget = 0;

        loopLength = (this.animWindow + this.pauseWindow) + (this.oscCount * inputText.length * abs(this.nDelay)) + this.lineCount * abs(this.mDelay);
    }

    run() {
        this.updateMotion();
        this.display();
    }

    updateMotion() {
        for (let m = 0; m < this.lineCount; m++) {
            this.lineFullAng[m] = 0;
            for (let n = 0; n < this.inputTextLine[m].length; n++) {
                let thisTicker;

                if (animateOn) {
                    thisTicker = this.ticker[m][n];
                    this.ticker[m][n]++;
                } else {
                    thisTicker = scrubTicker - this.scrubDelay[m][n];
                }

                if (thisTicker < 0) {
                    this.lineAng[m][n] = this.lineAngStart[m];
                    this.centerY[m][n] = this.centerYtarget;
                } else if (thisTicker < this.animWindow) {
                    let tk0 = map(thisTicker, 0, this.animWindow, 0, 1);
                    this.lineAng[m][n] = map(coreEngine(tk0), 0, 1, this.lineAngStart[m], this.lineAngMax[m]);
                    this.centerY[m][n] = map(coreEngine(tk0), 0, 1, this.centerYtarget, 0);
                } else if (thisTicker < this.animWindow + this.pauseWindow) {
                    this.lineAng[m][n] = this.lineAngMax[m];
                    this.centerY[m][n] = 0;
                } else if (thisTicker < this.animWindow * 2 + this.pauseWindow) {
                    let tk0 = map(thisTicker, this.animWindow + this.pauseWindow, this.animWindow * 2 + this.pauseWindow, 0, 1);
                    this.lineAng[m][n] = map(coreEngine(tk0), 0, 1, this.lineAngMax[m], this.lineAngStart[m]);
                    this.centerY[m][n] = map(coreEngine(tk0), 0, 1, 0, this.centerYtarget);
                } else {
                    this.lineAng[m][n] = this.lineAngStart[m];
                    this.centerY[m][n] = this.centerYtarget;
                }

                if (n < this.inputTextLine[m].length - 1) {
                    this.lineFullAng[m] += this.lineAng[m][n];
                }

                if (this.ticker[m][n] > this.animWindow * 2 + this.pauseWindow * 2) {
                    this.ticker[m][n] = 0;
                }
            }

            let randomRotTicker;
            if (animateOn) {
                randomRotTicker = this.ticker[m][0];
            } else {
                randomRotTicker = scrubTicker - this.scrubDelay[m][0];
            }
            if (randomRotTicker < 0) {
                this.ranRot[m] = this.ranRotTarget[m];
            } else if (randomRotTicker < this.animWindow) {
                let tk0 = map(randomRotTicker, 0, this.animWindow, 0, 1);
                this.ranRot[m] = map(easeInOutExpo(tk0), 0, 1, this.ranRotTarget[m], 0);
            } else if (randomRotTicker < this.animWindow + this.pauseWindow) {
                this.ranRot[m] = 0;
            } else if (randomRotTicker < this.animWindow * 2 + this.pauseWindow) {
                let tk0 = map(randomRotTicker, this.animWindow + this.pauseWindow, this.animWindow * 2 + this.pauseWindow, 0, 1);
                this.ranRot[m] = map(easeInOutExpo(tk0), 0, 1, 0, this.ranRotTarget[m]);
            } else {
                this.ranRot[m] = this.ranRotTarget[m];
            }
        }
    }

    display() {
        textFont(tFont[currentFont]);
        textSize(pgTextSize);
        noStroke();
        fill(foreColor);
        textAlign(CENTER);

        push();
        for (let m = 0; m < this.lineCount; m++) {
            let culmAng = 0;
            for (let n = 0; n < this.inputTextLine[m].length; n++) {
                let thisAng = culmAng;
                if (this.justifyMode == 0) {
                    thisAng = -this.lineFullAng[m] / 2 - PI / 2 + culmAng;
                } else if (this.justifyMode == 1) {
                    thisAng = -PI / 2 + culmAng;
                } else if (this.justifyMode == 2) {
                    thisAng = -this.lineFullAng[m] - PI / 2 + culmAng;
                } else if (this.justifyMode == 3) {
                    thisAng = culmAng;
                }

                let x = cos(thisAng) * this.lineRad[m];
                let y = sin(thisAng) * this.lineRad[m];

                push();
                if (this.justifyMode == 3) {
                    rotate(this.ranRot[m]);
                }
                translate(x, y);

                translate(0, this.centerY[m][n]);

                rotate(thisAng + PI / 2);
                translate(0, pgTextSize * 0.7 / 2);

                text(this.inputTextLine[m].charAt(n), 0, 0);
                pop();

                culmAng += this.lineAng[m][n];
            }
        }
        pop();
    }
}
