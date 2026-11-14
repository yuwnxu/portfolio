import { h } from "../../core/dom.js";
import { bindKeys } from "../../core/keys.js";
import { reducedMotion } from "../../core/motion.js";
import { site } from "../../data/site.js";
import { createHud } from "../components/hud.js";
import { createClouds } from "../components/cloud.js";
import { createCharacter } from "../components/character.js";
import { createMenu } from "../components/menu.js";
import { createButton } from "../components/button.js";
import { createGround } from "../components/ground.js";

const CLOUDS = [
  { top: "14%", scale: 1.0, duration: 120, delay: -30 },
  { top: "24%", scale: 1.1, duration: 160, delay: -100 },
  { top: "62%", scale: 0.8, duration: 140, delay: -70 },
];

export function contactScreen({ navigate }) {
  const text = h("p", { class: "dialog__text", "aria-live": "polite" });
  const next = h("span", { class: "dialog__next", "aria-hidden": "true" });
  const answers = h("div", { class: "answers", hidden: true });
  let typing = null;
  let typed = false;

  const menu = createMenu([
    { label: "НАПИСАТЬ В TELEGRAM", onSelect: () => window.open(site.telegram.url, "_blank", "noopener") },
    { label: "ПОСМОТРЕТЬ ПРОЕКТЫ", onSelect: () => navigate("/projects") },
    { label: "ВЕРНУТЬСЯ В МЕНЮ", onSelect: () => navigate("/") },
  ]);

  answers.append(menu.el, createButton({ label: site.telegram.handle, href: site.telegram.url, external: true }));

  function finish() {
    clearInterval(typing);
    text.textContent = site.dialog;
    next.hidden = true;
    answers.hidden = false;
    typed = true;
  }

  function type() {
    if (reducedMotion()) return finish();
    let count = 0;
    typing = setInterval(() => {
      count += 1;
      text.textContent = site.dialog.slice(0, count);
      if (count >= site.dialog.length) finish();
    }, 42);
  }

  const el = h(
    "main",
    { class: "screen screen--sky" },
    createHud({ right: "ФИНАЛ" }),
    createClouds(CLOUDS),
    h(
      "div",
      { class: "screen__body contact" },
      createCharacter({ size: 154, className: "sprite--bob" }),
      h("section", { class: "dialog", onClick: () => !typed && finish() }, h("p", { class: "dialog__who" }, `${site.nick}:`), text, next),
      answers
    ),
    createGround()
  );

  let unbind = null;
  return {
    el,
    title: `Связь — ${site.nick}`,
    mount() {
      type();
      unbind = bindKeys({
        ArrowUp: () => typed && menu.move(-1),
        ArrowDown: () => typed && menu.move(1),
        Enter: () => (typed ? menu.activate() : finish()),
        Escape: () => navigate("/"),
      });
    },
    destroy() {
      clearInterval(typing);
      unbind?.();
    },
  };
}
