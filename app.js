// Let's start by grabbing a reference to the <span> below.
var userText = [];
var wrongGuess = [];
var lives = 10;
var wins = 0;
var hint = false;
var losses = 0;
var secret = [];
var allpass = ["123123", "123456", "654321", "!@#$%", "1qaz2wsx", "aa123456", "abc123", "access", "admin", "ashley", "azerty", "bailey", "baseball", "batman", "charlie", "donald", "dragon", "flower", "football", "freedom", "hello", "hottie", "iloveyou", "jesus", "letmein", "login", "loveme", "master", "michael", "monkey", "mustang", "ninja", "passw0rd", "password", "password1", "princess", "qazwsx", "qwerty", "qwerty123", "qwertyuiop", "shadow", "solo", "starwars", "sunshine", "superman", "trustno1", "welcome", "whatever", "zaq1zaq1", "hangman", "costa"]
// var allpass = ["qwertuiopasd"]
var allowedchars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "w", "v", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "&", "?"]

//choose at random
randompass = allpass[Math.floor(Math.random() * allpass.length)]
// console.log(randompass);
printskull();

function printskull() {
    console.log("      _.--,_");
    console.log("   .-'      '-.");
    console.log("  /            \\\\ ");
    console.log(" '          _.  '");
    console.log(" \\      ** /  ~(");
    console.log("  '=,,_ =\\__ `  &");
    console.log("        *  *'; \\\\\\ ");
    console.log("[" + randompass + "]");
}

for (var i = 0; i < randompass.length; i++) {
    secret.push('*');
}
// console.log(secret);
document.getElementById("pass_hidden").textContent = secret.join('|');

//create button
for (var i = 0; i < allowedchars.length; i++) {
    var button = document.createElement("button");
    button.textContent = allowedchars[i];
    button.setAttribute("class","letter");
    button.setAttribute("id","letter_" + allowedchars[i]);
    document.getElementById('buttons').appendChild(button);
    //onclick in html trick...
    button.setAttribute('onclick', 'clickme("' + allowedchars[i] + '")');
    // document.getElementById("letter_"+allowedchars[i]).onclick = function(){ clickme(allowedchars[i])};
}

document.getElementById("playAgain").onclick = function(){ playAgain()};

//bad implementation... but don't need to use "onclick in html anymore"
// document.getElementById("letter_a").onclick = function(){ clickme("a")};
// document.getElementById("letter_b").onclick = function(){ clickme("b")};
// document.getElementById("letter_c").onclick = function(){ clickme("c")};
// document.getElementById("letter_d").onclick = function(){ clickme("d")};
// document.getElementById("letter_e").onclick = function(){ clickme("e")};
// document.getElementById("letter_f").onclick = function(){ clickme("f")};
// document.getElementById("letter_g").onclick = function(){ clickme("g")};
// document.getElementById("letter_h").onclick = function(){ clickme("h")};
// document.getElementById("letter_i").onclick = function(){ clickme("i")};
// document.getElementById("letter_j").onclick = function(){ clickme("j")};
// document.getElementById("letter_k").onclick = function(){ clickme("k")};
// document.getElementById("letter_l").onclick = function(){ clickme("l")};
// document.getElementById("letter_m").onclick = function(){ clickme("m")};
// document.getElementById("letter_n").onclick = function(){ clickme("n")};
// document.getElementById("letter_o").onclick = function(){ clickme("o")};
// document.getElementById("letter_p").onclick = function(){ clickme("p")};
// document.getElementById("letter_q").onclick = function(){ clickme("q")};
// document.getElementById("letter_r").onclick = function(){ clickme("r")};
// document.getElementById("letter_s").onclick = function(){ clickme("s")};
// document.getElementById("letter_t").onclick = function(){ clickme("t")};
// document.getElementById("letter_u").onclick = function(){ clickme("u")};
// document.getElementById("letter_w").onclick = function(){ clickme("w")};
// document.getElementById("letter_v").onclick = function(){ clickme("v")};
// document.getElementById("letter_x").onclick = function(){ clickme("x")};
// document.getElementById("letter_y").onclick = function(){ clickme("y")};
// document.getElementById("letter_z").onclick = function(){ clickme("z")};
// document.getElementById("letter_1").onclick = function(){ clickme("1")};
// document.getElementById("letter_2").onclick = function(){ clickme("2")};
// document.getElementById("letter_3").onclick = function(){ clickme("3")};
// document.getElementById("letter_4").onclick = function(){ clickme("4")};
// document.getElementById("letter_5").onclick = function(){ clickme("5")};
// document.getElementById("letter_6").onclick = function(){ clickme("6")};
// document.getElementById("letter_7").onclick = function(){ clickme("7")};
// document.getElementById("letter_8").onclick = function(){ clickme("8")};
// document.getElementById("letter_9").onclick = function(){ clickme("9")};
// document.getElementById("letter_0").onclick = function(){ clickme("0")};
// document.getElementById("letter_!").onclick = function(){ clickme("!")};
// document.getElementById("letter_@").onclick = function(){ clickme("@")};
// document.getElementById("letter_#").onclick = function(){ clickme("#")};
// document.getElementById("letter_$").onclick = function(){ clickme("$")};
// document.getElementById("letter_%").onclick = function(){ clickme("%")};
// document.getElementById("letter_&").onclick = function(){ clickme("&")};
// document.getElementById("letter_?").onclick = function(){ clickme("?")};


// Next, we give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function (event) {
    if (secret.indexOf("*") > -1) {
        userText = event.key;
        if (allowedchars.indexOf(userText) > -1 && lives > 0) {
            clickme(userText);
        }
    }
}

//this is where user can get help...

function hintme() {
    hint = true;
    reveal = secret.indexOf('*');
    if (reveal > -1) {
        clickme(randompass[reveal]);
    }
    hint = false;
    return true;
}


//this is the main logic
function clickme(userText) {

    if (randompass.indexOf(userText) > -1) {
        for (var i = 0; i < randompass.length; i++) {
            if (randompass[i] === userText) {
                secret[i] = userText;
                document.getElementById("pass_hidden").textContent = secret.join('|');
            }
        }

    }

    else {

        if (wrongGuess.indexOf(userText) == -1 && lives > 0) {
            wrongGuess.push(userText);
            lives--;
        }
        // document.getElementById("user-text").textContent = wrongGuess.join(', ');
        document.getElementById("lives").textContent = lives;

    }
    //I need to add a logic to disable a button
    document.getElementById('letter_' + userText).setAttribute("disabled", "disabled");

    //check if win or lose
    if (secret.indexOf("*") == -1 && lives > 0) {
        wins++;
        for (var i = 0; i < allowedchars.length; i++) {
            document.getElementById('letter_' + allowedchars[i]).setAttribute("disabled", 'disabled');
        }
    }
    if (lives == 0 && secret.indexOf("*") > -1 && hint == false) {
        losses++;
        for (var i = 0; i < allowedchars.length; i++) {
            document.getElementById('letter_' + allowedchars[i]).setAttribute("disabled", 'disabled');
        }
        for (var i = 0; i < randompass.length; i++) {
            secret[i]=randompass[i];
        }
        document.getElementById("pass_hidden").textContent = secret.join('|');
    }
    //
    // console.log(wins,losses);
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    return true;
}

function playAgain() {
    wrongGuess = [""];
    lives = 10;
    randompass = allpass[Math.floor(Math.random() * allpass.length)];
    //console.log(randompass);
    printskull();
    secret = [];
    for (var i = 0; i < randompass.length; i++) {
        secret.push('*');
    }
    document.getElementById("pass_hidden").textContent = secret.join('|');
    for (var i = 0; i < allowedchars.length; i++) {
        document.getElementById('letter_' + allowedchars[i]).removeAttribute("disabled");
    }
    document.getElementById("lives").textContent = lives;
}
