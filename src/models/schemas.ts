import { Timers } from "./config";

export interface TimerSchema extends Timers {
  id: string;
  title: string;
}

export interface Schemas {
  schemas: TimerSchema[];
  currentSchemaId: string;
}
