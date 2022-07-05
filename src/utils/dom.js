import { always, curry } from "ramda";

export const queryDocument = curry((document, selector) => ({
  select: document.querySelector(selector) || always({})(),
  selectAll: document.querySelectorAll(selector) || always([])(),
}));

export const suscribeEvent = curry((event, element, callback) => ({
  add: () => element.addEventListener(event, callback),
  remove: () => element.removeEventListener(event, callback),
}));

export const modifierElement = curry((element, modifications) => {
  modifications(element);
  return element;
});
