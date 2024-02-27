        
        
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
        let n = 1;

    
        function getComputerChoice(){
            let randomNum = Math.floor(Math.random()*3);
            return choiceArray.at(randomNum);
        }

        // a funciton that plays the round and keeps scores
        function playRound(playerSelection, computerSelection){ 
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
            userScore.textContent = "0";
            pcScore.textContent = "0";
            userChoiceDisplay.textContent = "n/a";
            pcChoiceDisplay.textContent = "n/a";
            roundNum.textContent = "";
            
            playGame();

        });
        
