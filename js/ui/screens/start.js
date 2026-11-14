import { h } from "../../core/dom.js";
import { bindKeys } from "../../core/keys.js";
import { site } from "../../data/site.js";
import { projects } from "../../data/projects.js";
import { createHud } from "../components/hud.js";
import { createClouds } from "../components/cloud.js";
import { createSprite } from "../components/sprite.js";
import { createMenu } from "../components/menu.js";
import { createButton } from "../components/button.js";
import { createGround } from "../components/ground.js";

const CLOUDS = [
  { top: "18%", scale: 1.0, duration: 110, delay: -20 },
  { top: "9%", scale: 1.3, duration: 150, delay: -90 },
  { top: "70%", scale: 0.9, duration: 130, delay: -60 },
  { top: "58%", scale: 0.8, duration: 170, delay: -10 },
];

export function startScreen({ navigate }) {
  const menu = createMenu([
    { label: "ПРОЕКТЫ", onSelect: () => navigate("/projects") },
    { label: "НАВЫКИ", onSelect: () => navigate("/skills") },
    { label: "СВЯЗЬ", onSelect: () => navigate("/contact") },
  ]);

  const title = h(
    "h1",
    { class: "title", "aria-label": site.nick },
    ...[...site.nick].map((letter, i) => h("span", { style: { "--i": i }, "aria-hidden": "true" }, letter))
  );

  const el = h(
    "main",
    { class: "screen screen--sky" },
    createHud({ center: `LV ${site.level}`, right: `SCORE ${String(projects.length).padStart(3, "0")} PROJECTS` }),
    createClouds(CLOUDS),
    h(
      "div",
      { class: "screen__body start" },
      title,
      h("p", { class: "subtitle" }, site.role),
      createSprite({ size: 120, className: "sprite--bob" }),
      menu.el,
      createButton({ label: "PRESS START", className: "btn--blink", onClick: () => menu.activate() }),
      h(
        "p",
        { class: "hint" },
        h("span", { class: "hint__keys" }, "ВЫБОР: СТРЕЛКИ    СТАРТ: ENTER"),
        h("span", { class: "hint__touch" }, "НАЖМИТЕ НА ПУНКТ МЕНЮ")
      )
    ),
    createGround({ walker: true })
  );

  let unbind = null;
  return {
    el,
    title: site.title,
    mount() {
      unbind = bindKeys({
        ArrowUp: () => menu.move(-1),
        ArrowDown: () => menu.move(1),
        Enter: () => menu.activate(),
      });
    },
    destroy() {
      unbind?.();
    },
  };
}
