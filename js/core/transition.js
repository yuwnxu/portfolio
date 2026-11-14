import { reducedMotion } from "./motion.js";

const CELL = 64;
let layer = null;
let cells = [];
let cols = 0;
let rows = 0;

function ensureLayer() {
  if (!layer) {
    layer = document.createElement("div");
    layer.className = "wipe";
    layer.setAttribute("aria-hidden", "true");
    document.body.append(layer);
  }
  const nextCols = Math.ceil(window.innerWidth / CELL);
  const nextRows = Math.ceil(window.innerHeight / CELL);
  if (nextCols === cols && nextRows === rows) return;
  cols = nextCols;
  rows = nextRows;
  layer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  layer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  layer.replaceChildren(...Array.from({ length: cols * rows }, () => document.createElement("i")));
  cells = [...layer.children];
}

function run(from, to) {
  ensureLayer();
  layer.hidden = false;
  return Promise.all(
    cells.map((cell, i) => {
      const x = i % cols;
      const y = Math.floor(i / cols);
      return cell.animate(
        [{ transform: `scale(${from})` }, { transform: `scale(${to})` }],
        { duration: 200, delay: (x + y) * 7, easing: "steps(4, end)", fill: "forwards" }
      ).finished;
    })
  );
}

export async function wipeIn() {
  if (reducedMotion()) return;
  await run(0, 1.03);
}

export async function wipeOut() {
  if (reducedMotion()) return;
  await run(1.03, 0);
  layer.hidden = true;
}
