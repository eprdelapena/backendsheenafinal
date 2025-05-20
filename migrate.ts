import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres(
   "postgres://postgres:sheenaadmin@localhost:5432/dbchicberry",
  // "postgres://admin:password@192.168.254.109:5434/dbchicberry",
  {
    max: 1,
  },
);

const main = async () => {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/config/drizzle/migrations",
  });

  await migrationClient.end();
};

main();
