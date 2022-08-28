import { tap } from "ramda";

export const log = (msg: any) => tap((x) => console.log(msg, x));

export const debuggLog = log("Debbug");
