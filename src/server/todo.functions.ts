import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '#/db'
import { todos } from '#/db/schema'
import { count, desc, eq } from 'drizzle-orm'

const PAGE_SIZE = 5

// ─── GET: paginated todos ──────────────────────────────────
export const getTodos = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ page: z.number().int().positive() }))
  .handler(async ({ data }) => {
    const offset = (data.page - 1) * PAGE_SIZE

    const [items, [total]] = await Promise.all([
      db
        .select()
        .from(todos)
        .orderBy(desc(todos.createdAt))
        .limit(PAGE_SIZE)
        .offset(offset),
      db.select({ count: count() }).from(todos),
    ])

    return {
      items,
      page: data.page,
      pageSize: PAGE_SIZE,
      total: total!.count,
      pageCount: Math.ceil(total!.count / PAGE_SIZE),
    }
  })

// ─── POST: add a todo ──────────────────────────────────────
export const addTodo = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ title: z.string().min(1).max(500) }))
  .handler(async ({ data }) => {
    const [row] = await db
      .insert(todos)
      .values({ title: data.title })
      .returning()
    return row
  })

// ─── POST: toggle completed ────────────────────────────────
export const toggleTodo = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.number(), completed: z.boolean() }))
  .handler(async ({ data }) => {
    await db
      .update(todos)
      .set({ completed: data.completed })
      .where(eq(todos.id, data.id))
  })

// ─── POST: delete a todo ───────────────────────────────────
export const deleteTodo = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    await db.delete(todos).where(eq(todos.id, data.id))
  })
