export const makeState = (initialState) => {
  const state = initialState;
  let updater = () => {};

  const getState = () => JSON.parse(JSON.stringify(state));
  const setState = (newState) => {
    for (const key in newState) {
      if (key in state) {
        state[key] = newState[key];
      }
    }
    updater(getState());
  };
  const suscribe = (listener) => {
    updater = listener;
  };
  return { getState, setState, suscribe };
};
