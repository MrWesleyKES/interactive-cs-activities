// Wikimedia Commons image URLs (freely licensed)
const WC = {
    keyboard: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Keyboard-icon.png",
    microphone: "https://upload.wikimedia.org/wikipedia/commons/7/73/Microphone_icon.svg",
    monitor: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Computer_font_awesome.svg",
    speakers: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Speaker_Icon.svg",
    usb: "https://upload.wikimedia.org/wikipedia/commons/5/57/USB_icon.svg",
    harddrive: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Hard_drive_icon.png",
    cpu: "https://upload.wikimedia.org/wikipedia/commons/4/45/Microprocessor_%28computer%29.svg",
    ram: "https://upload.wikimedia.org/wikipedia/commons/0/0c/RAM_icon.svg",
    motherboard: "https://upload.wikimedia.org/wikipedia/commons/0/09/Motherboard_%28computer%29_icon.svg",

    touchscreen: "https://upload.wikimedia.org/wikipedia/commons/9/98/Smartphone_icon.svg",
    webcam: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Webcam_icon.svg",
    vr: "https://upload.wikimedia.org/wikipedia/commons/7/7c/VR_icon.svg",
    printer: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Printer_icon.svg",
    sdcard: "https://upload.wikimedia.org/wikipedia/commons/0/02/SD_card_icon.svg",
    ssd: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Solid_state_drive_icon.svg",
    gpufan: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Computer_fan_icon.svg",
    psu: "https://upload.wikimedia.org/wikipedia/commons/5/56/Power_supply_icon.svg",
    case: "https://upload.wikimedia.org/wikipedia/commons/3/34/Computer_tower_icon.svg"
};

// Rounds using Wikimedia Commons icons
const rounds = [
    // -------- ROUND 1 (Normal Retrieval) --------
    [
        { img: WC.keyboard, type: "input" },
        { img: WC.microphone, type: "input" },
        { img: WC.monitor, type: "output" },
        { img: WC.speakers, type: "output" },
        { img: WC.usb, type: "storage" },
        { img: WC.harddrive, type: "storage" },
        { img: WC.cpu, type: "inside" },
        { img: WC.ram, type: "inside" },
        { img: WC.motherboard, type: "inside" }
    ],

    // -------- ROUND 2 (Trick Questions) --------
    [
        { img: WC.touchscreen, type: "input" }, 
        { img: WC.webcam, type: "input" },
        { img: WC.vr, type: "output" },
        { img: WC.printer, type: "output" },
        { img: WC.sdcard, type: "storage" },
        { img: WC.ssd, type: "storage" },
        { img: WC.gpufan, type: "inside" },
        { img: WC.psu, type: "inside" },
        { img: WC.case, type: "inside" }
    ]
];

let currentRound = 0;

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
