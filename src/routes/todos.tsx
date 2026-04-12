import { createFileRoute, Link } from '@tanstack/react-router'
import {
  queryOptions,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useLiveQuery } from '@tanstack/react-db'
import { z } from 'zod'
import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from '#/server/todo.functions'
import {
  todosCollection,
  syncTodosFromServer,
  trackId,
  untrackId,
} from '#/db-collections/todos'
import type { TodoItem } from '#/db-collections/todos'

// ─── Query options factory ─────────────────────────────────
const todosQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ['todos', { page }],
    queryFn: () => getTodos({ data: { page } }),
  })

// ─── Search param validation ───────────────────────────────
const searchSchema = z.object({
  page: z.number().int().positive().catch(1),
})

// ─── Route definition ──────────────────────────────────────
export const Route = createFileRoute('/todos')({
  validateSearch: (search) => searchSchema.parse(search),
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: ({ context, deps: { page } }) => {
    return context.queryClient.ensureQueryData(todosQueryOptions(page))
  },
  component: TodosPage,
})

// ─── Column definitions ────────────────────────────────────
const columnHelper = createColumnHelper<TodoItem>()

// ─── Page component ────────────────────────────────────────
function TodosPage() {
  const { page } = Route.useSearch()
  const queryClient = useQueryClient()
  const [newTitle, setNewTitle] = useState('')

  // ── Server data (SSR-safe, always available from loader) ──
  const { data } = useQuery(todosQueryOptions(page))
  const pageCount = data?.pageCount ?? 1
  const total = data?.total ?? 0

  // ── Sync server data → TanStack DB collection ────────────
  // Tracks which page was synced so we fall back to query data
  // during SSR and page transitions (collection is client-only).
  const [syncedPage, setSyncedPage] = useState(-1)

  useEffect(() => {
    if (data?.items) {
      syncTodosFromServer(data.items)
      setSyncedPage(page)
    }
  }, [data, page])

  // ── Reactive reads from collection (optimistic-aware) ────
  const { data: liveTodos } = useLiveQuery((q) =>
    q.from({ todo: todosCollection }).select(({ todo }) => ({
      ...todo,
    })),
  )

  // SSR/first-render: collection is empty → use query data.
  // After sync: collection has data → use liveTodos (reflects
  // optimistic mutations instantly).
  const isCollectionReady = syncedPage === page
  const todos = isCollectionReady ? (liveTodos ?? []) : (data?.items ?? [])

  // ── Invalidation helper ───────────────────────────────────
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['todos'] })

  // ── Mutations: optimistic via collection, persisted via server fn ──
  const addMutation = useMutation({
    mutationFn: (title: string) => addTodo({ data: { title } }),
    onMutate: (title: string) => {
      // Instant optimistic insert with a temporary negative ID
      const tempId = -Date.now()
      todosCollection.insert({
        id: tempId,
        title,
        completed: false,
        createdAt: new Date(),
      })
      trackId(tempId)
    },
    onSettled: invalidate, // refetch reconciles (replaces temp with real ID)
  })

  const toggleMutation = useMutation({
    mutationFn: (todo: TodoItem) =>
      toggleTodo({ data: { id: todo.id, completed: !todo.completed } }),
    onMutate: (todo: TodoItem) => {
      // Instant optimistic toggle
      todosCollection.update(todo.id, (draft) => {
        draft.completed = !draft.completed
      })
    },
    onSettled: invalidate, // refetch reconciles (or rolls back on error)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTodo({ data: { id } }),
    onMutate: (id: number) => {
      // Instant optimistic delete
      try {
        todosCollection.delete(id)
      } catch {
        /* already gone */
      }
      untrackId(id) // so sync re-inserts if server call fails
    },
    onSettled: invalidate,
  })

  // ── Column definitions (needs closures for actions) ────
  const columns = [
    columnHelper.accessor('completed', {
      header: '✓',
      size: 50,
      cell: ({ row }) => (
        <button
          onClick={() => toggleMutation.mutate(row.original)}
          className="flex h-6 w-6 items-center justify-center rounded-md border border-(--line) transition hover:bg-(--link-bg-hover)"
          title={row.original.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {row.original.completed ? (
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              className="text-(--palm)"
            >
              <path
                fill="currentColor"
                d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
              />
            </svg>
          ) : null}
        </button>
      ),
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      cell: ({ row }) => (
        <span
          className={row.original.completed ? 'line-through opacity-50' : ''}
        >
          {row.original.title}
        </span>
      ),
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created',
      size: 160,
      cell: ({ getValue }) => {
        const v = getValue()
        return v
          ? new Date(v).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '—'
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      size: 60,
      cell: ({ row }) => (
        <button
          onClick={() => deleteMutation.mutate(row.original.id)}
          className="rounded-md p-1 text-red-400 transition hover:bg-red-50 hover:text-red-600"
          title="Delete"
        >
          <svg viewBox="0 0 16 16" width="14" height="14">
            <path
              fill="currentColor"
              d="M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM6.5 1.75V3h3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25zM3.613 5.25l.614 8.22a1.75 1.75 0 001.744 1.63h4.058a1.75 1.75 0 001.744-1.63l.614-8.22H3.613z"
            />
          </svg>
        </button>
      ),
    }),
  ]

  // ── TanStack Table instance ────────────────────────────
  const table = useReactTable({
    data: todos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
  })

  // ── Submit handler ─────────────────────────────────────
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = newTitle.trim()
    if (!trimmed) return
    addMutation.mutate(trimmed)
    setNewTitle('')
  }

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in rounded-4xl px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-3">Full-Stack Data Flow</p>
        <h1 className="display-title mb-2 text-3xl font-bold tracking-tight text-(--sea-ink) sm:text-4xl">
          Todos
        </h1>
        <p className="mb-6 text-sm text-(--sea-ink-soft)">
          Server-side paginated · Drizzle + SQLite · TanStack DB (optimistic) ·
          TanStack Table · 5 per page
        </p>

        {/* ── Add form ──────────────────────────────────── */}
        <form onSubmit={handleAdd} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What needs to be done?"
            maxLength={500}
            className="flex-1 rounded-xl border border-(--line) bg-(--surface) px-4 py-2.5 text-sm text-(--sea-ink) placeholder:text-(--sea-ink-soft)/50 focus:border-(--lagoon) focus:outline-none focus:ring-2 focus:ring-(--lagoon)/20"
          />
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="rounded-xl border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-(--lagoon-deep) transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)] disabled:opacity-50"
          >
            {addMutation.isPending ? 'Adding…' : 'Add'}
          </button>
        </form>

        {/* ── Table ─────────────────────────────────────── */}
        <div className="overflow-x-auto rounded-xl border border-(--line)">
          <table className="w-full text-sm">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr
                  key={hg.id}
                  className="border-b border-(--line) bg-(--surface)"
                >
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-(--sea-ink-soft)"
                      style={{
                        width:
                          header.getSize() !== 150
                            ? header.getSize()
                            : undefined,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-(--sea-ink-soft)"
                  >
                    No todos yet. Add one above!
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-(--line) transition hover:bg-(--surface)"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination controls ───────────────────────── */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-(--sea-ink-soft)">
            {total} todo{total !== 1 ? 's' : ''} · page {page} of{' '}
            {pageCount || 1}
          </span>

          <div className="flex gap-2">
            <Link
              to="/todos"
              search={{ page: 1 }}
              disabled={page <= 1}
              className="rounded-lg border border-(--line) px-3 py-1.5 text-xs font-medium transition hover:bg-(--surface) aria-disabled:pointer-events-none aria-disabled:opacity-40"
            >
              «
            </Link>
            <Link
              to="/todos"
              search={{ page: Math.max(1, page - 1) }}
              disabled={page <= 1}
              className="rounded-lg border border-(--line) px-3 py-1.5 text-xs font-medium transition hover:bg-(--surface) aria-disabled:pointer-events-none aria-disabled:opacity-40"
            >
              ‹ Prev
            </Link>
            <Link
              to="/todos"
              search={{ page: Math.min(pageCount, page + 1) }}
              disabled={page >= pageCount}
              className="rounded-lg border border-(--line) px-3 py-1.5 text-xs font-medium transition hover:bg-(--surface) aria-disabled:pointer-events-none aria-disabled:opacity-40"
            >
              Next ›
            </Link>
            <Link
              to="/todos"
              search={{ page: pageCount }}
              disabled={page >= pageCount}
              className="rounded-lg border border-(--line) px-3 py-1.5 text-xs font-medium transition hover:bg-(--surface) aria-disabled:pointer-events-none aria-disabled:opacity-40"
            >
              »
            </Link>
          </div>
        </div>

        {/* ── Data flow diagram ─────────────────────────── */}
        <details className="mt-8 rounded-xl border border-(--line) bg-(--surface)">
          <summary className="cursor-pointer px-4 py-3 text-xs font-semibold uppercase tracking-wider text-(--sea-ink-soft)">
            Data Flow
          </summary>
          <pre className="overflow-x-auto px-4 pb-4 text-xs leading-relaxed text-(--sea-ink-soft)">{`
URL ?page=${page}
  → TanStack Router validateSearch (zod: page=${page})
  → loaderDeps extracts { page: ${page} }
  → loader: queryClient.ensureQueryData(todosQueryOptions(${page}))
    → getTodos serverFn (GET, runs on server)
      → Drizzle: SELECT * FROM todos ORDER BY created_at DESC LIMIT 5 OFFSET ${(page - 1) * 5}
      → Drizzle: SELECT count(*) FROM todos
      → returns { items, total: ${total}, pageCount: ${pageCount} }
  → SSR: dehydrated into HTML via setupRouterSsrQueryIntegration
  → Client: TanStack Query hydrates cache from SSR payload

  ┌─────────── TanStack DB layer ───────────┐
  │ useEffect → syncTodosFromServer(items)   │
  │   → reconciles todosCollection           │
  │   (deletes stale, upserts current)       │
  │                                          │
  │ useLiveQuery reads from todosCollection  │
  │   → reactive: re-renders on ANY change   │
  └──────────────────────────────────────────┘

  → TanStack Table (manualPagination, pageCount=${pageCount})
  → Renders ${todos.length} row(s)

Optimistic mutations (instant, no server round-trip):
  toggle → todosCollection.update(id, draft => !completed)
  add    → todosCollection.insert({tempId, title, ...})
  delete → todosCollection.delete(id)
  → useLiveQuery fires → UI updates in <1ms

Server persistence (background):
  → useMutation.mutationFn → createServerFn (POST) → Drizzle → SQLite
  → onSettled: invalidateQueries(['todos'])
    → TanStack Query refetches → syncTodosFromServer → reconciles
    → optimistic state replaced with server truth (or rolled back)

Future: plug in a sync engine (ElectricSQL, PowerSync, Zero)
  → replace syncTodosFromServer with live sync
  → collection becomes the local replica
  → everything else stays the same
          `}</pre>
        </details>
      </section>
    </main>
  )
}
