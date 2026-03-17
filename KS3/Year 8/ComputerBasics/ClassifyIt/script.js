// ALL PNG OR JPG — these formats ALWAYS load
const IMG = {
    keyboard: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Keyboard-US.svg/320px-Keyboard-US.svg.png",
    microphone: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Microphone_shure_sm58.jpg/320px-Microphone_shure_sm58.jpg",

    monitor: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/LG_Flatron_L1510SF_LCD_monitor.jpg/320px-LG_Flatron_L1510SF_LCD_monitor.jpg",
    speakers: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Computer_speakers-01.jpg/320px-Computer_speakers-01.jpg",

    usb: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/USB_flash_drive.JPG/320px-USB_flash_drive.JPG",
    harddrive: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Hard_drive-en.jpg/320px-Hard_drive-en.jpg",
    sdcard: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/16GB_SD_Card.jpg/320px-16GB_SD_Card.jpg",
    ssd: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Samsung_SSD_850_EVO.jpg/320px-Samsung_SSD_850_EVO.jpg",

    cpu: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Intel_80486DX2_bottom.jpg/320px-Intel_80486DX2_bottom.jpg",
    ram: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/DDR4_DIMM.jpg/320px-DDR4_DIMM.jpg",
    motherboard: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Motherboard_asus_p5kc.jpg/320px-Motherboard_asus_p5kc.jpg",
    gpufan: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Computer_fan.jpg/320px-Computer_fan.jpg",
    psu: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ATX_power_supply.jpg/320px-ATX_power_supply.jpg",
    case: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Minicomputer_case.jpg/320px-Minicomputer_case.jpg",

    touchscreen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Smartphone_20180123.jpg/320px-Smartphone_20180123.jpg",
    webcam: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Webcam_Creative_Live.jpg/320px-Webcam_Creative_Live.jpg",
    vr: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Oculus-Rift-CV1-Headset-Front.jpg/320px-Oculus-Rift-CV1-Headset-Front.jpg",
    printer: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Canon_S820.jpg/320px-Canon_S820.jpg"
};

// ROUND DEFINITIONS
const rounds = [
    [
        { img: IMG.keyboard, type: "input" },
        { img: IMG.microphone, type: "input" },
        { img: IMG.monitor, type: "output" },
        { img: IMG.speakers, type: "output" },
        { img: IMG.usb, type: "storage" },
        { img: IMG.harddrive, type: "storage" },
        { img: IMG.cpu, type: "inside" },
        { img: IMG.ram, type: "inside" },
        { img: IMG.motherboard, type: "inside" }
    ],
    [
        { img: IMG.touchscreen, type: "input" },
        { img: IMG.webcam, type: "input" },
        { img: IMG.vr, type: "output" },
        { img: IMG.printer, type: "output" },
        { img: IMG.sdcard, type: "storage" },
        { img: IMG.ssd, type: "storage" },
        { img: IMG.gpufan, type: "inside" },
        { img: IMG.psu, type: "inside" },
        { img: IMG.case, type: "inside" }
    ]
];

let currentRound = 0;

// ------- BUILD UI -------
function loadRound() {
    document.getElementById("roundNumber").textContent = currentRound + 1;

    const container = document.getElementById("draggables");
    container.innerHTML = "";

    rounds[currentRound].forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.draggable = true;
        card.dataset.type = item.type;

        const img = document.createElement("img");
        img.src = item.img;
        img.alt = item.type;
        img.style.width = "100%";

        card.appendChild(img);

        card.addEventListener("dragstart", () => dragged = card);
        container.appendChild(card);
    });

    document.querySelectorAll(".drop").forEach(drop => { drop.innerHTML = ""; });

    document.getElementById("result").textContent = "";
}

let dragged = null;

document.querySelectorAll(".drop").forEach(drop => {
    drop.addEventListener("dragover", e => e.preventDefault());
    drop.addEventListener("drop", () => drop.appendChild(dragged));
});

// CHECK ANSWERS
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

// NEXT ROUND
document.getElementById("nextRoundBtn").onclick = () => {
    currentRound++;
    if (currentRound >= rounds.length) currentRound = 0;
    loadRound();
};

loadRound();
