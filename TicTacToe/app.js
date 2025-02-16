let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newBtn = document.querySelector(".new");
let msgCont = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");


//2 players
let turnO = true; //playerX, playerO 

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgCont.classList.add("hide");
}

boxes.forEach( box => {
    box.addEventListener("click" , () => {
        // console.log("box clicked");
        if(turnO) {  //playerO
            box.innerText = "O";
            box.style.color = "red";
            turnO = false;
        } else {  //playerX
            box.innerText = "X";
            box.style.color = "blue";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    })
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations .... The Winner is ${winner}`;
    msgCont.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgCont.classList.remove("hide");
}


const checkWinner = () => {
    for(let pattern of winPatterns){
        // console.log(pattern[0] , pattern[1] , pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText , 
        //     boxes[pattern[1]].innerText , 
        //     boxes[pattern[2]].innerText
        // );

        let pos1Val = boxes[pattern[0]].innerText; 
        let pos2Val = boxes[pattern[1]].innerText; 
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3val){
                // console.log("Winner " , pos1Val);
                showWinner(pos1Val);
            }
        }
    }

    // Check for a draw (no winner and all boxes are filled)
    const isBoardFull = [...boxes].every(box => box.innerText !== "");
    if (isBoardFull) {
        showDraw();
    }
}

newBtn.addEventListener("click" , resetGame);
reset.addEventListener("click" , resetGame);

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