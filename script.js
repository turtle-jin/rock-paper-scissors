const choiceArray = ["rock", "paper", "scissors"]
        let playerScore = 0; 
        let computerScore = 0; 

        // a function that randomly returns "rock", "paper" or "scissors"
        function getComputerChoice(){
            let randomNum = Math.floor(Math.random()*3);
            return choiceArray.at(randomNum);
        }

        //a function that starts the game and announce the winner
        function playGame() {
            let n = 1; 
            while (n <= 5) {
                // const playerSelection = (prompt("What do you pick? Rock, paper or scissors? Enter Answer here: ")).toLowerCase();
                const computerSelection = getComputerChoice();
                console.log(`Round ${n}:`)
                console.log(playRound(playerSelection, computerSelection));
                console.log(`Player Score: ${playerScore}, Computer Score: ${computerScore}`)
                n += 1; 
            }

            if (playerScore > computerScore) {
                console.log("Congratulations, you win!")
            } else if (playerScore === computerScore) {
                console.log("You tie!")
            } else {
                console.log("Sorry, you lose!")
            }
        }
      
        // a funciton that plays the round and keeps scores
        function playRound(playerSelection, computerSelection){
            playerSelection = playerSelection.toLowerCase();
            
            if ((playerSelection === "rock" && computerSelection === "scissors") ||
                (playerSelection === "paper" && computerSelection === "rock") ||
                (playerSelection === "scissors" && computerSelection === "paper")) {
                playerScore += 1; 
                return `You win! \nComputer picked ${computerSelection.toUpperCase()}. \n${playerSelection.toUpperCase()} beats ${computerSelection.toUpperCase()}!`;
            } else if (playerSelection === computerSelection) {
                return `You tie! You both picked ${playerSelection.toUpperCase()}!`;
            } else {
                computerScore += 1; 
                return `You lose! \nComputer picked ${computerSelection.toUpperCase()}. \n${computerSelection.toUpperCase()} beats ${playerSelection.toUpperCase()}!`;
            }
        }
        
        

        playGame();