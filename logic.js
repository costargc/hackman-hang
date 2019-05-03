//initial declare
var gameWords = ["123123", "123456", "654321", "!@#$%", "1qaz2wsx", "aa123456", "abc123", "access", "admin", "ashley", "azerty", "bailey", "baseball", "batman", "charlie", "donald", "dragon", "flower", "football", "freedom", "hello", "hottie", "iloveyou", "jesus", "letmein", "login", "loveme", "master", "michael", "monkey", "mustang", "ninja", "passw0rd", "password", "password1", "princess", "qazwsx", "qwerty", "qwerty123", "qwertyuiop", "shadow", "solo", "starwars", "sunshine", "superman", "trustno1", "welcome", "whatever", "zaq1zaq1", "hangman", "costa"]
var allowedchars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "w", "v", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "&", "?"]

myGame = setupGame(gameWords, 0, 0); //console.log(myGame);
myRound = setupRound(gameWords);
randomgameWord = myGame.round.word; //console.log("randomgameWord: " + randomgameWord);
myRound.word = randomgameWord;
secret = getBlanks(randomgameWord); //console.log("secret: " + secret);
myRound.puzzleState = secret;
myRound.round.puzzleState = secret;
//initial declare - end

//build html
console.clear();
printskull(randomgameWord);
document.getElementById("puzzle-state").innerHTML = replaceText(secret.join(' '));
document.getElementById("playAgain").onclick = function () { playAgain() };
document.getElementById("hackhack").onclick = function () { hintme(secret) };
document.getElementById("guesses-left").textContent = myRound.guessesLeft;
//build html - end

//create button
for (var i = 0; i < allowedchars.length; i++) {
    var button = document.createElement("button");
    button.textContent = allowedchars[i];
    button.setAttribute("class", "letter");
    button.setAttribute("id", "letter_" + allowedchars[i]);
    document.getElementById('buttons').appendChild(button);
    // button.setAttribute('onclick', 'clickme("' + allowedchars[i] + '")');     //onclick in html trick...works!
    document.getElementById("letter_" + allowedchars[i]).onclick = getClickCallback(allowedchars[i]);     //solution without the onclick
}
//create button - end

// main logic
document.onkeyup = function (event) {
    if (secret.indexOf("_") > -1 && myRound.guessesLeft > 0) {
        letter = event.key;
        if (allowedchars.indexOf(letter) > -1 && myRound.wrongGuesses.indexOf(letter) == -1) {
            clickme(letter);
        }
    }
}
// main logic - end





// functions

function replaceText(text) {
    return text.replace(/_/g, '&#8727;');
}

function showsecret() {
    for (i = 0; i < secret.length; i++) {
        secret[i] = randomgameWord[i];
    }
}

function buttonClear() {
    for (var i = 0; i < allowedchars.length; i++) {
        document.getElementById('letter_' + allowedchars[i]).removeAttribute("disabled");
    }
    return true;
}

function buttonEnd() {
    for (var i = 0; i < allowedchars.length; i++) {
        document.getElementById('letter_' + allowedchars[i]).setAttribute("disabled", 'disabled');
    }
    return true;
}

//getclickcallback function so I can call it inside a for loop
function getClickCallback(letter) {
    return function () {
        clickme(letter);
    };
}

function playAgain() {
    myGame = setupGame(gameWords, myRound.wins, myRound.losses); //console.log(myGame);
    myRound = setupRound(gameWords);
    myRound.wins = myGame.wins;
    myRound.losses = myGame.losses;
    randomgameWord = myGame.round.word; //console.log("randomgameWord: " + randomgameWord);
    myRound.word = randomgameWord;
    secret = getBlanks(randomgameWord); //console.log("secret: " + secret);
    myRound.puzzleState = secret;
    myRound.round.puzzleState = secret;

    console.clear();
    printskull(randomgameWord);
    document.getElementById("puzzle-state").innerHTML = replaceText(secret.join(' '));
    document.getElementById("guesses-left").textContent = myRound.guessesLeft;

    //clean start
    buttonClear();
}

function printskull(randompass) {
    console.log("      _.--,_");
    console.log("   .-'      '-.");
    console.log("  /            \\\\ ");
    console.log(" '          _.  '");
    console.log(" \\      ** /  ~(");
    console.log("  '=,,_ =\\__ `  &");
    console.log("        *  *'; \\\\\\ ");
    console.log("[" + "./there-is-a" + "]");
    console.log("[" + "./better-way" + "]");
    console.log("[" + "./to-cheat" + "]");
    console.log("      _.--,_");
    console.log("   .-'      '-.");
    console.log("  /            \\\\ ");
    console.log(" '          _.  '");
    console.log(" \\      ** /  ~(");
    console.log("  '=,,_ =\\__ `  &");
    console.log("        *  *'; \\\\\\ ");
    console.log("[" + "randomgameWord" + "]");
}


function hintme(secret) {
    if (secret.indexOf('_') > -1) {
        clickme(randomgameWord[secret.indexOf('_')]);
    }
    return true;
}

function clickme(letter) {

    myRound = updateRound_fix(myRound, letter);
    document.getElementById("guesses-left").textContent = myRound.guessesLeft;
    document.getElementById('letter_' + letter).setAttribute("disabled", "disabled");

    if (isCorrectGuess(randomgameWord, letter)) {
        secret = fillBlanks(randomgameWord, secret, letter); //console.log("secret: " + secret);
        woncheck = hasWon(secret);
    }
    else {
        lostcheck = hasLost(myRound.guessesLeft);
    }

    endofround = isEndOfRound(myRound); //console.log(endofround);

    startmyRound = startNewRound_fix(myRound);
    document.getElementById("puzzle-state").innerHTML = replaceText(secret.join(' '));

}


function setupRound(testwords) {
    obj = {
        word: testwords,
        wins: 0,
        losses: 0,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: [],
        round: {
            guessesLeft: 9,
            wrongGuesses: [],
            puzzleState: [],
        }
    }
    return obj;
}

function setupGame(testWords, w, l) {
    obj = {
        words: testWords,
        wins: w,
        losses: l,
        guessesLeft: 9,
        round: {
            word: randomWord(testWords),
            guessesLeft: 9,
            wrongGuesses: [],
            puzzleState: [],
        }
    }
    return obj;
}

function randomWord(testWords) {
    var random_out = Math.random() * testWords.length
    var random_var = Math.floor(random_out);
    randomgameWord = testWords[random_var];
    return randomgameWord;
}

function getBlanks(word) {
    var allBlanks = [];
    for (var i = 0; i < word.length; i++) {
        allBlanks.push('_');
    }
    return allBlanks;
}

function fillBlanks(word, secret, letter) {
    for (i = 0; i < word.length; i++) {
        if (word[i] == letter) {
            secret[i] = word[i];
        }
    }
    return secret;
}



//startNewRound function does not properly update things - but its required in the test startNewRound_fix created
function startNewRound(testGame_obj) {
    if (testGame_obj.round.puzzleState.indexOf("_") == -1 && testGame_obj.round.guessesLeft > 0) {
        alert("winner winner chiken dinner" + testGame_obj.round.word);
        testGame_obj.wins++;
        //console.log("win game");
        return true;
    }
    else if (testGame_obj.round.puzzleState.indexOf("_") > -1 && testGame_obj.round.guessesLeft == 0) {
        alert("lose" + testGame_obj.round.word);
        testGame_obj.losses++;
        //console.log("lose game");
        return false;
    }
}
function startNewRound_fix(testGame_obj) {
    if (testGame_obj.round.puzzleState.indexOf("_") == -1 && testGame_obj.round.guessesLeft > 0) {
        testGame_obj.wins++;
        document.getElementById("wins").textContent = testGame_obj.wins;
        glowMe("wins");

        // alert("winner winner chicken dinner \n\"" + testGame_obj.word + "\"");
        //console.log("win game");
        buttonEnd();
        return true;
    }
    else if (testGame_obj.round.puzzleState.indexOf("_") > -1 && testGame_obj.round.guessesLeft == 0) {
        testGame_obj.losses++;
        document.getElementById("losses").textContent = testGame_obj.losses;
        glowMe("losses");

        // alert("loser, loser, now who is dinner? \n\"" + testGame_obj.word + "\"");
        //console.log("lose game");

        //show secret
        showsecret();
        buttonEnd();
        return false;
    }
}

function glowMe(status) {
    if (status == "losses") {
        // glow effect win
        document.getElementById("title_l").setAttribute("id", "title_l_glow");
        document.getElementById("scoreboard_l").setAttribute("id", "scoreboard_l_glow");
        setTimeout(function () {
            document.getElementById("title_l_glow").setAttribute("id", "title_l");
            document.getElementById("scoreboard_l_glow").setAttribute("id", "scoreboard_l");
        }, 700);
    }
    else if (status == "wins") {
        // glow effect win
        document.getElementById("title_w").setAttribute("id", "title_w_glow");
        document.getElementById("scoreboard_w").setAttribute("id", "scoreboard_w_glow");
        setTimeout(function () {
            document.getElementById("title_w_glow").setAttribute("id", "title_w");
            document.getElementById("scoreboard_w_glow").setAttribute("id", "scoreboard_w");
        }, 700);
    }
}

//updateRound function does not properly update things - but its required in the test updateRound_fix created
function updateRound(wordobj, letter) {
    if (wordobj.word.indexOf(letter) > -1) {
        wordobj.puzzleState[wordobj.word.indexOf(letter)] = wordobj.word[wordobj.word.indexOf(letter)];
        return wordobj;
    }
    wordobj.wrongGuesses.push(letter);
    wordobj.guessesLeft--;
    // wordobj.round.guessesLeft--;
    return wordobj;
}
function updateRound_fix(wordobj, letter) {
    if (wordobj.word.indexOf(letter) > -1) {
        wordobj.puzzleState[wordobj.word.indexOf(letter)] = wordobj.word[wordobj.word.indexOf(letter)];
        return wordobj;
    }
    wordobj.wrongGuesses.push(letter);
    wordobj.guessesLeft--;
    wordobj.round.guessesLeft--;
    return wordobj;
}


function hasWon(secret) {
    if (secret.indexOf("_") > -1) {
        return false
    }
    return true;
}

function hasLost(guessesLeft) {
    if (guessesLeft > 0) {
        return false;
    }
    return true;
}

//I'm not going to use this as my index is based on "*" and not "_"
function isEndOfRound(round) {
    if (round.puzzleState.indexOf("_") > -1 && round.guessesLeft > 0) {
        return false;
    }
    return true;
}

function isCorrectGuess(word, letter) {
    if (word.indexOf(letter) > -1) {
        return true;
    }
    return false;
}

// functions - end