import { h } from "../../core/dom.js";
import { createArrow } from "./button.js";

export function createVideoFrame({ src, alt, label }) {
  return h(
    "figure",
    { class: "frame" },
    h("img", { class: "frame__media", src, alt, width: 330, height: 714 }),
    h(
      "figcaption",
      { class: "frame__bar" },
      h("span", { class: "frame__label" }, createArrow("right"), label),
      h("span", { class: "frame__dots", "aria-hidden": "true" }, ...Array.from({ length: 6 }, (_, i) => h("i", { style: { "--i": i } })))
    )
  );
}

export function createBrowserFrame({ src, alt, url }) {
  return h(
    "figure",
    { class: "browser" },
    h(
      "div",
      { class: "browser__bar", "aria-hidden": "true" },
      h("span", { class: "browser__dots" }, h("i"), h("i"), h("i")),
      h("span", { class: "browser__url" }, url)
    ),
    h("div", { class: "browser__view" }, h("img", { src, alt, width: 1200, height: 750 }))
  );
}
