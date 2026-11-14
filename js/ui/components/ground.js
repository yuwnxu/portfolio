import { h } from "../../core/dom.js";
import { createCharacter } from "./character.js";

export function createGround({ walker = false } = {}) {
  return h(
    "div",
    { class: "ground-wrap" },
    walker ? h("div", { class: "walker" }, createCharacter({ size: 56, className: "sprite--hop" })) : null,
    h("div", { class: "ground", "aria-hidden": "true" })
  );
}
