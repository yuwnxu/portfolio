import { h } from "../../core/dom.js";
import { bindKeys } from "../../core/keys.js";
import { site } from "../../data/site.js";
import { projects } from "../../data/projects.js";
import { createHud } from "../components/hud.js";
import { createButton } from "../components/button.js";
import { createChips } from "../components/chip.js";
import { createSprite } from "../components/sprite.js";

const FILTERS = [
  { id: "all", label: "ВСЕ" },
  { id: "mobile", label: "MOBILE" },
  { id: "web", label: "WEB" },
];

function createCard(project, index) {
  const art = project.logo
    ? h("img", { src: project.logo, alt: "", width: 120, height: 120 })
    : createSprite({ size: 96 });

  return h(
    "a",
    { class: "card", href: `#/project/${project.id}`, style: { "--i": index, "--tile": project.tile }, "aria-label": `${project.name}. ${project.short}` },
    h("div", { class: "card__tile" }, art),
    h("span", { class: "card__level" }, project.level),
    h("span", { class: "card__name" }, project.name),
    h("span", { class: "card__text" }, project.short),
    createChips(project.stack, "card__tags chips"),
    h("span", { class: "card__bar", "aria-hidden": "true" }, h("i"))
  );
}

export function levelsScreen({ navigate }) {
  let filter = "all";
  const grid = h("div", { class: "cards" });
  const tabs = h("div", { class: "tabs", role: "group", "aria-label": "Фильтр проектов" });

  function renderGrid() {
    const visible = projects.filter((p) => filter === "all" || p.platform === filter);
    grid.replaceChildren(...visible.map(createCard));
  }

  function renderTabs() {
    tabs.replaceChildren(
      ...FILTERS.map((item) =>
        h(
          "button",
          {
            class: "tab",
            type: "button",
            "aria-pressed": String(item.id === filter),
            onClick: () => {
              filter = item.id;
              renderTabs();
              renderGrid();
            },
          },
          item.label
        )
      )
    );
  }

  renderTabs();
  renderGrid();

  const el = h(
    "main",
    { class: "screen screen--night" },
    createHud({ center: `LV ${site.level}`, right: `SCORE ${String(projects.length).padStart(3, "0")} PROJECTS` }),
    h(
      "div",
      { class: "screen__body levels" },
      h("div", { class: "toolbar" }, createButton({ label: "НАЗАД", variant: "secondary", icon: "left", href: "#/" })),
      h("h1", { class: "heading" }, "ВЫБЕРИТЕ УРОВЕНЬ"),
      tabs,
      grid
    )
  );

  function moveFocus(delta) {
    const cards = [...grid.querySelectorAll(".card")];
    if (!cards.length) return;
    const index = cards.indexOf(document.activeElement);
    const next = index === -1 ? 0 : (index + delta + cards.length) % cards.length;
    cards[next].focus();
  }

  let unbind = null;
  return {
    el,
    title: `Проекты — ${site.nick}`,
    mount() {
      unbind = bindKeys({
        ArrowRight: () => moveFocus(1),
        ArrowDown: () => moveFocus(1),
        ArrowLeft: () => moveFocus(-1),
        ArrowUp: () => moveFocus(-1),
        Escape: () => navigate("/"),
      });
    },
    destroy() {
      unbind?.();
    },
  };
}
