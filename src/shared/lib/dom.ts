export type DomAttrs = Record<string, string>;

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: DomAttrs = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (key === "class") {
      node.className = value;
    } else if (key === "text") {
      node.textContent = value;
    } else {
      node.setAttribute(key, value);
    }
  }

  for (const child of children) {
    node.append(
      typeof child === "string" ? document.createTextNode(child) : child,
    );
  }

  return node;
}