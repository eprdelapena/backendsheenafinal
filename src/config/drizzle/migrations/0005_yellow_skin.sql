CREATE TABLE "expensetable" (
	"id" serial PRIMARY KEY NOT NULL,
	"expenseid" varchar(255) NOT NULL,
	"username" varchar(255),
	"expense" numeric(10, 2),
	"expensedate" timestamp NOT NULL,
	"memo" text
);
