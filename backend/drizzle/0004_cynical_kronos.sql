CREATE TYPE "public"."service_status" AS ENUM('active', 'upcoming', 'paused', 'expired');--> statement-breakpoint
CREATE TABLE "service" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"date" varchar(255) NOT NULL,
	"status" "service_status" DEFAULT 'upcoming' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
