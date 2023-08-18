import { Configuration } from "./config";

export interface TimerSchema extends Configuration {
	id: string;
	title: string;
}

export interface Schemas {
	schemas: TimerSchema[];
	currentSchemaId: string;
}
