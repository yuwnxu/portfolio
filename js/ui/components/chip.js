import { h } from "../../core/dom.js";

export function createChip(label) {
  return h("span", { class: "chip" }, label);
}

export function createChips(labels, className = "chips") {
  return h("div", { class: className }, ...labels.map(createChip));
}
