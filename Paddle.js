const SPEED = 0.01;

export default class Paddle{
    constructor(paddleElement){
        this.paddleElement = paddleElement;
        this.reset();
    }

    get position(){
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue('--position'));ss
    }

    set position(value){
        this.paddleElement.style.setProperty('--position', value);
    }

    reset(){
        this.position = 50;
    }

    rect(){
        return this.paddleElement.getBoundingClientRect();
    }

    update(delta, ballHeight){
        this.position +=  SPEED * delta * (ballHeight - this.position);
    }
}