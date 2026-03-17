import { createFile } from "./filesystem.js";
import { openFile, updateTabs } from "./editor.js";

export function loadTutorialList() {
    const container = document.getElementById("tutorials-list");
    container.innerHTML = "";

    const tutorials = [
        "basics",
        "loops",
        "functions",
        "challenges"
    ];

    tutorials.forEach(name => {
        const btn = document.createElement("button");
        btn.textContent = name;
        btn.onclick = () => loadTutorial(name);
        container.appendChild(btn);
    });
}

async function loadTutorial(name) {
    const response = await fetch(`tutorials/${name}.md`);
    const text = await response.text();

    const filename = `${name}.py`;
    createFile(filename);

    // starter code extracted from md triple backticks
    const starter = text.match(/```python([\s\S]*?)```/);
    const code = starter ? starter[1].trim() : "# Tutorial has no starter code";

    localStorage.setItem(filename, code);

    updateTabs();
    openFile(filename);
}
