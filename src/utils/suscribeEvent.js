export const suscribeEvent = (element, typeEvent, event) => {
  const observable = {
    suscribed: false,
    element,
    suscribe: () => {
      observable.suscribed = true;
      element && element.addEventListener(typeEvent, event);
    },
    unsuscribe: () => {
      observable.suscribed = false;
      element && element.removeEventListener(typeEvent, event);
    },
  };

  document.addEventListener("close", () => {
    observable.unsuscribe();
  });

  return observable;
};
