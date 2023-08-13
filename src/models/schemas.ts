import { Timers } from "./config";

export interface TimerSchema extends Timers {
  id: string;
  title: string;
  pomodorosToLongBreak: number;
}

export interface Schemas {
  schemas: TimerSchema[];
  currentSchemaId: string;
}
