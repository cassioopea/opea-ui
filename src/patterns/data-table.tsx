import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

const dataTableVariants = cva(
  "overflow-hidden rounded-2xl border border-border bg-card shadow-card flex flex-col",
  {
    variants: {},
    defaultVariants: {},
  }
);

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  align?: "left" | "right" | "center";
  numeric?: boolean;
  truncate?: boolean;
  width?: string | number;
  minWidth?: string | number;
  sticky?: boolean;
  /** Extra classes for the <th>. */
  headClassName?: string;
  /** Extra classes for the <td>. */
  cellClassName?: string;
  /** Renders the cell content for a row. */
  cell: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> extends VariantProps<typeof dataTableVariants> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  
  // Table Variants (passed to Table primitive)
  density?: "comfortable" | "compact";
  striped?: boolean;
  hoverable?: boolean;
  bordered?: "none" | "rows" | "grid";
  size?: "sm" | "md";
  
  // DataTable specifics
  stickyHeader?: boolean;
  stickyFirstColumn?: boolean;
  loading?: boolean;
  
  /** Show a leading checkbox column with select-all in the header. */
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  /** Makes rows clickable. */
  onRowClick?: (row: T) => void;
  /** Shown in place of the table body when `data` is empty. */
  emptyState?: React.ReactNode;
  /** Header area inside the card, above the table (e.g. tabs + toolbar). */
  header?: React.ReactNode;
  /** Footer area (e.g. a pagination bar). Rendered below the table. */
  footer?: React.ReactNode;
  
  className?: string;
  tableClassName?: string;
}

const alignClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
} as const;

/**
 * Column-driven table for transaction/approval/list views. Built on ui/table.
 * Handles header, selection and empty state consistently.
 */
export function DataTable<T>({
  columns,
  data,
  getRowId,
  density = "comfortable",
  striped = false,
  hoverable = true,
  bordered = "rows",
  size = "md",
  stickyHeader = false,
  stickyFirstColumn = false,
  loading = false,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  onRowClick,
  emptyState,
  header,
  footer,
  className,
  tableClassName,
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const colCount = columns.length + (selectable ? 1 : 0);

  function toggleAll() {
    onSelectionChange?.(allSelected ? [] : data.map(getRowId));
  }
  function toggleOne(id: string) {
    onSelectionChange?.(
      selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id],
    );
  }

  return (
    <div className={cn(dataTableVariants(), className)}>
      {header}
      <div className={cn("relative flex-1 overflow-auto", tableClassName)}>
        <Table 
          density={density} 
          striped={striped} 
          hoverable={hoverable} 
          bordered={bordered} 
          size={size}
          className="rounded-none m-0 border-0"
        >
          <TableHeader>
            <TableRow className="border-0">
              {selectable && (
                <TableHead 
                  className={cn(
                    "w-12 px-4",
                    stickyHeader && "sticky top-0 z-20 bg-muted/80 backdrop-blur-sm",
                    stickyFirstColumn && "sticky left-0 z-30 bg-muted/80 backdrop-blur-sm border-r border-border/60"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-border accent-primary"
                    aria-label="Selecionar todos"
                  />
                </TableHead>
              )}
              {columns.map((col, i) => {
                const isFirstDataCol = i === 0 && !selectable;
                const isStickyCol = col.sticky || (stickyFirstColumn && isFirstDataCol);
                return (
                  <TableHead
                    key={col.key}
                    style={{ width: col.width, minWidth: col.minWidth }}
                    className={cn(
                      "text-caption uppercase tracking-wider text-muted-foreground",
                      col.align && alignClass[col.align],
                      col.numeric && "tabular-nums",
                      stickyHeader && "sticky top-0 z-20 bg-muted/80 backdrop-blur-sm",
                      isStickyCol && "sticky left-0 z-20 bg-muted/80 backdrop-blur-sm border-r border-border/60",
                      (isStickyCol && stickyHeader) && "z-30",
                      col.headClassName,
                    )}
                  >
                    {col.header}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={colCount} className="h-24 text-center">
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></span>
                    <span>Carregando...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={colCount} className="p-0">
                  {emptyState}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => {
                const id = getRowId(row);
                const selected = selectedIds.includes(id);
                return (
                  <TableRow
                    key={id}
                    data-state={selected ? "selected" : undefined}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn(
                      onRowClick && "cursor-pointer",
                    )}
                  >
                    {selectable && (
                      <TableCell
                        className={cn(
                          "px-4 align-middle",
                          stickyFirstColumn && "sticky left-0 z-10 bg-card border-r border-border/60"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleOne(id)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 rounded border-border accent-primary"
                          aria-label="Selecionar linha"
                        />
                      </TableCell>
                    )}
                    {columns.map((col, i) => {
                      const isFirstDataCol = i === 0 && !selectable;
                      const isStickyCol = col.sticky || (stickyFirstColumn && isFirstDataCol);
                      return (
                        <TableCell
                          key={col.key}
                          style={{ width: col.width, minWidth: col.minWidth }}
                          className={cn(
                            col.align && alignClass[col.align],
                            col.numeric && "tabular-nums",
                            col.truncate && "truncate max-w-[200px]",
                            isStickyCol && "sticky left-0 z-10 bg-card border-r border-border/60",
                            col.cellClassName,
                          )}
                        >
                          {col.cell(row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      {footer}
    </div>
  );
}

export interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

/** Self-contained pagination bar, designed to be passed as <DataTable footer={...}>. */
export function DataTablePagination({
  page,
  pageSize,
  total,
  onPageChange,
}: DataTablePaginationProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex flex-wrap items-center justify-end gap-4 border-t border-border bg-muted/30 px-4 py-3 text-label text-muted-foreground">
      <span className="tabular-nums">
        {total > 0 ? `${start}–${end}` : "0"} de {total.toLocaleString("pt-BR")}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent disabled:opacity-40"
          aria-label="Página anterior"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(lastPage, page + 1))}
          disabled={page >= lastPage}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent disabled:opacity-40"
          aria-label="Próxima página"
        >
          ›
        </button>
      </div>
    </div>
  );
}
