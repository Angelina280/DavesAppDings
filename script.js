"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const screen = document.getElementById("loginscreen");
  const template = screen.querySelector(".card").cloneNode(true);
  const status = document.getElementById("R2D2");
  const hint = document.getElementById("input-hint");
  // Anordnung aus dem Referenzbild: drei Spalten, vier Reihen.
  // Die drei unbeschrifteten übrigen Felder behalten ihre bisherigen Codes.
  const codes = ["UwU", "UwU", "UwU", "7*K", "5D//", "83-X", "2469", "67", "633//", "10*\\", "R2D2", "994&"];
  const order = ["5D//", "633//", "7*K", "10*\\", "994&", "5D//", "83-X", "633//", "7*K", "10*\\", "994&"];
  const keyCodes = ["KeyQ", "KeyW", "KeyE"];
  const held = new Map();
  const selected = new Set();
  const selectionToggle = document.getElementById("selection-toggle");
  const selectionActions = document.getElementById("selection-actions");
  const selectionInfo = document.getElementById("selection-info");
  const selectionGo = document.getElementById("selection-go");
  let selectionMode = false;
  let progress = 0;
  let complete = false;
  let finalArmed = false;
  screen.replaceChildren();
  codes.forEach((code, index) => {
    const card = template.cloneNode(true);
    card.dataset.number = code;
    card.dataset.index = index;
    card.setAttribute("aria-label", `Taste ${index + 1}`);
    if (index < 3) {
      card.dataset.final = "true";
      card.setAttribute("aria-keyshortcuts", keyCodes[index].slice(3));
      const label = document.createElement("span");
      label.className = "key-label";
      label.textContent = keyCodes[index].slice(3);
      card.appendChild(label);
    }
    screen.appendChild(card);
  });
  const finalCards = [...screen.querySelectorAll('[data-final="true"]')];
  function updateHint() {
    hint.textContent = progress === order.length
      ? "Schritt 12/12: Obere drei gleichzeitig – rechts markieren + Los · alternativ Q + W + E oder drei Finger"
      : `Schritt ${progress}/12 · Letzter Schritt: rechts Tasten markieren und Los drücken`;
    updateSelection();
  }
  function updateSelection() {
    selectionToggle.setAttribute("aria-pressed", String(selectionMode));
    selectionToggle.textContent = selectionMode ? "Markieren beenden" : "Tasten markieren";
    selectionActions.hidden = !selectionMode;
    screen.querySelectorAll(".card").forEach(card => {
      card.classList.toggle("is-selected", selected.has(card));
      if (selectionMode) card.setAttribute("aria-pressed", String(selected.has(card)));
      else card.removeAttribute("aria-pressed");
    });
    selectionInfo.textContent = `${selected.size} von 3 markiert` + (progress < order.length ? " · Zuerst die Codefolge eingeben." : "");
    selectionGo.disabled = complete || selected.size !== 3 || progress !== order.length;
  }
  function updateHeld() {
    const cards = new Set(held.values());
    finalCards.forEach(card => card.classList.toggle("is-held", cards.has(card)));
    if (progress === order.length && cards.size === 0) finalArmed = true;
  }
  function press(token, card) {
    if (complete || held.has(token)) return;
    held.set(token, card);
    updateHeld();
    const down = new Set(held.values());
    if (progress === order.length && finalArmed && finalCards.every(card => down.has(card))) {
      complete = true;
      held.clear();
      updateHeld();
      document.body.classList.add("is-complete");
      hint.textContent = "Entsperrt – Neustart in zehn Sekunden";
      selectionGo.disabled = true;
      setTimeout(() => window.location.reload(), 10000);
    }
  }
  function release(token) {
    held.delete(token);
    updateHeld();
  }
  screen.addEventListener("click", event => {
    const card = event.target.closest(".card");
    if (!card || complete) return;
    if (selectionMode) {
      if (selected.has(card)) selected.delete(card);
      else if (selected.size < 3) selected.add(card);
      updateSelection();
      return;
    }
    if (card.dataset.final) return;
    if (card.dataset.number === order[progress]) {
      progress++;
      finalArmed = progress === order.length && held.size === 0;
    } else {
      progress = 0;
      finalArmed = false;
    }
    status.textContent = card.dataset.number;
    updateHint();
  });
  screen.addEventListener("pointerdown", event => {
    const card = event.target.closest('[data-final="true"]');
    if (!card || complete || selectionMode || event.button !== 0) return;
    card.setPointerCapture(event.pointerId);
    press(`pointer:${event.pointerId}`, card);
  });
  const releasePointer = event => release(`pointer:${event.pointerId}`);
  screen.addEventListener("pointerup", releasePointer);
  screen.addEventListener("pointercancel", releasePointer);
  screen.addEventListener("lostpointercapture", releasePointer);
  document.addEventListener("keydown", event => {
    const index = keyCodes.indexOf(event.code);
    if (selectionMode || index < 0 || event.repeat || event.ctrlKey || event.altKey || event.metaKey
      || event.target.closest('input, select, textarea, [contenteditable], .settings, .multi-control')) return;
    event.preventDefault();
    press(`key:${event.code}`, finalCards[index]);
  });
  document.addEventListener("keyup", event => release(`key:${event.code}`));
  function clearHeld() { held.clear(); updateHeld(); }
  selectionToggle.addEventListener("click", () => {
    if (complete) return;
    selectionMode = !selectionMode;
    selected.clear();
    clearHeld();
    updateSelection();
  });
  document.getElementById("selection-clear").addEventListener("click", () => {
    selected.clear();
    updateSelection();
  });
  selectionGo.addEventListener("click", () => {
    if (!selectionMode || complete || progress !== order.length || selected.size !== 3) return;
    if (!finalCards.every(card => selected.has(card))) {
      selectionInfo.textContent = "Falsche Auswahl – markiere die drei Tasten der obersten Reihe.";
      return;
    }
    clearHeld();
    [...selected].forEach((card, index) => press(`selection:${index}`, card));
    [...selected].forEach((_, index) => release(`selection:${index}`));
  });
  window.addEventListener("blur", clearHeld);
  document.addEventListener("visibilitychange", () => { if (document.hidden) clearHeld(); });
  updateHint();
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("resolution-form");
  const preset = document.getElementById("resolution-preset");
  const widthInput = document.getElementById("resolution-width");
  const heightInput = document.getElementById("resolution-height");
  const actualSize = document.getElementById("actual-size");
  const info = document.getElementById("resolution-info");
  const orientationButton = document.getElementById("orientation-toggle");
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
    document.body.classList.toggle("portrait", height > width);
    orientationButton.textContent = height > width ? "Ins Querformat wechseln" : "Ins Hochformat wechseln";
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
  orientationButton.addEventListener("click", () => {
    const width = setting.mode === "auto" ? document.documentElement.clientWidth : setting.width;
    const height = setting.mode === "auto" ? window.innerHeight : setting.height;
    setting = { mode: "custom", width: height === width ? width : height, height: height === width ? Math.round(width * 1.5) : width, actual: setting.actual };
    syncInputs();
    save();
  });
  syncInputs();
  render();
});
