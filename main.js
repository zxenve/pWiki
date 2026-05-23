const waves = [
    {
        element: document.getElementById("wave1"),

        x: 0,
        y: 80,

        speedX: 0.3,
        speedY: 0.08,

        distanceY: 20
    },

    {
        element: document.getElementById("wave2"),

        x: 0,
        y: 180,

        speedX: -0.5,
        speedY: 0.05,

        distanceY: 30
    },

    {
        element: document.getElementById("wave3"),

        x: 0,
        y: 280,

        speedX: 0.7,
        speedY: 0.1,

        distanceY: 25
    },

    {
        element: document.getElementById("wave4"),

        x: 0,
        y: 380,

        speedX: -0.5,
        speedY: 0.07,

        distanceY: 15
    },

    {
        element: document.getElementById("wave5"),

        x: 0,
        y: 480,

        speedX: -0.2,
        speedY: 0.07,

        distanceY: 15
    }
];

const Leftships = [

    {
        element: document.getElementById("ship2"),

        x: 0,
        y: 180,

        speedX: 0.5,
        speedY: 0.05,

        distanceY: 30
    },


    {
        element: document.getElementById("ship4"),

        x: 0,
        y: 380,

        speedX: 0.5,
        speedY: 0.07,

        distanceY: 15
    },
];
const Rightships = [
    {
        element: document.getElementById("ship1"),

        x: 0,
        y: 80,

        speedX: -0.3,
        speedY: 0.08,

        distanceY: 20
    },

    {
        element: document.getElementById("ship3"),

        x: 0,
        y: 280,

        speedX: -0.7,
        speedY: 0.1,

        distanceY: 25
    },

]

const GLOBAL_SPEED = 0.3; // lower = slower (try 0.1–0.5)
let time = 0;

export function animateWaves() {

    time += 0.01 * GLOBAL_SPEED;

    waves.forEach((wave) => {

        // Move left/right
        wave.x += wave.speedX;

        // Move up/down using sine wave
        const offsetY =
            Math.sin(time * (wave.speedY * 50))
            * wave.distanceY;

        // Apply movement
        wave.element.style.transform =
            `translate(${wave.x}px, ${offsetY}px)`;

        // Loop endlessly
        if (wave.x > 1000) {
            wave.x = 0;
        }

        if (wave.x < -1000) {
            wave.x = 0;
        }
    });

    requestAnimationFrame(animateWaves);
}
animateWaves();
export function animateLeftShips() {

    time += 0.01 * GLOBAL_SPEED;

    Leftships.forEach((ship) => {

        // Rocking tilt only
        const tilt =
            Math.sin(time * (ship.speedY * 50)) * 10;

        // Only rotate + flip
        ship.element.style.transform =
            `rotate(${tilt}deg) scaleX(-1)`;
    });

    requestAnimationFrame(animateLeftShips);
}

animateLeftShips();


export function animateRightShips() {

    time += 0.01 * GLOBAL_SPEED;

    Rightships.forEach((ship) => {

        // Rocking tilt only
        const tilt =
            Math.sin(time * (ship.speedY * 50)) * 10;

        // Only rotate
        ship.element.style.transform =
            `rotate(${tilt}deg) scaleX(1)`;
    });

    requestAnimationFrame(animateRightShips);
}

animateRightShips();