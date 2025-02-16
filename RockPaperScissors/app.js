let userScore = 0;
let compScore = 0;
let round = 0;
let roundsPlayed = 0;
let uscore = document.getElementById("user-score");
let cscore = document.getElementById("comp-score");
let message = document.querySelector(".msg");
let resetGame = document.getElementById("reset");
let userNo = document.querySelector("#rounds");
let gameSection = document.querySelector(".game");
let inputN = document.querySelector(".inputNo");

// Handle rounds submission
document.querySelector("#submit").addEventListener("click", () => {
  round = parseInt(userNo.value.trim());
  if (isNaN(round) || round <= 0) {
    message.innerText = "Please enter a valid number of rounds!";
    round = 0;
    return;
  }
  roundsPlayed = 0;
  userScore = 0;
  compScore = 0;
  uscore.innerHTML = userScore;
  cscore.innerHTML = compScore;
  message.innerText = `Game set to ${round} rounds. Let's play!`;
  gameSection.classList.remove("hide"); // Show the game area
  inputN.classList.add("hide"); // Hide the input field
});

const choices = document.querySelectorAll(".choice");

const CompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const playGame = (userChoice) => {
  if (roundsPlayed >= round) return; //stop playing if the game has ended

  // console.log("User choice = " , userChoice);
  //generate computer choice
  const compChoice = CompChoice();
  // console.log("Computer choice = " , compChoice);

  if (userChoice === compChoice) {
    console.log("It's a tie");
  } else if (userChoice === "rock") {
    if (compChoice === "scissors") {
      console.log("User wins");
      userScore++;
    } else {
      console.log("Computer wins");
      compScore++;
    }
  } else if (userChoice === "paper") {
    if (compChoice === "rock") {
      console.log("User wins");
      userScore++;
    } else {
      console.log("Computer wins");
      compScore++;
    }
  } else if (userChoice === "scissors") {
    if (compChoice === "paper") {
      console.log("User wins");
      userScore++;
    } else {
      console.log("Computer wins");
      compScore++;
    }
  }

  uscore.innerHTML = userScore;
  cscore.innerHTML = compScore;

  message.classList.remove("user", "comp");

  if (userChoice === compChoice) {
    message.innerText = "It's a tie!";
    message.classList.add("tie");
  } else if (
    (userChoice === "rock" && compChoice === "scissors") ||
    (userChoice === "paper" && compChoice === "rock") ||
    (userChoice === "scissors" && compChoice === "paper")
  ) {
    message.innerText = "You win!";
    message.classList.add("user");
  } else {
    message.innerText = "Computer wins!";
    message.classList.add("comp");
  }

  roundsPlayed++;

  // Check if the game has ended
  setTimeout(() => {
    if (roundsPlayed === round) {
      let winnerMessage = "It's a tie overall!";

      // Clear any previous classes
      message.classList.remove("tie", "user", "comp");

      if (userScore > compScore) {
        message.classList.add("user");
        winnerMessage = "Congratulations! You win the game!";
      } else if (compScore > userScore) {
        message.classList.add("comp");
        winnerMessage = "Oops !! Computer wins the game!";
      } else {
        message.classList.add("tie");
      }

      message.innerText = `${winnerMessage} Reset to play again.`;
    }
  }, 1500);
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;
    // console.log("You clicked on " + userChoice);
    playGame(userChoice);
  });
});

// Reset game
resetGame.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  roundsPlayed = 0;
  round = 0;
  uscore.innerHTML = userScore;
  cscore.innerHTML = compScore;
  message.innerText = "Game reset! Enter rounds to start a new game.";
  message.classList.remove("user", "comp");
  gameSection.classList.add("hide"); // Hide the game area
  userNo.value = ""; // Clear the input field
  inputN.classList.remove("hide"); // Show the input field
});

//help icon 

// Select the help icon, modal, and close button
const helpIcon = document.querySelector('.help i');
const modal = document.getElementById('helpModal');
const closeModal = document.querySelector('.modal-content .close');

// Show the modal when help icon is clicked
helpIcon.addEventListener('click', () => {
    modal.style.display = 'flex'; // Show the modal
    modal.classList.add('fade-in'); // Add fade-in animation
    modal.classList.remove('fade-out'); // Remove any fade-out class
});

// Close the modal when clicking the close button
closeModal.addEventListener('click', () => {
    modal.classList.add('fade-out'); // Add fade-out animation
    modal.classList.remove('fade-in'); // Remove any fade-in class
    setTimeout(() => {
        modal.style.display = 'none'; 
    }, 300); 
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.add('fade-out'); // Add fade-out animation
        modal.classList.remove('fade-in'); // Remove any fade-in class
        setTimeout(() => {
            modal.style.display = 'none'; 
        }, 300); 
    }
});
