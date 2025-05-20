import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/config/drizzle/schema.ts", // location of yourschema
  out: "./src/config/drizzle/migrations", //migration location converting to SQL code
  dialect: "postgresql", // database you will use
  verbose: true, // strict and logging rules
  strict: true,
});
