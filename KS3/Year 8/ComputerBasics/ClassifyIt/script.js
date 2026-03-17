let dragged = null;

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("dragstart", () => dragged = card);
});

document.querySelectorAll(".drop").forEach(drop => {
    drop.addEventListener("dragover", e => e.preventDefault());
    drop.addEventListener("drop", () => drop.appendChild(dragged));
});

document.getElementById("checkBtn").onclick = () => {
    let correct = 0;
    let total = document.querySelectorAll(".card").length;

    document.querySelectorAll(".zone").forEach(zone => {
        const expected = zone.dataset.accept;
        const items = zone.querySelectorAll(".card");

        let zoneCorrect = true;
        items.forEach(i => {
            if (i.dataset.type !== expected) zoneCorrect = false;
        });

        zone.classList.remove("correct", "incorrect");
        zone.classList.add(zoneCorrect ? "correct" : "incorrect");

        if (zoneCorrect) correct += items.length;
    });

    document.getElementById("result").textContent =
        `Score: ${correct} / ${total}`;
};
