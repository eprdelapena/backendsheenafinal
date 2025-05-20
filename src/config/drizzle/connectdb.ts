import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const localDatabaseConnection =
  process.env.CONNECTION_STRING ||
  // "postgresql://dbchicberry_owner:npg_ru4Hexnwmp0U@ep-sparkling-darkness-a1lnfbf1-pooler.ap-southeast-1.aws.neon.tech/dbchicberry?sslmode=require"
 "postgres://postgres:sheenaadmin@localhost:5432/dbchicberry";
  // "postgres://admin:password@192.168.254.109:5434/dbchicberry";
const client = postgres(localDatabaseConnection as string);

export const db = drizzle(client, { schema, logger: true });
