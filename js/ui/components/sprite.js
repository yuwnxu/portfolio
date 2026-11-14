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
  [12, 9, 1, 2, "#FFD9C7"],
  [13, 4, 7, 7, "#2B2150"],
  [14, 5, 5, 5, "#5CF2A6"],
  [15, 6, 3, 1, "#2B2150"],
  [15, 8, 2, 1, "#FF5CA8"],
  [12, 11, 9, 1, "#9F8FDC"],
  [14, 11, 1, 1, "#E7E0FF"],
  [16, 11, 1, 1, "#E7E0FF"],
  [18, 11, 1, 1, "#E7E0FF"],
  [12, 12, 9, 1, "#2B2150"],
  [12, 11, 2, 2, "#FFD9C7"],
];

const VIEW = { x: -1, y: 0, width: 21, height: 16 };

export function createSprite({ size = 96, label = "", className = "" } = {}) {
  const props = {
    class: `sprite ${className}`.trim(),
    viewBox: `${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`,
    width: Math.round((size * VIEW.width) / VIEW.height),
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
