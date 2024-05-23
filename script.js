        
        
        const choiceArray = ["rock", "paper", "scissors"]
        let playerScore = 0; 
        let computerScore = 0; 
        const options = document.querySelectorAll(".options");
        const btn = document.querySelector("button"); 
        const roundResult = document.querySelector("#roundResult");
        const userChoiceDisplay = document.querySelector("#userChoiceDisplay");
        const pcChoiceDisplay = document.querySelector('#pcChoiceDisplay');
        const roundNum = document.querySelector("#roundNum");
        const userScore = document.querySelector("#userScore");
        const pcScore = document.querySelector("#pcScore");
        const imgs = document.querySelectorAll("img");
        const gameLog = document.querySelector("#game-log");
        let n = 1; //round number

        // It might be interesting to store all of the results of the games
        // and show them on the screen.
        // An array of objects that look like:
        // {
        //    playerChoice: "rock" | "paper" | "scissors",
        //    computerChoice: "rock" | "paper" | "scissors",
        //    winner: "You!" | "The Computer" | "Cat 🙀"
        // }
        const gameResults = [];

        // Take the results of the game and add it to our game log!
        const logGameResults = (playerSelection, computerSelection) => {
            const gameDecision = decideGame(playerSelection, computerSelection);

            // This is called a "ternary expression" and is a really terse way to do an if/else block
            // x === y - this is the conditional check
            // ? - this is what to do if TRUE
            // : - this is what to do if false
            const winner =
              gameDecision === GameDecision.PlayerWin
                // if TRUE, return the string 'YOU!'
                ? "You!"
                // if FALSE, then run this other conditional expression
                : gameDecision === GameDecision.ComputerWin
                // if TRUE, return the string 'The Computer'
                ? "The Computer"
                // if FALSE, then return the string 'Cat'
                : "Cat 🙀";

            const gameResult = {
                playerChoice: playerSelection,
                computerChoice: computerSelection,
                winner: winner
            }

            gameResults.push(gameResult);
        }
    
        function getComputerChoice(){
            let randomNum = Math.floor(Math.random()*3);
            return choiceArray.at(randomNum);
        }

        // We can move the logic for determining how a game is scored, and
        // represent the result of that logic as an enumeration.
        // Object.freeze is a function that means the object can't be mutated/changed.
        // This is useful because we don't want to accidentally change the values of the object.
        const GameDecision = Object.freeze({
          PlayerWin: { name: "player" },
          ComputerWin: { name: "computer" },
          Tie: { name: "tie" },
        });

        // We don't need "else if" because we are returning from the function early if we find a match.
        // Also, because this function does all of the "business logic", we can reuse it in multiple places.
        // Like using it to play the round and update the UI, but also to log the game results!
        const decideGame = (playerSelection, computerSelection) => {
            if ((playerSelection === "rock" && computerSelection === "scissors") ||
                (playerSelection === "paper" && computerSelection === "rock") ||
                (playerSelection === "scissors" && computerSelection === "paper")) {
              return GameDecision.PlayerWin;
            }
            
            if (playerSelection === computerSelection) {
                return GameDecision.Tie
            }

            return GameDecision.ComputerWin
        }

        // a function that plays the round and keeps scores
        function playRound(playerSelection, computerSelection){ 
            const gameDecision = decideGame(playerSelection, computerSelection);

            if (gameDecision === GameDecision.PlayerWin) {
              playerScore++;
              roundResult.textContent = "WIN";
              console.log(`player score is ${playerScore}`);

            } else if (gameDecision === GameDecision.ComputerWin) {
                computerScore++;
                roundResult.textContent = "LOSE";
                console.log(`computer score is ${computerScore}`);
                
            } else {
                roundResult.textContent = "TIE";
            }

            logGameResults(playerSelection, computerSelection);
        }

        function handleEvent() {
            let playerSelection = this.getAttribute("id"); // Get the id of the clicked element
            
            // Display choices on screen
            userChoiceDisplay.textContent = playerSelection; 
            let computerSelection = getComputerChoice();
            pcChoiceDisplay.textContent = computerSelection;     
            roundNum.textContent = `Round ${n}`;
        
            playRound(playerSelection, computerSelection);
            
            //Display scores on screen
            userScore.textContent = playerScore;           
            pcScore.textContent = computerScore;
            n++;

            if (playerScore == 5 && computerScore == 5) {
                roundNum.textContent = "It's a tie!"; 
                resetGame();    
            } else if (playerScore == 5 && computerScore < 5) {
                roundNum.textContent = "You Won!";
                resetGame();
            } else if (playerScore < 5 && computerScore == 5) {
                roundNum.textContent = "You Lost!";
                resetGame();
            }
            
            createGameLog();
        }
        //a function that starts the game and announce the winner
        function playGame() {
            
            playerScore = 0;
            computerScore = 0;
            btn.style.display = "none"; //remove the start game button

            // Adding click event listener to each option
            
            imgs.forEach(img => {  
                img.addEventListener("click", handleEvent);
            });
        }
             
        // We need to generate list items for our unordered list
        // based on the results of each game.
        // By clearing all of the <li> elements and re-creating them,
        // we guarantee that the list displayed on the screen always matches
        // our gameResults array.
        const createGameLog = () => {
            gameLog.innerHTML = "";
            gameResults.forEach((result, index) => {
                const li = document.createElement("li");
                const message = `Round ${index + 1}: You chose ${result.playerChoice}, Computer chose ${result.computerChoice}. Winner: ${result.winner}!`;
                li.textContent = message;
                li.style.marginBottom = "3px";
                gameLog.appendChild(li);
            });
        }

        // Function that announces the winner at the end of the game
        function resetGame() {
            // Hide the img options
            options.forEach(option => {
                option.style.display = "";
            });

            btn.style.display = ""; //restore btn display to default (show button again)
            btn.textContent = "Play Again?"; 
            roundResult.textContent = "";
            
            imgs.forEach(img => {
                img.removeEventListener("click", handleEvent);
            });
        }
      
        // start game button
        
        btn.addEventListener("click", () => {
            options.forEach(option => {
                option.style.display = "flex";
            });
            
            playerScore = 0;
            computerScore = 0
            n = 1
            userScore.textContent = "0";
            pcScore.textContent = "0";
            userChoiceDisplay.textContent = "n/a";
            pcChoiceDisplay.textContent = "n/a";
            roundNum.textContent = "";

            // clear the log and reset the unordered list
            gameLog.innerHTML = "";
            gameResults.length = 0;
            
            playGame();
        });
        
