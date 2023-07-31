import { Schemas, TimerSchema } from "@/models/schemas";
import { createId } from "@/utils/extra.utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SchemasState extends Schemas {
  addSchema: (schema: Omit<TimerSchema, "id">) => void;
  updateSchema: (id: string, schema: TimerSchema) => void;
  deleteSchema: (id: string) => void;
  setCurrentSchema: (id: string) => void;
  findCurrentSchema: () => TimerSchema | null;
}

export const useSchemasState = create<SchemasState>()(
  persist(
    (set, get) => ({
      schemas: [],
      currentSchemaId: "",
      addSchema: (schema) => {
        set(() => ({
          schemas: [...get().schemas, { ...schema, id: createId() }],
        }));
      },
      updateSchema: (id, updatedSchema) => {
        set(() => ({
          schemas: get().schemas.map((schema) =>
            schema.id === id ? { ...schema, ...updatedSchema } : schema
          ),
        }));
      },
      deleteSchema: (id) => {
        set(() => ({
          schemas: get().schemas.filter((schema) => schema.id !== id),
        }));
      },
      setCurrentSchema: (id) => {
        set(() => ({
          currentSchemaId: id,
        }));
      },
      findCurrentSchema: () =>
        get().schemas.find((schema) => schema.id === get().currentSchemaId) ||
        null,
    }),
    {
      name: "schemas",
    }
  )
);
