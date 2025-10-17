"use client";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@dohy/backend/convex/_generated/api";

export default function Home() {
  const todos = useQuery(api.todos.list) ?? [];

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <h1 className="mb-4 text-xl font-semibold">Next.js + Convex Core Starter</h1>
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">Todos Overview</h2>
          {todos.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No todos yet. Head over to the todos demo to create your first task.
            </p>
          ) : (
            <ul className="space-y-2 text-sm text-muted-foreground">
              {todos.slice(0, 3).map((todo) => (
                <li key={todo._id.toString()} className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-2 w-2 rounded-full ${
                      todo.completed ? "bg-green-500" : "bg-orange-400"
                    }`}
                  />
                  <span className={todo.completed ? "line-through" : undefined}>{todo.text}</span>
                </li>
              ))}
              {todos.length > 3 && (
                <li className="text-xs text-muted-foreground">...and more</li>
              )}
            </ul>
          )}
          <Link href="/todos" className="mt-4 inline-block text-sm text-primary hover:underline">
            
          </Link>
        </section>
      </div>
    </div>
  );
}
