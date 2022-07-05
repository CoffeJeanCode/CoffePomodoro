import { queryDocument, suscribeEvent } from "./utils/dom";

export const getDOMElement = queryDocument(document);
export const clickEvent = suscribeEvent("click");
