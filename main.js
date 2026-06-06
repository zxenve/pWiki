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

const wood = document.getElementById("wood");

const categories = {
    "Action Cards": ["Roast", "Mash", "Fry"],
    "Control Cards": [
        "For 2 times", "For 3 times", "For x times", "For y times",
        "If <=3 Else", "If <=4 Else", "If <=5 Else",
        "While > 4", "While > 5", "While > 6"
    ],
    "Surprise Cards": ["Deny", "Loot", "Hack", "Hijack", "Switch"],
    "Potato King Cards": [
        "PotatoKing1", "PotatoKing2", "PotatoKing3", "PotatoKing4",
        "PotatoKing5", "PotatoKing6", "PotatoKing7"
    ],
    "Ship Cards": [
        "The Frying Dutchpan",
        "The S.S Megachip"
    ]
};

fetch("cards.json")
    .then(res => res.json())
    .then(cards => {

        for (const categoryName in categories) {

            const container = document.createElement("div");
            container.className = "cardContainer";

            const title = document.createElement("h2");
            title.textContent = categoryName;
            container.appendChild(title);

            const row = document.createElement("span");
            row.className = "cardRow";

            categories[categoryName].forEach(cardName => {

                const cardData = cards.find(
                    card => card.cardName === cardName
                );

                if (!cardData) {
                    console.warn("Card not found:", cardName);
                    return;
                }

                const card = document.createElement("div");
                card.className = "card";

                const img = document.createElement("img");

                // Use JSON image path directly
                img.src = cardData.imgsrc;
                img.alt = cardData.cardName;

                card.addEventListener("click", () => {
                    openCardOverlay(cardData);
                });

                card.appendChild(img);

                row.appendChild(card);
            });

            container.appendChild(row);
            wood.appendChild(container);
        }
    })
    .catch(err => console.error("Failed to load cards.json", err));


const overlayBg = document.getElementById("cardOverlayBg");
const closeOverlay = document.getElementById("closeOverlay");

const overlayCardImg = document.getElementById("overlayCardImg");
const overlayCardName = document.getElementById("overlayCardName");
const overlayDescription = document.getElementById("overlayDescription");
const overlayJS = document.getElementById("overlayJS");
const overlayCSharp = document.getElementById("overlayCSharp");
const overlayPython = document.getElementById("overlayPython");
const overlayCode = document.getElementById("overlayCode");

let currentCardData = null;

function showLanguage(lang) {

    if (!currentCardData) return;

    switch (lang) {
        case "js":
            overlayCode.textContent =
                currentCardData.javaScript || "No JavaScript example.";
            break;

        case "csharp":
            overlayCode.textContent =
                currentCardData.csharp || "No C# example.";
            break;

        case "python":
            overlayCode.textContent =
                currentCardData.python || "No Python example.";
            break;
    }

    document.querySelectorAll(".lang-tab").forEach(tab => {
        tab.classList.remove("active");
    });

    document
        .querySelector(`[data-lang="${lang}"]`)
        .classList.add("active");
}

function openCardOverlay(cardData) {

    currentCardData = cardData;

    overlayCardImg.src = cardData.imgsrc;
    overlayCardName.textContent =
        "Card Name: " + cardData.cardName;

    overlayDescription.textContent =
        "Explanation: " +
        (cardData.description || "No description.");

    showLanguage("js");

    overlayBg.classList.add("show");

    document.body.classList.add("overlay-open");
}
document.querySelectorAll(".lang-tab").forEach(tab => {

    tab.addEventListener("click", () => {
        showLanguage(tab.dataset.lang);
    });

});

closeOverlay.addEventListener("click", () => {

    overlayBg.classList.remove("show");

    document.body.classList.remove("overlay-open");

});

const scrollTopBtn = document.getElementById("scrollTopBtn");

// Scroll to top when clicked
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Hide button when already at top
window.addEventListener("scroll", () => {
    if (window.scrollY < 200) {
        scrollTopBtn.classList.add("hidden");
    } else {
        scrollTopBtn.classList.remove("hidden");
    }
});

const quizContainer = document.getElementById("quizContainer");

let quizQuestions = [];
let quizCards = [];
let currentQuestion = 0;
let quizScore = 0;

Promise.all([
    fetch("quiz.json").then(res => res.json()),
    fetch("cards.json").then(res => res.json())
])
    .then(([questions, cards]) => {
        quizQuestions = questions;
        quizCards = cards;
        showQuestion();
    })
    .catch(err => console.error("Failed to load quiz/cards json", err));

function showQuestion() {
    const q = quizQuestions[currentQuestion];

    quizContainer.innerHTML = "";

    const quizBox = document.createElement("div");
    quizBox.className = "quiz-box";

    quizBox.innerHTML = `
    <div class="quiz-header">
        <div class="quiz-number">Q${currentQuestion + 1}</div>
        <h3>${q.question}</h3>
    </div>

    <div class="quiz-card-row"></div>

    <div class="quiz-options"></div>

    <p class="quiz-result"></p>

    <button id="nextQuizBtn" disabled>Next</button>
`;

    const cardRow = quizBox.querySelector(".quiz-card-row");
    const optionsDiv = quizBox.querySelector(".quiz-options");
    const result = quizBox.querySelector(".quiz-result");
    const nextBtn = quizBox.querySelector("#nextQuizBtn");


    q.cards.forEach((cardName) => {
        const cardData = quizCards.find(card => card.cardName === cardName);

        if (!cardData) {
            console.warn("Quiz card not found:", cardName);
            return;
        }

        const wrap = document.createElement("div");
        wrap.className = "quiz-card-wrap";

        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = cardData.imgsrc;
        img.alt = cardData.cardName;

        const order = document.createElement("div");
        order.className = "card-order";


        card.appendChild(img);
        wrap.appendChild(card);
        wrap.appendChild(order);
        cardRow.appendChild(wrap);
    });

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;

        btn.addEventListener("click", () => {
            document.querySelectorAll(".quiz-options button").forEach(button => {
                button.disabled = true;
            });

            if (option === q.answer) {
                quizScore++;
                result.textContent = "✅ Correct! " + q.explanation;
                result.className = "quiz-result correct";
            } else {
                result.textContent = "❌ Wrong! Answer: " + q.explanation;
                result.className = "quiz-result wrong";
            }

            nextBtn.disabled = false;
        });

        optionsDiv.appendChild(btn);
    });

    nextBtn.addEventListener("click", () => {
        currentQuestion++;

        if (currentQuestion >= quizQuestions.length) {
            const prizeImage = giveResultImg(quizScore);
            const resultText = giveResultText(quizScore);

            quizContainer.innerHTML = `
                <div class="quiz-box">
                    <h3>Quiz Complete!</h3>
                    <h3>Your score: ${quizScore} / ${quizQuestions.length}</h3>
                    <img src="${prizeImage}" alt="Prize" class="prize-image">
                    <h3>${resultText}</h3>
                    <button id="restartQuizBtn">Restart Quiz</button>
                </div>
            `;

            document.getElementById("restartQuizBtn").addEventListener("click", () => {
                currentQuestion = 0;
                quizScore = 0;
                showQuestion();
            });

            return;
        }

        showQuestion();
    });

    quizContainer.appendChild(quizBox);
}

function giveResultImg(quizScore) {
    if (quizScore <= 2) {
        return "assets/imgs/PrizeA.png";
    }
    else if (quizScore <= 4) {
        return "assets/imgs/PrizeB.png";
    }
    else {
        return "assets/imgs/PrizeC.png";
    }
}

function giveResultText(quizScore) {
    if (quizScore <= 2) {
        return "A soggy shoe. You suck! Try again!";
    }
    else if (quizScore <= 4) {
        return "Here's a treasure map, maybe with this you can find your way to try again!";
    }
    else {
        return "You got the Treasure Chest! You are a Potato Pirate King! Now hide it at laugh-tale!";
    }
}