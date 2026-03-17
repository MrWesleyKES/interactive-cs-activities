import { loadFileSystem, saveFileSystem, createFile } from "./filesystem.js";
import { updateTabs, openFile, currentFile } from "./editor.js";
import { initPyodide, pyodide } from "./pyodide-loader.js";
import { loadTutorialList } from "./tutorials.js";

window.onload = async () => {
    loadFileSystem();
    updateTabs();
    openFile(Object.keys(files)[0]);
    loadTutorialList();

    await initPyodide();

    setupUI();
};

function setupUI() {
    document.getElementById("new-file").onclick = () => {
        const name = prompt("New file name:");
        if (name) {
            createFile(name);
            updateTabs();
            openFile(name);
        }
    };

    document.getElementById("save-btn").onclick = saveFileSystem;

    document.getElementById("clear-btn").onclick = () =>
        document.getElementById("output").textContent = "";

    document.getElementById("run-btn").onclick = runCode;
}

async function runCode() {
    const code = window.editors[currentFile].getValue();
    const out = document.getElementById("output");
    out.textContent = "Running...\n";

    try {
        let result = await pyodide.runPythonAsync(`
import sys, io
from pprint import pprint
_buffer = io.StringIO()
sys.stdout = _buffer
${code}
sys.stdout = sys.__stdout__
_buffer.getvalue()
        `);

        out.textContent = result;
    } catch (err) {
        out.textContent = "Error:\n" + err;
    }
}
