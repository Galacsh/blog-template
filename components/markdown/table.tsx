import {
  Table as TableComponent,
  TableHead as TableHeadComponent,
  TableHeader as TableHeaderComponent,
  TableBody as TableBodyComponent,
  TableRow as TableRowComponent,
  TableCell as TableCellComponent,
} from '@/components/ui/table'

import type { ComponentProps } from 'react'

export function Table({ style, children }: ComponentProps<'table'>) {
  return (
    <div className="rounded-md border mb-4 w-fit max-w-full overflow-auto">
      <TableComponent style={style} className="min-w-96 border-spacing-4">
        {children}
      </TableComponent>
    </div>
  )
}

export function TableHeader({ style, children }: ComponentProps<'thead'>) {
  return <TableHeaderComponent style={style}>{children}</TableHeaderComponent>
}

export function TableHead({ style, children }: ComponentProps<'th'>) {
  return (
    <TableHeadComponent
      className="px-2 py-2 first:pl-4 last:pr-4 text-foreground bg-foreground/5 font-bold"
      style={style}
    >
      {children}
    </TableHeadComponent>
  )
}

export function TableBody({ style, children }: ComponentProps<'tbody'>) {
  return <TableBodyComponent style={style}>{children}</TableBodyComponent>
}

export function TableRow({ style, children }: ComponentProps<'th'>) {
  return <TableRowComponent style={style}>{children}</TableRowComponent>
}

export function TableCell({ style, children }: ComponentProps<'th'>) {
  return (
    <TableCellComponent className="px-3 py-2 first:pl-4 last:pr-4" style={style}>
      {children}
    </TableCellComponent>
  )
}
