//Game constants & variables
let inputDir = { x: 0, y: 0 };
// Update the audio file paths in app.js
const foodSound = new Audio("./assets/eat.mp3");
const gameOverSound = new Audio("./assets/game-over.mp3");
const moveSound = new Audio("./assets/turn.mp3");
let speed = 10;

// Add this function to change speed
function setDifficulty(newSpeed) {
  speed = newSpeed;
  
  // Update button styles
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

let lastpaintTime = 0;
let a = 5;
let b = 19;
let snakeArr = [
  {
    x: Math.round(a + (b - a) * Math.random()),
    y: Math.round(a + (b - a) * Math.random()),
  },
];
let food = {
  x: Math.round(a + (b - a) * Math.random()),
  y: Math.round(a + (b - a) * Math.random()),
};
let score = 0;
let resetGame = document.querySelector("#reset");

// Sound control

let stopSoundIcon = document.querySelector("#stopS");
let playSoundIcon = document.querySelector("#playS");

// Global sound control variable
let isSoundEnabled = true;

// Wrap sound play methods
function playMoveSound() {
  if (isSoundEnabled) {
    moveSound.play();
  }
}

function playFoodSound() {
  if (isSoundEnabled) {
    foodSound.play();
  }
}

function playGameOverSound() {
  if (isSoundEnabled) {
    gameOverSound.play();
  }
}

// Sound toggle functionality
function toggleSounds() {
  isSoundEnabled = !isSoundEnabled;

  // Pause all sounds if disabled
  if (!isSoundEnabled) {
    moveSound.pause();
    gameOverSound.pause();
    foodSound.pause();
  }

  // Toggle icon visibility
  playSoundIcon.style.display = isSoundEnabled ? "block" : "none";
  stopSoundIcon.style.display = isSoundEnabled ? "none" : "block";
}

playSoundIcon.addEventListener("click", toggleSounds);
stopSoundIcon.addEventListener("click", toggleSounds);

//Game functions

//resetting the game
resetGame.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastpaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  //if you come into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  if (snake[0].x > 20 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y < 0) {
    return true;
  }
  return false;
}

function gameEngine() {
  //Part 1 : Update food & snake
  if (isCollide(snakeArr)) {
    playGameOverSound();
    inputDir = { x: 0, y: 0 };
    alert("Game Over !! Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    scoreBox.innerHTML = "Snake Length : 0";
  }

  //if you have eaten the food , increment the score and regenerate food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    playFoodSound();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("highScore", JSON.stringify(hiscoreval));
      highScoreBox.innerHTML = "High Score : " + hiscoreval;
    }
    scoreBox.innerHTML = `Snake Length : ${score}`;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 17;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //PArt 2 : Display snake and food
  //Display snake
  board.innerHTML = "";
  snakeArr.forEach((el, idx) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = el.y;
    snakeElement.style.gridColumnStart = el.x;
    if (idx === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);

    //Display food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
  });
}

///Main logic
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
  hiscoreval = 0;
  localStorage.setItem("highScore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(highScore);
  highScoreBox.innerHTML = "High Score : " + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //Start game
  playMoveSound();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
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

