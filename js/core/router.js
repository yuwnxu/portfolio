import { wipeIn, wipeOut } from "./transition.js";

const table = [];
let root = null;
let current = null;
let token = 0;
let firstRender = true;

export function route(pattern, factory) {
  const keys = [];
  const source = pattern.replace(/:(\w+)/g, (_, key) => {
    keys.push(key);
    return "([^/]+)";
  });
  table.push({ regexp: new RegExp(`^${source}$`), keys, factory });
}

function match(path) {
  for (const entry of table) {
    const result = entry.regexp.exec(path);
    if (!result) continue;
    const params = Object.fromEntries(entry.keys.map((key, i) => [key, decodeURIComponent(result[i + 1])]));
    return { factory: entry.factory, params };
  }
  return null;
}

function currentPath() {
  return window.location.hash.replace(/^#/, "") || "/";
}

async function show(path) {
  const id = ++token;
  const found = match(path) ?? match("/");
  if (!firstRender) await wipeIn();
  if (id !== token) return;
  current?.destroy?.();
  const screen = found.factory({ params: found.params, navigate });
  root.replaceChildren(screen.el);
  window.scrollTo(0, 0);
  if (screen.title) document.title = screen.title;
  screen.mount?.();
  current = screen;
  firstRender = false;
  await wipeOut();
}

export function navigate(path) {
  if (currentPath() === path) return;
  window.location.hash = path;
}

export function startRouter(element) {
  root = element;
  window.addEventListener("hashchange", () => show(currentPath()));
  show(currentPath());
}
