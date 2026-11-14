import { h } from "../../core/dom.js";
import { createArrow } from "./button.js";

export function createMenu(items, { initial = 0 } = {}) {
  let index = initial;

  const nodes = items.map((item, i) =>
    h(
      "button",
      {
        class: "menu__item",
        type: "button",
        onClick: () => {
          index = i;
          sync();
          item.onSelect();
        },
        onMouseenter: () => {
          index = i;
          sync();
        },
      },
      createArrow("right"),
      h("span", {}, item.label)
    )
  );

  function sync() {
    nodes.forEach((node, i) => node.setAttribute("aria-current", String(i === index)));
  }

  sync();

  return {
    el: h("nav", { class: "menu" }, ...nodes),
    move(delta) {
      index = (index + delta + items.length) % items.length;
      sync();
    },
    activate() {
      items[index].onSelect();
    },
  };
}
