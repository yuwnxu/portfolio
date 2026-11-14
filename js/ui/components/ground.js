import { h } from "../../core/dom.js";
import { createSprite } from "./sprite.js";

export function createGround({ walker = false } = {}) {
  return h(
    "div",
    { class: "ground-wrap", "aria-hidden": "true" },
    walker ? h("div", { class: "walker" }, createSprite({ size: 56, className: "sprite--hop" })) : null,
    h("div", { class: "ground" })
  );
}
