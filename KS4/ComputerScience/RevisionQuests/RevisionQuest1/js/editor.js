<!-- CodeMirror JS bundle -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js"></script>

<!-- CodeMirror CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/dracula.min.css">

<script>
// create editor
window.loadEditor = function(startCode) {
    window.editor = CodeMirror(document.getElementById('editor'), {
        value: startCode,
        mode: "python",
        lineNumbers: true,
        theme: "dracula",
        indentUnit: 4,
        smartIndent: true,
        lineWrapping: true,
    });
};

window.getEditorCode = function() {
    return window.editor.getValue();
};
</script>
