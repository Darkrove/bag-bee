"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTableColumnHeader } from "./data-table-column-header"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  customerName: string
  timestamp: string
  paymentMode: "cash" | "online" | "card"
  totalAmount: number
  totalProfit: number
  totalQuantity: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "paymentMode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Method" />
    ),
    cell: ({ row }) => {
      const paymentMode = row.getValue("paymentMode")
      return (
        <div>
          {paymentMode === "cash" && <Badge variant="success">cash</Badge>}
          {paymentMode === "online" && (
            <Badge variant="destructive">online</Badge>
          )}
          {paymentMode === "card" && <Badge variant="secondary">card</Badge>}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "totalProfit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profit" />
    ),
    cell: ({ row }) => {
      const profit = parseFloat(row.getValue("totalProfit"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(profit)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "totalQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qty" />
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/billv2/${payment.id}`}>View Invoice</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
