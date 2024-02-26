        
        
        const choiceArray = ["rock", "paper", "scissors"]
        let playerScore = 0; 
        let computerScore = 0; 
        const options = document.querySelectorAll(".options");
        const btn = document.querySelector("button"); 

        // a function that randomly returns "rock", "paper" or "scissors"
        function getComputerChoice(){
            let randomNum = Math.floor(Math.random()*3);
            return choiceArray.at(randomNum);
        }


        // a funciton that plays the round and keeps scores
        function playRound(playerSelection, computerSelection){
            const roundResult = document.querySelector("#roundResult");
                    
            
            if ((playerSelection === "rock" && computerSelection === "scissors") ||
                (playerSelection === "paper" && computerSelection === "rock") ||
                (playerSelection === "scissors" && computerSelection === "paper")) {
                playerScore++; 
                roundResult.textContent = "WIN";
                console.log(`player score is ${playerScore}`);
            } else if (playerSelection === computerSelection) {
                roundResult.textContent = "TIE";
            } else {
                computerScore++; 
                console.log(`computer score is ${computerScore}`);
                roundResult.textContent = "LOSE";
            }
        }
        
        //a function that starts the game and announce the winner
        function playGame() {
            let n = 1;
            playerScore = 0;
            computerScore = 0;
             //remove the start game button
             btn.style.display = "none";

            // Adding click event listener to each option
            const options = document.querySelectorAll("img");
            options.forEach(option => {


                function handleEvent() {
                    const playerSelection = this.getAttribute("id"); // Get the id of the clicked element
                    
                    // Display choices on screen
                    const userChoiceDisplay = document.querySelector("#userChoiceDisplay");
                    userChoiceDisplay.textContent = playerSelection;
                    const pcChoiceDisplay = document.querySelector('#pcChoiceDisplay');
                    const computerSelection = getComputerChoice();
                    pcChoiceDisplay.textContent = computerSelection;
                
                    const roundNum = document.querySelector("#roundNum");
                    roundNum.textContent = `Round ${n}`;
                
                    playRound(playerSelection, computerSelection);
                    const userScore = document.querySelector("#userScore");
                    userScore.textContent = playerScore;
                    const pcScore = document.querySelector("#pcScore");
                    pcScore.textContent = computerScore;
                
                    n++;
    
                    if (playerScore >= 5 || computerScore >= 5) {
                        
                        endGame();
                        
                    }
                }
                option.removeEventListener("click", handleEvent);
                option.addEventListener("click", handleEvent);
            });
        }
             


        // Function that announces the winner at the end of the game
        function endGame() {
            btn.style.display = "";
            btn.textContent = "Play Again?";
            roundResult.textContent = "";
            
            if (playerScore > computerScore) {
                roundNum.textContent = "You won!";
                return;

                
            } else if (playerScore === computerScore) {
                roundNum.textContent = "You Draw!";
                return
  
            } else {
                roundNum.textContent = "You lost!";
                return;
            } 
        }
      
        // start game button
        
        btn.addEventListener("click", () => {
            options.forEach(option => {
                
                option.style.display = "flex";
            });
             
            userScore.textContent = "0";
            pcScore.textContent = "0";
            userChoiceDisplay.textContent = "n/a";
            pcChoiceDisplay.textContent = "n/a";
            roundNum.textContent = "";
            
            playGame();

        });
