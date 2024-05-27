        
        
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
        const message1 = document.querySelector("#message1");
        const message2 = document.querySelector("#message2");
        const scoresClass = document.querySelectorAll(".scores");
        const displayChoicesClass = document.querySelectorAll(".displaychoices")
        const gameSummary = document.querySelector("#gameSummary")
        let summaryArr = [];
        let n = 1; //round#

    
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
                message2.textContent = `Winner of this round: You! `
                summaryArr.push(message2.textContent);
            } else if (playerSelection === computerSelection) {
                roundResult.textContent = "TIE";
                message2.textContent = `Winner of this round: No winner.`
                summaryArr.push(message2.textContent);
            } else {
                computerScore++; 
                roundResult.textContent = "LOSE";
                message2.textContent = `Winner of this round: Computer!`
                summaryArr.push(message2.textContent);
            }
        }

        function handleEvent() {
            let playerSelection = this.getAttribute("id"); // Get the id of the clicked element
            
            // Display choices on screen
            userChoiceDisplay.textContent = playerSelection; 
            let computerSelection = getComputerChoice();
            pcChoiceDisplay.textContent = computerSelection;     
            roundNum.textContent = `Round ${n}`;
            message1.textContent = `Round ${n}: You chose ${playerSelection}, Computer chose ${computerSelection}.`
            summaryArr.push(message1.textContent);
        
            playRound(playerSelection, computerSelection);
            
            //Display scores on screen
            userScore.textContent = playerScore;           
            pcScore.textContent = computerScore;
            n++;

            if (playerScore == 5 && computerScore == 5) {
                
                message2.textContent = "Final Winner: No Winner, try again!";
                resetGame();    
            } else if (playerScore == 5 && computerScore < 5) {
                
                message2.textContent = "Final Winner: You!!";
                resetGame();
            } else if (playerScore < 5 && computerScore == 5) {
                
                message2.textContent = "Final Winner: Computer!";
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
            message1.textContent = "";

            //get rid of scores and displaychoices divs
            scoresClass.forEach(element => {
                element.style.display = "none";
            });

            displayChoicesClass.forEach(element => {
                element.style.display = "none";
            });
            

            //show game summaries
            gameSummary.textContent = summaryArr;
            
            imgs.forEach(img => {
                img.removeEventListener("click", handleEvent);
            });
        }
      
        // start game button
        
        btn.addEventListener("click", () => {
            summaryArr.length = 0;
            gameSummary.textContent = "";
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
            message1.textContent = "";
            message2.textContent = "";
            scoresClass.forEach(element => {
                element.style.display = "";
            });
            displayChoicesClass.forEach(element => {
                element.style.display = "";
            });

            
            
            
            playGame();

        });
        
