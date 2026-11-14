import { h } from "../../core/dom.js";
import { site } from "../../data/site.js";
import { createSprite } from "./sprite.js";

const HIDE_MS = 1900;
const COMBO_MS = HIDE_MS;
const ANGRY_FROM = 5;

function pickDifferent(list, last) {
  const options = list.filter((phrase) => phrase !== last);
  return options[Math.floor(Math.random() * options.length)];
}

export function createCharacter({ size = 96, className = "", label = "Потыкать персонажа" } = {}) {
  const phrases = site.hitPhrases;
  const bubble = h("span", { class: "bubble", role: "status", "aria-live": "polite", hidden: true });
  const hit = h("button", { class: "character__hit", type: "button", "aria-label": label, onClick: poke }, createSprite({ size, className }));
  const el = h("span", { class: "character" }, bubble, hit);

  let hideTimer = 0;
  let comboTimer = 0;
  let combo = 0;
  let last = "";

  function phrase() {
    if (combo === 1) return phrases.first;
    return pickDifferent(combo >= ANGRY_FROM ? phrases.angry : phrases.next, last);
  }

  function poke() {
    combo += 1;
    clearTimeout(comboTimer);
    comboTimer = setTimeout(() => {
      combo = 0;
    }, COMBO_MS);

    last = phrase();
    bubble.textContent = last;
    bubble.hidden = true;
    void bubble.offsetWidth;
    bubble.hidden = false;

    hit.classList.remove("is-hit");
    void hit.offsetWidth;
    hit.classList.add("is-hit");

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      bubble.hidden = true;
    }, HIDE_MS);
  }

  return el;
}
