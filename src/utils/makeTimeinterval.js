export const makeTimeinterval = (fn, steps) => {
  let timer = null;
  const unsuscribe = () => {
    clearInterval(timer);
    console.log("cleared");
  };
  const callback = (params) => {
    fn(params, unsuscribe);
  };

  const suscribe = () => {
    timer = setInterval(callback, steps);
  };

  return {
    suscribe,
    unsuscribe,
  };
};
