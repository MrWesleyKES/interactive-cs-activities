// ---- Drag and drop ----
const draggables = document.querySelectorAll(".draggable");
const dropzone = document.querySelector("#seq-dropzone");

draggables.forEach(el => {
  el.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", el.textContent);
  });
});

dropzone.addEventListener("dragover", e => {
  e.preventDefault();
  dropzone.classList.add("over");
});
dropzone.addEventListener("dragleave", () => dropzone.classList.remove("over"));

dropzone.addEventListener("drop", e => {
  e.preventDefault();
  dropzone.classList.remove("over");
  const text = e.dataTransfer.getData("text/plain");
  const item = document.createElement("div");
  item.className = "draggable";
  item.textContent = text;
  dropzone.appendChild(item);
});

// ---- Output box ----
const output = document.querySelector("#output");
function log(msg) {
  const p = document.createElement("div");
  p.textContent = msg;
  output.appendChild(p);
  output.scrollTop = output.scrollHeight;
}

// ---- Run Sequence ----
document.querySelector("#run-sequence").addEventListener("click", () => {
  output.innerHTML = "";
  const steps = [...dropzone.children].map(n => n.textContent);

  if (steps.length !== 4) {
    log("❌ You must place all steps in the sequence.");
    return;
  }

  log("Running robot sequence...");
  steps.forEach(s => log("→ " + s));

  if (steps.join() === "Walk forward,Turn left,Pick up box,Turn right") {
    log("✅ Task completed successfully! Robot picked up the box.");
  } else {
    log("❌ Incorrect sequence. Try again!");
  }
});

// ---- Selection ----
document.querySelector("#run-selection").addEventListener("click", () => {
  const choice = document.querySelector("#selection-choice").value;
  if (!choice) return alert("Choose an option.");

  if (choice === "turn") alert("Correct! Robot safely avoids the obstacle.");
  else alert("Not quite! That's not the expected decision.");
});

// ---- Loop ----
document.querySelector("#run-loop").addEventListener("click", () => {
  const loop = document.querySelector("#loop-choice").value;
  if (!loop) return alert("Pick a loop.");

  if (loop === "repeat5") {
    alert("Correct! REPEAT 5 TIMES will move the robot forward exactly 5 steps.");
  } else {
    alert("Incorrect. Try again!");
  }
});
