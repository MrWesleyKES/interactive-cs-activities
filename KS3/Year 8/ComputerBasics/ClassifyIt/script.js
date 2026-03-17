// ROUND DATA – text only, no images
const rounds = [
    // ------- ROUND 1 (Regular) -------
    [
        { label: "Keyboard", type: "input" },
        { label: "Microphone", type: "input" },
        { label: "Monitor", type: "output" },
        { label: "Speakers", type: "output" },
        { label: "USB Stick", type: "storage" },
        { label: "Hard Drive", type: "storage" },
        { label: "CPU", type: "inside" },
        { label: "RAM", type: "inside" },
        { label: "Motherboard", type: "inside" }
    ],

    // ------- ROUND 2 (Trick round) -------
    [
        { label: "Touchscreen", type: "input" },
        { label: "VR Headset", type: "output" },
        { label: "Printer", type: "output" },
        { label: "Webcam", type: "input" },
        { label: "SD Card", type: "storage" },
        { label: "SSD", type: "storage" },
        { label: "GPU Fan", type: "inside" },
        { label: "Power Supply", type: "inside" },
        { label: "Computer Case", type: "inside" }
    ]
];

let currentRound = 0;
let dragged = null;

// Load round
function loadRound() {
    document.getElementById("roundNumber").textContent = currentRound + 1;

    const container = document.getElementById("draggables");
    container.innerHTML = "";

    // Create draggable cards
    rounds[currentRound].forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.draggable = true;
        card.dataset.type = item.type;
        card.textContent = item.label;

        card.addEventListener("dragstart", () => dragged = card);

        container.appendChild(card);
    });

    // Clear zones
    document.querySelectorAll(".drop").forEach(drop => {
        drop.innerHTML = "";
    });

    document.getElementById("result").textContent = "";
}

// Setup drop events
document.querySelectorAll(".drop").forEach(drop => {
    drop.addEventListener("dragover", e => e.preventDefault());
    drop.addEventListener("drop", () => drop.appendChild(dragged));
});

// Check answers
document.getElementById("checkBtn").onclick = () => {
    let correct = 0;
    let total = rounds[currentRound].length;

    document.querySelectorAll(".zone").forEach(zone => {
        const expected = zone.dataset.accept;
        const items = zone.querySelectorAll(".card");
        let ok = true;

        items.forEach(i => {
            if (i.dataset.type !== expected) ok = false;
        });

        zone.classList.remove("correct", "incorrect");
        zone.classList.add(ok ? "correct" : "incorrect");

        if (ok) correct += items.length;
    });

    document.getElementById("result").textContent =
        `Score: ${correct} / ${total}`;
};

// Next round
document.getElementById("nextRoundBtn").onclick = () => {
    currentRound++;
    if (currentRound >= rounds.length) currentRound = 0;
    loadRound();
};

loadRound();
