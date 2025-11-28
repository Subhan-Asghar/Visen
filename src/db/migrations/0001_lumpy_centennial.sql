ALTER TABLE "user" ADD COLUMN "id" uuid PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "text" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");