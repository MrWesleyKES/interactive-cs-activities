export let pyodide = null;

export async function initPyodide() {
    pyodide = await loadPyodide();
    await pyodide.runPythonAsync("from pprint import pprint");
}
