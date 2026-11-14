import { h } from "../../core/dom.js";
import { bindKeys } from "../../core/keys.js";
import { site } from "../../data/site.js";
import { findProject, neighbours } from "../../data/projects.js";
import { createHud } from "../components/hud.js";
import { createButton } from "../components/button.js";
import { createChips } from "../components/chip.js";
import { createVideoFrame, createBrowserFrame } from "../components/frames.js";

function createMedia(media) {
  return media.type === "video" ? createVideoFrame(media) : createBrowserFrame(media);
}

function createInfo(project) {
  const actions = [];
  if (project.link) {
    actions.push(createButton({ label: "ОТКРЫТЬ САЙТ", icon: "right", href: project.link, external: true }));
  }
  actions.push(
    createButton({
      label: "ОБСУДИТЬ ПРОЕКТ",
      variant: project.link ? "secondary" : "primary",
      icon: project.link ? null : "right",
      href: site.telegram.url,
      external: true,
    })
  );

  return h(
    "section",
    { class: "info" },
    h("p", { class: "info__level" }, project.level),
    h("h1", { class: "info__title" }, project.name),
    h("h2", {}, "О ПРОЕКТЕ"),
    h("p", { class: "info__text" }, project.about),
    h("h2", {}, "ЧТО УМЕЕТ"),
    h("ul", { class: "stars" }, ...project.features.map((feature) => h("li", {}, h("span", { class: "star", "aria-hidden": "true" }), feature))),
    h("h2", {}, "НА ЧЁМ СДЕЛАНО"),
    createChips(project.stack, "chips chips--lg"),
    h("div", { class: "actions" }, ...actions)
  );
}

function createPager(prev, next) {
  return h(
    "nav",
    { class: "pager", "aria-label": "Другие проекты" },
    prev ? createButton({ label: "ПРЕДЫДУЩИЙ", variant: "secondary", icon: "left", href: `#/project/${prev.id}` }) : h("span"),
    next ? createButton({ label: "СЛЕДУЮЩИЙ", variant: "secondary", href: `#/project/${next.id}`, className: "btn--next" }) : h("span")
  );
}

export function projectScreen({ params, navigate }) {
  const project = findProject(params.id);
  if (!project) {
    navigate("/projects");
    return { el: h("main", { class: "screen screen--night" }) };
  }
  const { prev, next } = neighbours(project.id);

  const el = h(
    "main",
    { class: "screen screen--night" },
    createHud({ right: project.level }),
    h(
      "div",
      { class: "screen__body project-page" },
      h("div", { class: "toolbar" }, createButton({ label: "НАЗАД", variant: "secondary", icon: "left", href: "#/projects" })),
      h("div", { class: "project" }, createMedia(project.media), createInfo(project)),
      createPager(prev, next)
    )
  );

  let unbind = null;
  return {
    el,
    title: `${project.name} — ${site.nick}`,
    mount() {
      unbind = bindKeys({
        Escape: () => navigate("/projects"),
        ArrowLeft: () => prev && navigate(`/project/${prev.id}`),
        ArrowRight: () => next && navigate(`/project/${next.id}`),
      });
    },
    destroy() {
      unbind?.();
    },
  };
}
