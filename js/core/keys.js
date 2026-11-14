const stack = [];

window.addEventListener("keydown", (event) => {
  const handlers = stack[stack.length - 1];
  if (!handlers || event.altKey || event.ctrlKey || event.metaKey) return;
  const handler = handlers[event.key];
  if (!handler) return;
  const interactive = event.target.closest?.("button, a");
  if ((event.key === "Enter" || event.key === " ") && interactive) return;
  event.preventDefault();
  handler(event);
});

export function bindKeys(handlers) {
  stack.push(handlers);
  return () => {
    const index = stack.indexOf(handlers);
    if (index >= 0) stack.splice(index, 1);
  };
}
