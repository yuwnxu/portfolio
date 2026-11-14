import { h } from "../../core/dom.js";
import { bindKeys } from "../../core/keys.js";
import { site } from "../../data/site.js";
import { projects } from "../../data/projects.js";
import { hero, skills } from "../../data/skills.js";
import { createHud } from "../components/hud.js";
import { createButton } from "../components/button.js";
import { createCharacter } from "../components/character.js";

function createSkill({ name, level }, index) {
  const segments = Array.from({ length: 10 }, (_, i) =>
    h("i", { class: i < level ? "seg seg--on" : "seg", style: { "--i": i } })
  );
  return h(
    "div",
    { class: "skill", style: { "--row": index }, role: "img", "aria-label": `${name}: уровень ${level} из 10` },
    h("div", { class: "skill__head" }, h("span", {}, name), h("span", { class: "skill__level" }, `LV ${level}`)),
    h("div", { class: "skill__bar" }, ...segments)
  );
}

function createHero() {
  return h(
    "section",
    { class: "hero-card" },
    createCharacter({ size: 150, className: "sprite--bob" }),
    h("h1", { class: "hero-card__name" }, site.nick),
    h("p", { class: "hero-card__class" }, `КЛАСС: ${hero.className}`),
    h("p", { class: "hero-card__platforms" }, hero.platforms),
    h("p", { class: "hero-card__label" }, "СТЕК"),
    h("p", { class: "hero-card__stack" }, hero.stack),
    h("p", { class: "hero-card__level" }, `УРОВЕНЬ ${site.level}`)
  );
}

export function skillsScreen({ navigate }) {
  const rows = skills.map(createSkill);

  const el = h(
    "main",
    { class: "screen screen--night" },
    createHud({ center: `LV ${site.level}`, right: `SCORE ${String(projects.length).padStart(3, "0")} PROJECTS` }),
    h(
      "div",
      { class: "screen__body skills-page" },
      h("div", { class: "toolbar" }, createButton({ label: "НАЗАД", variant: "secondary", icon: "left", href: "#/" })),
      h("div", { class: "skills" }, createHero(), h("section", { class: "skills__list" }, h("h2", { class: "heading heading--left" }, "ХАРАКТЕРИСТИКИ"), ...rows))
    )
  );

  let observer = null;
  let unbind = null;
  return {
    el,
    title: `Навыки — ${site.nick}`,
    mount() {
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              entry.target.classList.add("is-in");
              observer.unobserve(entry.target);
            }
          },
          { threshold: 0.4 }
        );
        rows.forEach((row) => observer.observe(row));
      } else {
        rows.forEach((row) => row.classList.add("is-in"));
      }
      unbind = bindKeys({ Escape: () => navigate("/") });
    },
    destroy() {
      observer?.disconnect();
      unbind?.();
    },
  };
}
