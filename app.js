        // Let's start by grabbing a reference to the <span> below.
        var userText = [];
        var wrongGuess = [];
        var lives = 10;

        // lets define what i need
        var secret = [];


        // this are the passwords
        var allpass = ["123123", "123456", "654321", "!@#$%", "1qaz2wsx", "aa123456", "abc123", "access", "admin", "ashley", "azerty", "bailey", "baseball", "batman", "charlie", "donald", "dragon", "flower", "football", "freedom", "hello", "hottie", "iloveyou", "jesus", "letmein", "login", "loveme", "master", "michael", "monkey", "mustang", "ninja", "passw0rd", "password", "password1", "princess", "qazwsx", "qwerty", "qwerty123", "qwertyuiop", "shadow", "solo", "starwars", "sunshine", "superman", "trustno1", "welcome", "whatever", "zaq1zaq1", "hangman", "costa"]
        //console.log(allpass.length);

        //choose at random
        randompass = allpass[Math.floor(Math.random() * allpass.length)]
        console.log(randompass);

        for (var i = 0; i < randompass.length; i++) {
            secret.push('*');
        }
        // console.log(secret);
        document.getElementById("pass_hidden").textContent = secret.join('|');


        // Next, we give JavaScript a function to execute when onkeyup event fires.
        document.onkeyup = function (event) {
            userText = event.key;
            // console.log(userText.toLowerCase());

            //lets check if I got it!
            if (randompass.indexOf(userText) > -1) {
                for (var i = 0; i < randompass.length; i++) {
                    if (randompass[i] === userText) {
                        secret[i] = userText;
                        //console.log(secret);
                        document.getElementById("pass_hidden").textContent = secret.join('|');
                    }
                }

            }

            else {
                if (wrongGuess.indexOf(userText) == -1) {
                    // console.log(wrongGuess.indexOf(userText));
                    wrongGuess.push(userText);
                    // console.log(wrongGuess);
                    lives--;
                }
                document.getElementById("user-text").textContent = wrongGuess.join(', ');
                document.getElementById("lives").textContent = lives;
                //console.log(wrongGuess);
            }



        };

        var reveal;
        function hintme() {
            reveal = secret.indexOf('*');

            for (var i = 0; i < randompass.length; i++) {
                if (randompass[i] === randompass[reveal]) {
                    secret[i] = randompass[reveal];
                    //console.log(secret);
                    document.getElementById("pass_hidden").textContent = secret.join('|');
                }
            }
            return randompass[reveal];
        }