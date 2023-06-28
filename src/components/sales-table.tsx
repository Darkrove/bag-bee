import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

interface SaleData {
  id: number
  customerName: string
  customerPhone: string
  customerAddress: string
  productCategory: string
  quantity: number
  amount: number
  code: string
  profit: number
  dealerCode: string
  paymentMode: string
  createdAt: string
  updatedAt: string
  timestamp: string
}

interface TableProps {
  TableData: SaleData[]
}

export function TableDemo({ TableData }: TableProps) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Customer</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TableData.map((sale: SaleData) => (
          <TableRow key={sale.id}>
            <TableCell className="font-medium">{sale.customerName}</TableCell>
            <TableCell>{sale.productCategory}</TableCell>
            <TableCell>{sale.paymentMode}</TableCell>
            <TableCell>{sale.timestamp}</TableCell>
            <TableCell className="text-right">₹{sale.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
