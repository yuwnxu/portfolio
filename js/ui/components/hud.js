import { h } from "../../core/dom.js";
import { createHearts } from "./hearts.js";

export function createHud({ center = "", right = "" }) {
  return h(
    "header",
    { class: "hud" },
    h("div", { class: "hud__hp" }, h("span", {}, "HP"), createHearts(5)),
    center ? h("span", { class: "hud__center" }, center) : null,
    h("span", { class: "hud__right" }, right)
  );
}
