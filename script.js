"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const screen = document.getElementById("loginscreen");
  const template = screen.querySelector(".card").cloneNode(true);
  // Bisherige Positionen bleiben erhalten; die erste Taste erhält den
  // zuvor ungenutzten zwölften Code statt eines leeren Datenwerts.
  const codes = ["UwU", "10*/", "2469", "7*K", "UwU", "67", "R2D2", "5D//", "UwU", "994&", "633/", "83-X"];
  const order = ["5D//", "633/", "7*K", "10*/", "994&", "5D//", "83-X", "633/", "7*K", "10*/", "994&"];
  let progress = 0;
  let complete = false;
  screen.replaceChildren();
  codes.forEach((code, index) => {
    const card = template.cloneNode(true);
    card.dataset.number = code;
    card.setAttribute("aria-label", `Taste ${index + 1}`);
    screen.appendChild(card);
  });
  screen.addEventListener("click", function (event) {
    const card = event.target.closest(".card");
    if (!card || complete) return;
    if (order[progress] === card.dataset.number || order[progress - 1] === card.dataset.number) progress++;
    else progress = 0;
    console.log(progress);
    document.getElementById("R2D2").textContent = card.dataset.number;
  });
  // Pointer Events unterstützen Touchscreens, Stifte und Maus.
  const activePointers = new Map();
  const specialCodes = new Set(["7*K", "5D//", "83-X"]);
  screen.addEventListener("pointerdown", function (event) {
    const card = event.target.closest(".card");
    if (!card || complete || !specialCodes.has(card.dataset.number)) return;
    card.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, card.dataset.number);
    if (new Set(activePointers.values()).size === 3) {
      complete = true;
      activePointers.clear();
      document.body.classList.add("is-complete");
      setTimeout(() => window.location.reload(), 10000);
    }
  });
  const release = event => activePointers.delete(event.pointerId);
  screen.addEventListener("pointerup", release);
  screen.addEventListener("pointercancel", release);
  screen.addEventListener("lostpointercapture", release);
  window.addEventListener("blur", () => activePointers.clear());
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("resolution-form");
  const preset = document.getElementById("resolution-preset");
  const widthInput = document.getElementById("resolution-width");
  const heightInput = document.getElementById("resolution-height");
  const actualSize = document.getElementById("actual-size");
  const info = document.getElementById("resolution-info");
  const shell = document.querySelector(".screen-shell");
  const area = document.querySelector(".display-area");
  let setting = { mode: "auto", width: 2560, height: 1440, actual: false };
  const valid = value => Number.isInteger(value) && value >= 1 && value <= 16384;
  try {
    const saved = JSON.parse(localStorage.getItem("davesapp-resolution-v1"));
    if (saved && ["auto", "custom"].includes(saved.mode) && valid(saved.width) && valid(saved.height)) {
      setting = { mode: saved.mode, width: saved.width, height: saved.height, actual: saved.actual === true };
    }
  } catch (_) { /* Die Seite funktioniert auch ohne lokalen Speicher. */ }

  function render() {
    const availableWidth = document.documentElement.clientWidth;
    const availableHeight = window.innerHeight;
    const width = setting.mode === "auto" ? availableWidth : setting.width;
    const height = setting.mode === "auto" ? availableHeight : setting.height;
    const actual = setting.mode === "custom" && setting.actual;
    const scale = actual ? 1 : Math.min(1, availableWidth / width, availableHeight / height);
    document.body.classList.toggle("manual-size", actual);
    shell.style.width = `${width * scale}px`;
    shell.style.height = `${height * scale}px`;
    area.style.width = `${width}px`;
    area.style.height = `${height}px`;
    area.style.transform = `scale(${scale})`;
    area.style.setProperty("--canvas-height", `${height}px`);
    info.textContent = `${width} × ${height} px · Anzeige ${Math.round(scale * 100)} %`;
  }
  function syncInputs() {
    widthInput.value = setting.width;
    heightInput.value = setting.height;
    actualSize.checked = setting.actual;
    const key = `${setting.width}x${setting.height}`;
    preset.value = setting.mode === "auto" ? "auto" : [...preset.options].some(option => option.value === key) ? key : "custom";
  }
  function save() {
    try { localStorage.setItem("davesapp-resolution-v1", JSON.stringify(setting)); } catch (_) {}
    render();
  }
  function applyCustom() {
    if (!form.reportValidity()) return;
    setting = { mode: "custom", width: Number(widthInput.value), height: Number(heightInput.value), actual: actualSize.checked };
    syncInputs();
    save();
  }
  form.addEventListener("submit", event => { event.preventDefault(); applyCustom(); });
  preset.addEventListener("change", () => {
    if (preset.value === "auto") {
      setting.mode = "auto";
      save();
    } else if (preset.value !== "custom") {
      [widthInput.value, heightInput.value] = preset.value.split("x");
      applyCustom();
    }
  });
  [widthInput, heightInput].forEach(input => input.addEventListener("input", () => { preset.value = "custom"; }));
  actualSize.addEventListener("change", applyCustom);
  document.getElementById("resolution-auto").addEventListener("click", () => {
    setting.mode = "auto";
    setting.actual = false;
    syncInputs();
    save();
  });
  window.addEventListener("resize", render);
  syncInputs();
  render();
});
