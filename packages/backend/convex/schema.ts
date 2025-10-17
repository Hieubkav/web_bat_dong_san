import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
    createdAt: v.number(), // ms epoch to support ordering
  })
    .index("by_completed", ["completed"])
    .index("by_createdAt", ["createdAt"]),
});
