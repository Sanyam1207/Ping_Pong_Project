import Ball from './Ball_element.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerOnePaddle = new Paddle(document.getElementById('player-one-paddle'));
const playerTwoPaddle = new Paddle(document.getElementById('player-two-paddle'));
const playerOneScoreElem = document.getElementById('player-one-score');
const playerTwoScoreElem = document.getElementById('player-two-score');

let lastTime;

function update(time){

    if (lastTime != null){
        const delta = time - lastTime;
        // console.log(delta);
        ball.update(delta, [playerOnePaddle.rect(), playerTwoPaddle.rect()]);
        playerTwoPaddle.update(delta, ball.y);
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
        document.documentElement.style.setProperty('--hue', hue + delta * 0.005);
    }

    if (isLose()){
        handleLose();
    }

    lastTime = time;
    // console.log(time);
    window.requestAnimationFrame(update);   //more like of a recursion function that keeps on calling itself 

    //this will make the window update everysecond for better transitions

}

// function paddleMovement(keypressed){

//     if (keypressed == 'W' || keypressed == 'w'){
//         let rectuPlayerone = playerOnePaddle.getBoundingClientRect(); 
//     }

//     if (keypressed == 'S' || keypressed == 's'){
//         let rectuPlayerone = playerOnePaddle.getBoundingClientRect();
//         if(rectuPlayerone.top <= 0){return};
//         if(rectuPlayerone.bottom >= window.innerHeight){return};
//         if(rectuPlayerone.top >= 0 && rectuPlayerone.bottom <= window.innerHeight){
//             playerOnePaddle.position += 4;
//         };
        
        
//     }

//     if (keypressed == 'ArrowUp'){
        
//     }

//     if (keypressed == 'ArrowDown'){
        
//     }

// }

function isLose(){
    const rect = ball.rect();
    return (rect.right >= window.innerWidth || rect.left <= 0)
}

function handleLose(){
    const rect = ball.rect();
    ball.reset();
    playerTwoPaddle.reset();

    if(rect.right > window.innerWidth){
        playerOneScoreElem.textContent = parseFloat(playerOneScoreElem.textContent) + 1;
    }

    else{
        playerTwoScoreElem.textContent = parseFloat(playerTwoScoreElem.textContent) + 1;
    }
}


document.addEventListener('mousemove', function(event){
    playerOnePaddle.position = event.y / window.innerHeight * 100;
});

window.requestAnimationFrame(update);   //calling that recursion function here !!