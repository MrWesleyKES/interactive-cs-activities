const FS_KEY = "webIDE_files";

export let files = {};

export function loadFileSystem() {
    const data = localStorage.getItem(FS_KEY);
    files = data ? JSON.parse(data) : { "main.py": "# Start coding!\n" };
}

export function saveFileSystem() {
    localStorage.setItem(FS_KEY, JSON.stringify(files));
}

export function createFile(name) {
    files[name] = "";
    saveFileSystem();
}

export function deleteFile(name) {
    delete files[name];
    saveFileSystem();
}

export function renameFile(oldName, newName) {
    files[newName] = files[oldName];
    delete files[oldName];
    saveFileSystem();
}
