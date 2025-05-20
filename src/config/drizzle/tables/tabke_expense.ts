import {
  pgTable,
  varchar,
  serial,
  timestamp,
  numeric,
  text,
} from "drizzle-orm/pg-core";

export const ExpenseTable = pgTable("expensetable", {
  id: serial("id").primaryKey().notNull(),
  expenseid: varchar("expenseid", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).$default(() => {
    return "";
  }),
  expense: numeric("expense", {
    precision: 10,
    scale: 2,
  }).$default(() => "0"),
  expensedate: timestamp("expensedate").notNull(),
  memo: text("memo").$default(() => ""),
});
