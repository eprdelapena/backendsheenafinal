CREATE TABLE "logtable" (
	"id" serial PRIMARY KEY NOT NULL,
	"productid" integer NOT NULL,
	"itemid" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"price" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"cost" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"size" varchar(255) NOT NULL,
	"mode" varchar(255) NOT NULL,
	"orderid" varchar(255),
	"logdate" timestamp DEFAULT now()
);
