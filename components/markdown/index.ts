import { Components } from 'hast-util-to-jsx-runtime'
import { Anchor } from './anchor'
import { H1, H2, H3, H4, H5, H6 } from './heading'
import { HorizontalRule } from './horizontal-rule'
import { Image } from './image'
import { InputCheckbox, ListItem, OrderedList, UnorderedList } from './list'
import { Paragraph } from './paragraph'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { Blockquote } from './blockquote'
import { Code, Pre } from './code'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  input: InputCheckbox,
  a: Anchor,
  table: Table,
  thead: TableHeader,
  th: TableHead,
  tbody: TableBody,
  tr: TableRow,
  td: TableCell,
  img: Image,
  hr: HorizontalRule,
  blockquote: Blockquote,
  pre: Pre,
  code: Code,
} as Partial<Components>

export default components
