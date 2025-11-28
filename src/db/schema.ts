import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const user =pgTable("user",{
    id:uuid("id").unique().primaryKey(),
    name:text("name").notNull(),
    email:text("email").notNull().unique(),
    password:text("text").notNull(),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow()
})