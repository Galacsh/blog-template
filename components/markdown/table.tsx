import {
  Table as TableComponent,
  TableHead as TableHeadComponent,
  TableHeader as TableHeaderComponent,
  TableBody as TableBodyComponent,
  TableRow as TableRowComponent,
  TableCell as TableCellComponent,
} from '@/components/ui/table'

export function Table({ style, children }: React.ComponentProps<'table'>) {
  return (
    <div className="rounded-md border mb-4 w-fit max-w-full overflow-auto">
      <TableComponent style={style} className="min-w-96 border-spacing-4">
        {children}
      </TableComponent>
    </div>
  )
}

export function TableHeader({ style, children }: React.ComponentProps<'thead'>) {
  return <TableHeaderComponent style={style}>{children}</TableHeaderComponent>
}

export function TableHead({ style, children }: React.ComponentProps<'th'>) {
  return (
    <TableHeadComponent
      className="px-2 py-2 first:pl-4 last:pr-4 text-foreground bg-foreground/5 font-bold"
      style={style}
    >
      {children}
    </TableHeadComponent>
  )
}

export function TableBody({ style, children }: React.ComponentProps<'tbody'>) {
  return <TableBodyComponent style={style}>{children}</TableBodyComponent>
}

export function TableRow({ style, children }: React.ComponentProps<'th'>) {
  return <TableRowComponent style={style}>{children}</TableRowComponent>
}

export function TableCell({ style, children }: React.ComponentProps<'th'>) {
  return (
    <TableCellComponent className="px-3 py-2 first:pl-4 last:pr-4" style={style}>
      {children}
    </TableCellComponent>
  )
}
