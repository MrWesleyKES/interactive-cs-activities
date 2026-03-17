// Rounds with images (free icons – locally saved)
const rounds = [
    // -------- ROUND 1 (Normal Retrieval) --------
    [
        { img: "img/keyboard.png", type: "input" },
        { img: "img/microphone.png", type: "input" },
        { img: "img/monitor.png", type: "output" },
        { img: "img/speakers.png", type: "output" },
        { img: "img/usb.png", type: "storage" },
        { img: "img/harddrive.png", type: "storage" },
        { img: "img/cpu.png", type: "inside" },
        { img: "img/ram.png", type: "inside" },
        { img: "img/motherboard.png", type: "inside" }
    ],

    // -------- ROUND 2 (Trick Questions) --------
    [
        { img: "img/touchscreen.png", type: "input" },  // both input and output IRL, trick choice!
        { img: "img/webcam.png", type: "input" },
        { img: "img/vr.png", type: "output" },          // tricky for students
        { img: "img/printer.png", type: "output" },
        { img: "img/sdcard.png", type: "storage" },
        { img: "img/ssd.png", type: "storage" },
        { img: "img/gpufan.png", type: "inside" },
        { img: "img/powersupply.png", type: "inside" },
        { img: "img/case.png", type: "inside" }
    ]
];

let currentRound = 0;

// Load round
function loadRound() {
    document.getElementById("roundNumber").textContent = currentRound + 1;

    const container = document.getElementById("draggables");
    container.innerHTML = "";

    rounds[currentRound].forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("draggable", "true");
        card.dataset.type = item.type;

        const img = document.createElement("img");
        img.src = item.img;
        card.appendChild(img);

        card.addEventListener("dragstart", () => dragged = card);

        container.appendChild(card);
    });

    document.querySelectorAll(".drop").forEach(drop => {
        drop.innerHTML = "";
    });

    document.getElementById("result").textContent = "";
}

let dragged = null;

document.querySelectorAll(".drop").forEach(drop => {
    drop.addEventListener("dragover", e => e.preventDefault());
    drop.addEventListener("drop", () => drop.appendChild(dragged));
});

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

document.getElementById("nextRoundBtn").onclick = () => {
    currentRound++;
    if (currentRound >= rounds.length) currentRound = 0;
    loadRound();
};

loadRound();
