import { h, svg } from "../../core/dom.js";

const HEART = ["01101100", "11111110", "11111110", "01111100", "00111000", "00010000"];

function heart(index) {
  const rects = [];
  HEART.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      if (cell === "1") rects.push(svg("rect", { x, y, width: 1, height: 1 }));
    });
  });
  return svg(
    "svg",
    { class: "heart", viewBox: "0 0 8 6", width: 20, height: 15, "shape-rendering": "crispEdges", style: { "--i": index } },
    ...rects
  );
}

export function createHearts(count = 5) {
  return h("span", { class: "hearts", "aria-hidden": "true" }, ...Array.from({ length: count }, (_, i) => heart(i)));
}
