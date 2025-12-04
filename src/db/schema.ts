import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const user =pgTable("user",{
    id:uuid("id").unique().primaryKey(),
    name:text("name").notNull(),
    email:text("email").notNull().unique(),
    password:text("password").notNull(),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow()
})

export const videos=pgTable("videos",{
    id:uuid("id").unique().primaryKey(),
    videoTitle:text("videoTitle"),
    videoUrl:text("videoUrl").notNull(),
    posterUrl:text("posterUrl").notNull(),
    user_id:uuid("user_id").references(()=>user.id).notNull(),
    created_at:timestamp("created_at").defaultNow(),
})