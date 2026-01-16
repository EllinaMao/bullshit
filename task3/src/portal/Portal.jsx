import { createPortal } from "react-dom";

export function Portal({ id, children }) {
  const container = document.getElementById(id);
  if (!container) return null;
  return createPortal(children, container);
}

