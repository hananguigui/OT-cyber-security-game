// List of words to guess
const words = ["hangman", "javascript", "programming", "computer", "web", "developer"];

let chosenWord = "";
let guessedWord = [];
let remainingAttempts = 6;

// Select a random word from the 'words' array
function chooseWord() {
    chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
}

// Initialize the guessedWord array with underscores
function initializeGuessedWord() {
    guessedWord = chosenWord.split('').map(letter => (letter === ' ' ? ' ' : '_'));
}

// Display the guessed word on the page
function displayWord() {
    document.getElementById('word-container').textContent = guessedWord.join(' ');
}

// Check if the guessed letter is in the chosen word
function checkLetter(letter) {
    let found = false;
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
            guessedWord[i] = letter;
            found = true;
        }
    }
    return found;
}

// Update the game state after a letter is guessed
function updateGame(letter) {
    const letterButton = document.getElementById(letter);
    if (!letterButton.disabled) {
        letterButton.disabled = true;
        if (checkLetter(letter)) {
            displayWord();
            if (!guessedWord.includes('_')) {
                endGame(true);
            }
        } else {
            remainingAttempts--;
            document.getElementById('remaining-attempts').textContent = remainingAttempts;
            if (remainingAttempts === 0) {
                endGame(false);
            }
        }
    }
}

// Set up the game
function setupGame() {
    chooseWord();
    initializeGuessedWord();
    displayWord();
    remainingAttempts = 6;
    document.getElementById('remaining-attempts').textContent = remainingAttempts;
    const lettersDiv = document.getElementById('letters');
    while (lettersDiv.firstChild) {
        lettersDiv.removeChild(lettersDiv.firstChild);
    }
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const letterButton = document.createElement('button');
        letterButton.textContent = letter;
        letterButton.id = letter;
        letterButton.onclick = () => updateGame(letter);
        lettersDiv.appendChild(letterButton);
    }
}

// End the game and show the result
function endGame(isWon) {
    const message = isWon ? "Congratulations! You guessed the word!" : "Game over. You ran out of attempts.";
    alert(message);
    setupGame();
}

// Start the game
setupGame();
