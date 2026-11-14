import { h } from "../../core/dom.js";

export function createArrow(direction) {
  return h("span", { class: `arrow arrow--${direction}`, "aria-hidden": "true" });
}

export function createButton({ label, variant = "primary", icon = null, href = null, external = false, onClick = null, className = "" }) {
  const props = { class: `btn btn--${variant} ${className}`.trim() };
  if (href) {
    props.href = href;
    if (external) {
      props.target = "_blank";
      props.rel = "noopener noreferrer";
    }
  } else {
    props.type = "button";
  }
  if (onClick) props.onClick = onClick;
  return h(href ? "a" : "button", props, icon ? createArrow(icon) : null, h("span", {}, label));
}
