ALTER TABLE "installmenttable" ALTER COLUMN "installmentdate" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "installmenttable" ALTER COLUMN "installmentdate" DROP NOT NULL;