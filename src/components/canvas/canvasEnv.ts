/**
 * Shared environment probes for the two background canvases.
 * Read once per effect run; both canvases rebuild on role switch anyway.
 */

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** True on touch-first devices, where the mouse-driven visuals never apply. */
export function isCoarsePointer(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, summary, canvas, [role="button"], [role="link"], [contenteditable="true"]';

/**
 * The canvases listen on window, so without this a tap on a nav link or the
 * Unity player also fires a laser / ripple underneath it.
 */
export function isInteractiveTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element && target.closest(INTERACTIVE_SELECTOR) !== null
  );
}
