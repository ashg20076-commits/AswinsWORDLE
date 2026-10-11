const rows = document.querySelectorAll(".rows");
let currentRow = 0;
let gameOver = false;

const resultLabel = document.querySelector(".resultLabel");
const enterBtn = document.querySelector(".enterBtn");
const deleteBtn = document.querySelector(".deleteBtn");

const secretWord = "slate";
const secretwordLetters = secretWord.split("");


rows.forEach(function (row, index) {
    const boxes = row.querySelectorAll(".inputBox");

    boxes.forEach(function (box) {
        box.disabled = index !== 0;
    });
});

function checkplayerGuess() {
    if (gameOver || currentRow >= rows.length) return;

    const activeRow = rows[currentRow];
    const inputBoxes = activeRow.querySelectorAll(".inputBox");
    let playerGuess = [];

    // Stop if any box is empty.
    for (let i = 0; i < inputBoxes.length; i++) {
        if (inputBoxes[i].value.trim() === "") {
            activeRow.classList.add("shake");
            return;
        }
    }

    // Collect the letters.
    inputBoxes.forEach(function (input) {
        playerGuess.push(input.value.toLowerCase());
    });

    // Color the boxes.
    for (let i = 0; i < inputBoxes.length; i++) {
        if (secretwordLetters[i] === playerGuess[i]) {
            inputBoxes[i].style.backgroundColor = "#559150";
        } else if (secretWord.includes(playerGuess[i])) {
            inputBoxes[i].style.backgroundColor = "#C8B653";
        } else {
            inputBoxes[i].style.backgroundColor = "#3a3a3c";
        }

        inputBoxes[i].style.border = "2px solid transparent";
    }

    // Lock the submitted row.
    inputBoxes.forEach(function (box) {
        box.disabled = true;
    });

    // Stop after a win.
    if (secretWord === playerGuess.join("")) {
        resultLabel.textContent =
            `You guessed it in ${currentRow + 1}!`;
        gameOver = true;
        return;
    }

    currentRow++;

    
    if (currentRow >= rows.length) {
        resultLabel.textContent =
            `Game over! The word was ${secretWord.toUpperCase()}.`;
        gameOver = true;
        return;
    }

    
    const nextBoxes = rows[currentRow].querySelectorAll(".inputBox");

    nextBoxes.forEach(function (box) {
        box.disabled = false;
    });

    nextBoxes[0].focus();
}


rows.forEach(function (row) {
    row.addEventListener("animationend", function () {
        row.classList.remove("shake");
    });
});

function reset() {
    if (gameOver || currentRow >= rows.length) return;

    const boxes = rows[currentRow].querySelectorAll(".inputBox");

    boxes.forEach(function (box) {
        box.value = "";
    });

    boxes[0].focus();
}

function refresh() {
    location.reload();
}