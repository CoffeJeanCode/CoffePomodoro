import { queryDocument, suscribeEvent } from "./utils/dom";

export const getDOMElement = queryDocument(document);
export const clickEvent = suscribeEvent("click");
export const changeEvent = suscribeEvent("change");
