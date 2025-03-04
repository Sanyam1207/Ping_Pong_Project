// creating an export module default means that
const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.000001

export default class Ball{
    constructor(BallElem){
        this.BallElem = BallElem;
        this.reset();
    } /* This here creates a constructor for the ball export module*/

    get x() {
        return parseFloat(getComputedStyle(this.BallElem).getPropertyValue("--x"))
    }
    
    set x(value) {
        this.BallElem.style.setProperty("--x", value)
    }
    
    get y() {
        return parseFloat(getComputedStyle(this.BallElem).getPropertyValue("--y"))
        }
    
    set y(value) {
        this.BallElem.style.setProperty("--y", value)
        }
    
    rect() {
        return this.BallElem.getBoundingClientRect()
    }

    reset() {
        this.x = 50
        this.y = 50
        this.direction = { x: 0 }
        while (
          Math.abs(this.direction.x) <= 0.2 ||
          Math.abs(this.direction.x) >= 0.9
        ) {
          const heading = randomNumberBetween(0, 2 * Math.PI)
          this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = INITIAL_VELOCITY
      }

    update(delta, paddleRects){
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        this.velocity += VELOCITY_INCREASE * delta
        const rect = this.rect()

        if(rect.bottom >= window.innerHeight || rect.top <= 0){
            this.direction.y *= -1;
        }

        if(paddleRects.some(r => isCollision(r, rect))){
            this.direction.x *= -1;
        }

    }
}

function randomNumberBetween(max, min){
    return Math.random() * (max-min) + min;
}

function isCollision(rect1, rect2){
    return(
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top  
    );
}