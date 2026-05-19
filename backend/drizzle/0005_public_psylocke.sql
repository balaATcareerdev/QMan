ALTER TABLE "service" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "status" SET DEFAULT 'upcoming'::text;--> statement-breakpoint
DROP TYPE "public"."service_status";--> statement-breakpoint
CREATE TYPE "public"."service_status" AS ENUM('active', 'upcoming', 'expired');--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "status" SET DEFAULT 'upcoming'::"public"."service_status";--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "status" SET DATA TYPE "public"."service_status" USING "status"::"public"."service_status";--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "is_paused" boolean DEFAULT false NOT NULL;