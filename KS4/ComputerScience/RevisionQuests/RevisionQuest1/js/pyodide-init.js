let pyodide = null;
let pyodideReady = false;

async function loadPython() {
    if (pyodideReady) return pyodide;

    pyodide = await loadPyodide();
    pyodideReady = true;
    return pyodide;
}
