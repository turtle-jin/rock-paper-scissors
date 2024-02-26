        
        
        const choiceArray = ["rock", "paper", "scissors"]
        let playerScore = 0; 
        let computerScore = 0; 
        const options = document.querySelectorAll(".options");

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
                playerScore += 1; 
                roundResult.textContent = "WIN";
            } else if (playerSelection === computerSelection) {
                roundResult.textContent = "TIE";
            } else {
                computerScore += 1; 
                console.log(`computer score is ${computerScore}`);
                roundResult.textContent = "LOSE";
            }
        }
        
        //a function that starts the game and announce the winner
        function playGame() {
            let n = 1;
            

            // Adding click event listener to each option
            const options = document.querySelectorAll("img");
            options.forEach(option => {
                option.addEventListener("click", function () {
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
        
                    if (n > 5) {
                     
                        endGame();
                        return;
                    }
                });
            });
        }
             


        // Function that announces the winner at the end of the game
        function endGame() {
            roundResult.textContent = "";
            
            if (playerScore > computerScore) {
                roundNum.textContent = "Congratulations, you won!";

                
            } else if (playerScore === computerScore) {
                roundNum.textContent = "You Draw! Play Again?";
  
            } else {
                roundNum.textContent = "Sorry, you lost!";

            } 
        }
      

        
        // start game button
        const btn = document.querySelector("button"); 
        btn.addEventListener("click", () => {
            n = 0;
            options.forEach(option => {
                
                option.style.display = "flex";
            });
             
            userScore.textContent = "0";
            pcScore.textContent = "0";
            userChoiceDisplay.textContent = "n/a";
            pcChoiceDisplay.textContent = "n/a";
            playGame();

        });
