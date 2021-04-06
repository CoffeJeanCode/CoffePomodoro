export const suscribeEvent = (typeEvent, event) => (element) => {
  const observable = {
    element,
    suscribed: false,
    suscribe: () => {
      observable.suscribed = true;
      element &&
        element.addEventListener(typeEvent, (evt) => event(evt, element));
    },
    unsuscribe: () => {
      observable.suscribed = false;
      element &&
        element.removeEventListener(typeEvent, (evt) => event(evt, element));
    },
  };

  document.addEventListener("close", () => {
    observable.unsuscribe();
  });

  observable.suscribe();
  return observable;
};
