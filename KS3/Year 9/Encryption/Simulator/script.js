// Simple fake "RSA-style" key generator
function generateKey() {
    return Math.floor(Math.random() * 9000 + 1000);
}

const publicKey = generateKey();
const privateKey = generateKey();

document.getElementById("publicKey").textContent = publicKey;
document.getElementById("privateKey").textContent = privateKey;

// Fake encryption: combine char codes + key
function encrypt(text, key) {
    return btoa(text.split("")
        .map(ch => ch.charCodeAt(0) + key)
        .join("-"));
}

function decrypt(cipher, key) {
    try {
        return atob(cipher)
            .split("-")
            .map(n => String.fromCharCode(Number(n) - key))
            .join("");
    } catch {
        return "(unable to decrypt)";
    }
}

document.getElementById("encryptBtn").onclick = () => {
    const msg = document.getElementById("messageInput").value;

    if (!msg.trim()) return;

    // Sender sends encrypted message
    const encrypted = encrypt(msg, publicKey);
    document.getElementById("senderBox").textContent = encrypted;

    // Hacker sees encrypted nonsense
    document.getElementById("hackerBox").textContent = encrypted;

    // Receiver decrypts using private key
    const decrypted = decrypt(encrypted, publicKey); // uses shared key
    document.getElementById("receiverBox").textContent = decrypted;
};
