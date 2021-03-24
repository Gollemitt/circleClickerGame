console.log("Success!");
let score = 0;
let N = 1; // Number of circles in play
const scoreTxt = document.querySelectorAll(".gamePanel p"); // Stores all p tags under class .gamePanel in an array

class RestartBtn {

    btn: Element;

    constructor () {
        // Retrieves button DOM-element
        this.btn = document.querySelector("button");
        // Reloads page on click in order to restart game
        this.btn.addEventListener("click", () => {
            window.location.reload();
        })
    }
}

class GameClock {

    static clock: Element;
    static time: number;
    static clockRunning: boolean;

    constructor() {
        GameClock.clock = scoreTxt[1];
        GameClock.time = 60;
        GameClock.clockRunning = false;
    }
    
    // Updates clock, decrements clock and updates timer
    static updateClock(): void {
        this.time--;
        this.clock.innerHTML = `Time remaining: ${this.time}s`;
    }

    // Starts clock and sets clockRunning = true; to avoid multiple runs
    static startClock(): void {
        // Starts clock if it's not already running
        if (!this.clockRunning) {
            this.clockRunning = true;
            let x = setInterval(() => {
                this.updateClock();
                
                // Stops clock and ends game when time is out
                if (this.time <= 0) {
                    clearInterval(x);
                    Circle.deleteCircles()
                    scoreTxt[0].classList.add("gameEnded")
                }
            }, 1000); // Interval runs every second (1000ms)
        } 
    }
}

class Circle {

    div: HTMLElement;

    constructor() {
        // Creates the circle's DOMs, adds styling and appends to body
        this.div = document.createElement("DIV");
        this.div.className = "circle";
        document.body.appendChild(this.div);

        // Adds eventlistener which updates the circle and starts the clock on each click
        this.div.addEventListener("click", (): void => {
            this.updateCircle();
            this.updateScore();
            GameClock.startClock();
        })

        // Ensures a unique circle on game start
        this.updateCircle();
    }

    // Generates a random x and y coordinate (position), and a random radius
    newPos(): {posX: number, posY: number, radius: number} {
        let posX = Math.floor(Math.random() * ((window.innerWidth - 100) - 100) + 100);
        let posY = Math.floor(Math.random() * ((window.innerHeight - 100) - 100) + 100);
        let radius = Math.ceil(Math.random() * 15);
    
        return { posX, posY, radius };
    }
    
    // Updates the circles position and size
    updateCircle(): void {
        const obj = this.newPos(); // Returns the random values as an object

        // Updates the circles css styling
        this.div.style.left = `${obj.posX}px`;
        this.div.style.bottom = `${obj.posY}px`;
        this.div.style.width = `${obj.radius}rem`;
        this.div.style.height = `${obj.radius}rem`;
    }

    // Increments the score and updates it
    updateScore(): void {
        score++;
        scoreTxt[0].innerHTML = `Score: ${score}`;
    }

    // Deletes all circles by incrementing through an array of circle-objects
    static deleteCircles(): void {
        arrCircles.forEach((circle) => {
            circle.div.remove(); // Removes the circle DOM from the body
        })
    }
}

// Creates the objects
new GameClock();
new RestartBtn();

// Creates a new array of N circles length, fills it with zeroes. 
// Then it increments through the array and creates a Circle object for each index. 
// Returns a new array with all the objects.
const arrCircles = new Array<number>(N).fill(0).map(() => new Circle()); 