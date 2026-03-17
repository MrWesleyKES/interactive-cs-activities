function caesarShift(text, amount) {
    amount = amount % 26;
    let output = "";

    for (let char of text) {
        if (char.match(/[a-z]/i)) {
            let code = char.charCodeAt(0);
            let base = code >= 97 ? 97 : 65;
            let shifted = ((code - base + amount + 26) % 26) + base;
            output += String.fromCharCode(shifted);
        } else {
            output += char;
        }
    }
    return output;
}

document.getElementById("encryptBtn").onclick = () => {
    const text = document.getElementById("encryptInput").value;
    const shift = parseInt(document.getElementById("encryptShift").value);
    document.getElementById("encryptOutput").textContent = caesarShift(text, shift);
};

document.getElementById("decryptBtn").onclick = () => {
    const text = document.getElementById("decryptInput").value;
    const shift = parseInt(document.getElementById("decryptShift").value);
    document.getElementById("decryptOutput").textContent = caesarShift(text, -shift);
};

document.getElementById("bruteBtn").onclick = () => {
    const text = document.getElementById("bruteInput").value;
    const container = document.getElementById("bruteResults");
    container.innerHTML = "";

    for (let i = 0; i < 26; i++) {
        const line = document.createElement("div");
        line.className = "brute-line";
        line.textContent = `Shift ${i}: ${caesarShift(text, -i)}`;
        container.appendChild(line);
    }
};
