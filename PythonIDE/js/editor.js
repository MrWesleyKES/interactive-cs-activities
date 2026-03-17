import { files } from "./filesystem.js";

export let editors = {};
export let currentFile = null;

export function openFile(name) {
    currentFile = name;

    // Switch tab UI
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelector(`[data-file='${name}']`).classList.add("active");

    // Create CodeMirror instance if needed
    if (!editors[name]) {
        const container = document.getElementById("editor-container");
        container.innerHTML = "";

        const textarea = document.createElement("textarea");
        textarea.value = files[name];
        container.appendChild(textarea);

        editors[name] = CodeMirror.fromTextArea(textarea, {
            mode: "python",
            theme: "monokai",
            lineNumbers: true,
            tabSize: 4,
            indentUnit: 4
        });

        editors[name].on("change", () => {
            files[name] = editors[name].getValue();
        });
    } else {
        // Activate editor
        const container = document.getElementById("editor-container");
        container.innerHTML = "";
        container.appendChild(editors[name].getWrapperElement());
        editors[name].refresh();
    }
}

export function updateTabs() {
    const tabs = document.getElementById("tabs");
    tabs.innerHTML = "";

    Object.keys(files).forEach(name => {
        const tab = document.createElement("div");
        tab.className = "tab";
        tab.dataset.file = name;
        tab.textContent = name;
        tab.onclick = () => openFile(name);
        tabs.appendChild(tab);
    });
}
