import {
  pgTable,
  varchar,
  uuid,
  integer,
  serial,
  char,
  timestamp,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const EAccountType = pgEnum("eaccounttype", [
  "customer",
  "admin",
  "admin_secretary",
  "admin_viewer",
  "admin_level_one",
  "admin_level_two",
  "admin_level_three",
]);

export const UserTable = pgTable("usertable", {
  id: serial("id").primaryKey().notNull(),
  userid: serial("userid").unique().notNull(),
  firstname: varchar("firstname", { length: 255 }).notNull(),
  middlename: varchar("middlename", { length: 255 }).notNull(),
  lastname: varchar("lastname", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  salt: char("salt", { length: 5 }).notNull().default(""),
  mobile: varchar("mobile", { length: 11 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  token: varchar("token", { length: 100 }).notNull().default(""),
  eaccounttype: EAccountType("eaccounttype").default("customer"),
  regdate: timestamp("regdate").notNull(),
  lastdate: timestamp("lastdate").notNull(),
  lastip: varchar("lastip", { length: 255 }),
  lastdevice: varchar("lastdevice", { length: 255 }),
  lastlocation: varchar("lastlocation", { length: 255 }),
});
