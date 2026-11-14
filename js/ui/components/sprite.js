import { svg } from "../../core/dom.js";

const PIXELS = [
  [5, 1, 6, 2, "#2B2150"],
  [4, 3, 8, 5, "#2B2150"],
  [5, 4, 6, 4, "#FFD9C7"],
  [6, 5, 1, 1, "#2B2150"],
  [9, 5, 1, 1, "#2B2150"],
  [4, 8, 8, 5, "#FF5CA8"],
  [6, 9, 4, 3, "#FFFFFF"],
  [5, 13, 2, 2, "#2B2150"],
  [9, 13, 2, 2, "#2B2150"],
  [12, 10, 1, 2, "#FFD9C7"],
  [14, 6, 2, 6, "#4B3A8F"],
  [14, 6, 2, 1, "#2B2150"],
  [15, 7, 1, 5, "#2B2150"],
  [14, 8, 1, 2, "#5CF2A6"],
  [12, 12, 4, 1, "#2B2150"],
  [12, 13, 2, 1, "#FFD9C7"],
];

export function createSprite({ size = 96, label = "", className = "" } = {}) {
  const props = {
    class: `sprite ${className}`.trim(),
    viewBox: "0 0 16 16",
    width: size,
    height: size,
    "shape-rendering": "crispEdges",
  };
  if (label) {
    props.role = "img";
    props["aria-label"] = label;
  } else {
    props["aria-hidden"] = "true";
  }
  return svg("svg", props, ...PIXELS.map(([x, y, width, height, fill]) => svg("rect", { x, y, width, height, fill })));
}
