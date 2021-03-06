const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".time span b"),
    accTag = document.querySelector(".acc span"),
    cpmTag = document.querySelector(".cpm span"),
    mistakenTag = document.querySelector(".mistaken span");

let timer,
    timeSpent = charIndex = mistakes = isTyping = 0;
// 여기 채팅 기능 있음. 왼쪽 아래 LIVE SHARE 들어가면 거기 맨 아래에 session chat 있음
function loadParagraph() {
    typingText.innerHTML = "";
    for (let i = 0; i < paragraphs.length; i++) {
        setTimeout(() => {
            paragraphs[i].split("").forEach(char => {
                let span = `<span>${char}</span>`
                typingText.innerHTML += span;
            }, 1);
            let spanBr = `<span><br><br></span>`;
            typingText.innerHTML += spanBr;
        });
    }
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        accTag.innerText = Math.floor((characters.length - mistakes) / characters.length * 100) + '%';
        cpmTag.innerText = Math.floor((characters.length - mistakes) / timeSpent);


        var incorrects = document.getElementsByClassName("incorrect").innerText;
        mistakenTag.innerText = incorrects;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeSpent >= 0) {
        setTimeout(() => {
            timeSpent += 1;
        }, 1000);
        if (timeSpent % 60 == 0) {
            timeTag.innerText = Math.floor(timeSpent / 60) + 'm ' + 0 + 's';
        } else {
            timeTag.innerText = Math.floor(timeSpent / 60) + 'm ' + timeSpent % 60 + 's';
        }
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeSpent = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeSpent;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);