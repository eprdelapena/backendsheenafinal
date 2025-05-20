CREATE TABLE "installmenttable" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderid" varchar(255) NOT NULL,
	"username" varchar(255),
	"installment" numeric(10, 2),
	"installmentdate" timestamp NOT NULL
);
