/*  editor.js
 *  Shared CodeMirror-based editor for all rooms
 *  Loads once per page, no duplication needed
 */

import { EditorView, basicSetup } from "https://esm.sh/@codemirror/basic-setup";
import { python } from "https://esm.sh/@codemirror/lang-python";
import { oneDark } from "https://esm.sh/@codemirror/theme-one-dark";

/* Create CodeMirror editor */
window.loadEditor = function(startCode) {
    window.editor = new EditorView({
        doc: startCode,
        extensions: [
            basicSetup,
            python(),
            oneDark,
            EditorView.lineWrapping
        ],
        parent: document.getElementById("editor")
    });
};

/* Helper to retrieve current code */
window.getEditorCode = function() {
    return window.editor.state.doc.toString();
};
