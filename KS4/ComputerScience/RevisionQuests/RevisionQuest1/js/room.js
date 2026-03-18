async function runRoom(userExpected) {
    await loadPython();

    const code = window.getEditorCode();
    const outputBox = document.getElementById("output");
    const successBox = document.getElementById("success");
    const nextBtn = document.getElementById("next-btn");

    outputBox.textContent = "Running...";

    try {
        // Reset stdout
        await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
        `);

        // Run user code
        await pyodide.runPythonAsync(code);

        // Get output
        const printed = pyodide.runPython("sys.stdout.getvalue()");
        outputBox.textContent = printed.trim() || "(No output)";

        const lines = printed.trim().split("\n").map(x => x.trim());
        const correct = userExpected.every((v, i) => lines[i] === v);

        if (correct) {
            successBox.style.display = "block";
            if (nextBtn) nextBtn.style.display = "inline-block";
        } else {
            successBox.style.display = "none";
            if (nextBtn) nextBtn.style.display = "none";
        }

    } catch (err) {
        outputBox.textContent = "Error:\n" + err;
        successBox.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
    }
}
