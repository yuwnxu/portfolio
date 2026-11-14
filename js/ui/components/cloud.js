import { h, svg } from "../../core/dom.js";

const RECTS = [
  [0, 24, 108, 24],
  [12, 12, 72, 12],
  [24, 0, 36, 12],
];

export function createCloud({ top, scale = 1, duration = 90, delay = 0 }) {
  const art = svg(
    "svg",
    { viewBox: "0 0 108 48", width: 108 * scale, height: 48 * scale, "shape-rendering": "crispEdges", "aria-hidden": "true" },
    ...RECTS.map(([x, y, width, height]) => svg("rect", { x, y, width, height, fill: "#FFFFFF" }))
  );
  return h("div", { class: "cloud", style: { top, "--dur": `${duration}s`, "--delay": `${delay}s` } }, art);
}

export function createClouds(specs) {
  return h("div", { class: "clouds", "aria-hidden": "true" }, ...specs.map(createCloud));
}
