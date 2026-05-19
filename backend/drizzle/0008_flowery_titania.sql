ALTER TABLE "service" ALTER COLUMN "date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "slot" ADD COLUMN "service_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "slot" ADD COLUMN "start_time" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "slot" ADD COLUMN "end_time" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "slot" ADD COLUMN "status" "service_status" NOT NULL;--> statement-breakpoint
ALTER TABLE "slot" ADD COLUMN "capacity" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "slot" ADD COLUMN "booked_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "slot" ADD COLUMN "current_token" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "slot" ADD COLUMN "avg_time" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "slot" ADD COLUMN "completed_count" integer DEFAULT 0 NOT NULL;