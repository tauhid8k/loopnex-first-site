import {
  createCollection,
  localOnlyCollectionOptions,
} from '@tanstack/react-db'
import { z } from 'zod'

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.any(),
})

export type TodoItem = z.infer<typeof TodoSchema>

export const todosCollection = createCollection(
  localOnlyCollectionOptions({
    getKey: (todo: TodoItem) => todo.id,
    schema: TodoSchema,
  }),
)

// ─── Sync: server data → collection ───────────────────────
// Tracks which IDs are currently in the collection so we can
// reconcile when a new page of server data arrives.
const trackedIds = new Set<number>()

export function syncTodosFromServer(items: TodoItem[]) {
  const incomingIds = new Set(items.map((t) => t.id))

  // Remove items that left the page (or were optimistic ghosts)
  for (const id of trackedIds) {
    if (!incomingIds.has(id)) {
      try {
        todosCollection.delete(id)
      } catch {
        /* already removed */
      }
    }
  }

  // Upsert incoming items
  for (const item of items) {
    if (trackedIds.has(item.id)) {
      try {
        todosCollection.update(item.id, (draft) => {
          draft.title = item.title
          draft.completed = item.completed
          draft.createdAt = item.createdAt
        })
      } catch {
        // Was deleted optimistically — re-insert from server truth
        todosCollection.insert(item)
      }
    } else {
      todosCollection.insert(item)
    }
  }

  trackedIds.clear()
  for (const id of incomingIds) trackedIds.add(id)
}

// Called after optimistic inserts so sync can clean up temp items
export function trackId(id: number) {
  trackedIds.add(id)
}

// Called after optimistic deletes so sync can re-insert on rollback
export function untrackId(id: number) {
  trackedIds.delete(id)
}
