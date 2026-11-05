import { Form, Link, useNavigation } from "react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";

export interface AdminTableRow {
  id: string;
  title: string;
  subtitle: string;
  /** The two middle columns, in header order */
  details: [string, string];
  editHref: string;
}

interface AdminTableProps {
  /** Headers for title + the two detail columns; "ACTIONS" is appended */
  headers: [string, string, string];
  rows: AdminTableRow[];
  emptyLabel: string;
  deleteConfirmMessage: string;
}

const GRID = "grid grid-cols-[1fr_auto_auto_auto] gap-px bg-[var(--line)]";
const CELL = "flex items-center bg-[var(--bg)] px-4 py-3";
const ICON_BUTTON =
  "flex h-8 w-8 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--accent)] disabled:opacity-50";

export function AdminTable({ headers, rows, emptyLabel, deleteConfirmMessage }: AdminTableProps) {
  const isBusy = useNavigation().state !== "idle";

  return (
    <div className="border border-[var(--line)]">
      <div className={`${GRID} border-b border-[var(--line)]`}>
        {[...headers, "ACTIONS"].map((header) => (
          <div
            key={header}
            className="bg-[var(--surface)] px-4 py-2 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]"
          >
            {header}
          </div>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="px-4 py-12 text-center font-mono text-xs text-[var(--muted)]">{emptyLabel}</div>
      ) : (
        rows.map((row) => (
          <div key={row.id} className={`${GRID} border-b border-[var(--line)] last:border-b-0`}>
            <div className="bg-[var(--bg)] px-4 py-3">
              <p className="line-clamp-1 font-mono text-xs font-bold text-[var(--text)]">{row.title}</p>
              <p className="mt-0.5 line-clamp-1 font-mono text-[0.6rem] text-[var(--muted)]">{row.subtitle}</p>
            </div>
            {row.details.map((detail, index) => (
              <div key={headers[index + 1]} className={CELL}>
                <span className="whitespace-nowrap font-mono text-xs text-[var(--muted)]">{detail}</span>
              </div>
            ))}
            <div className="flex items-center bg-[var(--bg)] px-2 py-3">
              <Link to={row.editHref} aria-label={`Edit ${row.title}`} className={ICON_BUTTON}>
                <PencilIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Form method="post">
                <input type="hidden" name="intent" value="delete" />
                <input type="hidden" name="id" value={row.id} />
                <button
                  type="submit"
                  disabled={isBusy}
                  aria-label={`Delete ${row.title}`}
                  onClick={(event) => {
                    if (!confirm(deleteConfirmMessage)) event.preventDefault();
                  }}
                  className={ICON_BUTTON}
                >
                  <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </Form>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
