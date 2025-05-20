import {
  pgTable,
  varchar,
  uuid,
  integer,
  serial,
  char,
  timestamp,
  pgEnum,
  boolean,
  uniqueIndex,
  numeric,
  text,
} from "drizzle-orm/pg-core";

export const ECategoryType = pgEnum("ecategorytype", [
  "bags",
  "shoes",
  "clothes",
  "jewelry",
  "watches",
  "others",
]);

export const ProductTable = pgTable("producttable", {
  id: serial("id").primaryKey().notNull(),
  productid: serial("productid").unique().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  expense: numeric("expense", { precision: 10, scale: 2 })
    .notNull()
    .default("0.00"),
  expected: numeric("expected", { precision: 10, scale: 2 })
    .notNull()
    .default("0.00"),
  earning: numeric("earning", { precision: 10, scale: 2 })
    .notNull()
    .default("0.00"),
  isshow: boolean("isshow").notNull().default(true),
  cost: numeric("cost", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  imageone: text("imageone"),
  imagetwo: text("imagetwo"),
  imagethree: text("imagethree"),
  category: ECategoryType("ecategorytype").default("others").notNull(),
  description: text("description"),
  searchtag: text("searchtag"),
  totalorders: integer("orders")
    .notNull()
    .$default(() => {
      return 0;
    }),
  successorders: integer("successorders")
    .notNull()
    .$default(() => {
      return 0;
    }),
  pendingorders: integer("pendingorders")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantityxxs: integer("quantityxxs")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantityxs: integer("quantityxs")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantitys: integer("quantitys")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantitym: integer("quantitym")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantityl: integer("quantityl")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantityxl: integer("quantityxl")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantityxxl: integer("quantityxxl")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity5: integer("quantity5")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity55: integer("quantity55")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity6: integer("quantity6")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity65: integer("quantity65")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity7: integer("quantity7")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity75: integer("quantity75")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity8: integer("quantity8")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity85: integer("quantity85")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity9: integer("quantity9")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity95: integer("quantity95")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity100: integer("quantity100")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity105: integer("quantity105")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity110: integer("quantity110")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity115: integer("quantity115")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantity120: integer("quantity120")
    .notNull()
    .$default(() => {
      return 0;
    }),
  quantitydefault: integer("quantitydefault")
    .notNull()
    .$default(() => {
      return 0;
    }),
  regdate: timestamp("regdate").notNull(),
});
