CREATE TABLE "videos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"videoUrl" text NOT NULL,
	"posterUrl" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "videos_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;