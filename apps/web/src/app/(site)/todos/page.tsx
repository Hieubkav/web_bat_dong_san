"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@dohy/backend/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function TodosPage() {
  const [text, setText] = useState("");
  const todos = useQuery(api.todos.list) ?? [];
  const createTodo = useMutation(api.todos.create);
  const toggleTodo = useMutation(api.todos.toggle);
  const removeTodo = useMutation(api.todos.remove);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    await createTodo({ text: trimmed });
    setText("");
  };

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Todos</CardTitle>
          <CardDescription>Simple Convex-backed todo list.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Add a task"
              aria-label="Todo text"
            />
            <Button type="submit" disabled={!text.trim()}>
              Add
            </Button>
          </form>

          <ul className="space-y-3">
            {todos.length === 0 ? (
              <li className="text-sm text-muted-foreground">Nothing here yet.</li>
            ) : (
              todos.map((todo) => (
                <li key={todo._id} className="flex items-center justify-between gap-3">
                  <label className="flex flex-1 items-center gap-2 text-sm">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo({ id: todo._id })}
                      aria-label={`Mark ${todo.completed ? "incomplete" : "complete"}`}
                    />
                    <span className={todo.completed ? "line-through text-muted-foreground" : undefined}>
                      {todo.text}
                    </span>
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground"
                    onClick={() => removeTodo({ id: todo._id })}
                  >
                    Delete
                  </Button>
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
