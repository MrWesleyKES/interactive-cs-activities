let dragged = null;

document.querySelectorAll(".draggable").forEach(item => {
    item.addEventListener("dragstart", e => dragged = e.target);
});

document.querySelectorAll(".dropArea").forEach(area => {
    area.addEventListener("dragover", e => e.preventDefault());
    area.addEventListener("drop", e => {
        e.preventDefault();
        area.appendChild(dragged);
    });
});

document.getElementById("checkBtn").onclick = () => {
    let score = 0;
    const total = document.querySelectorAll(".draggable").length;

    document.querySelectorAll(".zone").forEach(zone => {
        const expected = zone.dataset.accept;
        const items = zone.querySelectorAll(".draggable");
        let ok = true;

        items.forEach(i => {
            if (i.dataset.group !== expected) ok = false;
        });

        zone.classList.remove("correct", "incorrect");
        zone.classList.add(ok ? "correct" : "incorrect");

        if (ok) score += items.length;
    });

    document.getElementById("result").textContent = `Score: ${score} / ${total}`;
};
