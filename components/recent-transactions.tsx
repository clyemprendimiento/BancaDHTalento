import { ArrowDownLeft, Coffee, ShoppingCart, Smartphone, Zap } from "lucide-react"

interface RecentTransactionsProps {
  limit?: number
}

export function RecentTransactions({ limit }: RecentTransactionsProps) {
  const allTransactions = [
    {
      id: "t1",
      description: "Supermercado El Corte",
      amount: -125.5,
      date: "2023-04-15",
      category: "Compras",
      icon: ShoppingCart,
    },
    {
      id: "t2",
      description: "Depósito - Nómina",
      amount: 1850.0,
      date: "2023-04-14",
      category: "Ingreso",
      icon: ArrowDownLeft,
    },
    {
      id: "t3",
      description: "Café Buena Vista",
      amount: -8.75,
      date: "2023-04-13",
      category: "Restaurantes",
      icon: Coffee,
    },
    {
      id: "t4",
      description: "Factura Electricidad",
      amount: -65.2,
      date: "2023-04-10",
      category: "Servicios",
      icon: Zap,
    },
    {
      id: "t5",
      description: "Recarga Móvil",
      amount: -20.0,
      date: "2023-04-08",
      category: "Telecomunicaciones",
      icon: Smartphone,
    },
  ]

  // Limitar las transacciones si se especifica un límite
  const transactions = limit ? allTransactions.slice(0, limit) : allTransactions

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`rounded-full p-1.5 ${
                transaction.amount > 0
                  ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              <transaction.icon className="h-3 w-3" />
            </div>
            <div>
              <p className="text-xs font-medium">{transaction.description}</p>
              <p className="text-[10px] text-muted-foreground">
                {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className={`text-xs font-medium ${transaction.amount > 0 ? "text-green-600 dark:text-green-400" : ""}`}>
            {transaction.amount > 0 ? "+" : ""}
            {transaction.amount.toLocaleString("es-ES", {
              style: "currency",
              currency: "MXN",
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
