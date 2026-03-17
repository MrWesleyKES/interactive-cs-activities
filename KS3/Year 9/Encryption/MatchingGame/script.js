const pairs = [
    ["Plaintext", "The original readable message"],
    ["Ciphertext", "The scrambled/encrypted message"],
    ["Key", "The secret value used to encrypt/decrypt"],
    ["Shift", "The number of positions moved in a Caesar Cipher"]
];

let cards = [];
let flipped = [];
let lock = false;

function setup() {
    const board = document.getElementById("gameBoard");
    board.innerHTML = "";
    document.getElementById("status").textContent = "";

    // Build card list
    cards = [];
    pairs.forEach(([term, def]) => {
        cards.push({ text: term, match: term });
        cards.push({ text: def, match: term });
    });

    // Shuffle
    cards.sort(() => Math.random() - 0.5);

    // Render
    cards.forEach((card, index) => {
        const div = document.createElement("div");
        div.className = "card";
        div.dataset.match = card.match;
        div.dataset.index = index;
        div.textContent = "?";

        div.onclick = () => flipCard(div, card);

        board.appendChild(div);
    });
}

function flipCard(div, card) {
    if (lock || div.classList.contains("matched") || div.classList.contains("flipped")) return;

    div.classList.add("flipped");
    div.textContent = card.text;

    flipped.push(div);

    if (flipped.length === 2) checkMatch();
}

function checkMatch() {
    lock = true;
    const [a, b] = flipped;

    if (a.dataset.match === b.dataset.match) {
        a.classList.add("matched");
        b.classList.add("matched");
        document.getElementById("status").textContent = "Matched!";
    } else {
        document.getElementById("status").textContent = "Not a match!";
        setTimeout(() => {
            a.classList.remove("flipped");
            b.classList.remove("flipped");
            a.textContent = "?";
            b.textContent = "?";
        }, 800);
    }

    setTimeout(() => {
        flipped = [];
        lock = false;

        // Check win
        if (document.querySelectorAll(".matched").length === cards.length) {
            document.getElementById("status").textContent = "You matched everything!";
        }
    }, 900);
}

document.getElementById("restartBtn").onclick = setup;

setup();
