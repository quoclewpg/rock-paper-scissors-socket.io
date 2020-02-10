const user1_score= document.getElementById("user-1-score");
const user2_score = document.getElementById("user-2-score");
const score_board = document.querySelector(".score-board");
const result = document.querySelector(".result");
const rock_choice = document.getElementById("r");
const paper_choice = document.getElementById("p");
const scissors_choice = document.getElementById("s");
const start_message = document.querySelector("#start-message");
const start_p = document.querySelector("#start-p");
const timer = document.querySelector(".timer-p");
const socket = io("https://rock-paper-scissors-minigame.herokuapp.com/");
var user_choice = [];
var user_IDs = [];
var user1 = 0;
var user2 = 0;

function countDown(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        display.textContent = timer;

        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);
}

socket.on('start', message =>{
    var threeSecs = 3;

    if(message[0] === true)
    {
        user_IDs.push(message[1], message[3]);
        start_message.addEventListener('click', e=>{
            e.preventDefault();
            timer.style.color = "red";
            countDown(threeSecs, timer);
        });
    }
});

function toString(choice){
    if(choice === 'R')
    {
        return "ROCK";
    }
    if(choice === 'P')
    {
        return "Paper";
    }
    if(choice === 'S')
    {
        return "Scissors";
    }
}

function win(choice1, choice2)
{
    user1++;
    user1_score.innerHTML = user1;
    result.innerHTML = `USER 1 WINS with ${toString(choice1)}, USER 2 LOSE with ${toString(choice2)}`;
}

function lose(choice1, choice2)
{
    user2++;
    user2_score.innerHTML = user2;
    result.innerHTML = `USER 1 LOSES with ${toString(choice1)}, USER 2 WINS with ${toString(choice2)}`;

}

function draw(choice1, choice2)
{
    result.innerHTML = `USER 1 with ${toString(choice1)} TIES USER 2 with ${toString(choice2)}`;
}

function game(user_1_ID, user1_choice, user_2_ID, user2_choice)
{
    switch (user1_choice + user2_choice){
        case "RS":
        case "PR":
        case "SP":
            win(user1_choice, user2_choice);
            break;
        case "RP":
        case "PS":
        case "SR":
            lose(user1_choice, user2_choice);
            break;
        case "RR":
        case "PP":
        case "SS":
            draw(user1_choice, user2_choice);
            break;
    }
}

rock_choice.addEventListener('click', e =>{
    e.preventDefault();
    data = socket.id + " " + "R";
    socket.emit('user-choice-send', data);
});

paper_choice.addEventListener('click', e =>{
    e.preventDefault();
    data = socket.id + " " + "P";
    socket.emit('user-choice-send', data);
});

scissors_choice.addEventListener('click', e =>{
    e.preventDefault();
    data = socket.id + " " + "S";
    socket.emit('user-choice-send', data);
});

socket.on('user-choice-sendback', data => {
    user_choice.push(data.split(' ')[0], data.split(' ')[1]);
    
    if(user_choice.length == 4){
        game(user_choice[0], user_choice[1], user_choice[2], user_choice[3]);
        user_choice = [];
    }
});