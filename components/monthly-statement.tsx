"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowDownLeft, ArrowUpRight, Download, FileText } from "lucide-react"

export function MonthlyStatement() {
  const [selectedMonth, setSelectedMonth] = useState("04")
  const [selectedYear, setSelectedYear] = useState("2023")

  // Datos de ejemplo para el estado de cuenta
  const months = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ]

  const years = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ]

  // Generar transacciones de ejemplo basadas en el mes seleccionado
  const generateTransactions = (month: string, year: string) => {
    const daysInMonth = new Date(Number.parseInt(year), Number.parseInt(month), 0).getDate()
    const transactions = []

    // Saldo inicial
    transactions.push({
      id: "initial",
      date: `${year}-${month}-01`,
      description: "Saldo Inicial",
      amount: 3500.0,
      type: "balance",
    })

    // Transacciones aleatorias
    const descriptions = [
      "Supermercado El Corte",
      "Café Buena Vista",
      "Farmacia San Pablo",
      "Cine Cinemex",
      "Restaurante La Parrilla",
      "Tienda de Ropa Fashion",
      "Gasolinera Shell",
      "Librería Gandhi",
      "Depósito - Nómina",
      "Transferencia recibida",
      "Pago de servicios",
      "Netflix",
      "Spotify",
      "Amazon Prime",
      "Uber",
      "DiDi",
    ]

    // Generar entre 10-15 transacciones aleatorias
    const numTransactions = Math.floor(Math.random() * 6) + 10
    for (let i = 0; i < numTransactions; i++) {
      const day = Math.floor(Math.random() * daysInMonth) + 1
      const dayFormatted = day < 10 ? `0${day}` : `${day}`
      const isIncome = Math.random() > 0.7 // 30% de probabilidad de ser un ingreso
      const amount = isIncome ? Math.floor(Math.random() * 1500) + 500 : -(Math.floor(Math.random() * 500) + 50)

      transactions.push({
        id: `t${i}`,
        date: `${year}-${month}-${dayFormatted}`,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        amount: amount,
        type: isIncome ? "income" : "expense",
      })
    }

    // Ordenar por fecha
    transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Saldo final (calculado)
    const finalBalance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
    transactions.push({
      id: "final",
      date: `${year}-${month}-${daysInMonth}`,
      description: "Saldo Final",
      amount: finalBalance,
      type: "balance",
    })

    return transactions
  }

  const transactions = generateTransactions(selectedMonth, selectedYear)

  // Calcular totales
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Estado de Cuenta:</span>
          </div>
          <div className="flex gap-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[110px] h-8 text-xs">
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value} className="text-xs">
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[90px] h-8 text-xs">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value} className="text-xs">
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-xs h-8">
          <Download className="h-3 w-3 mr-1" /> Descargar PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-sm">Saldo Inicial</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">$ {transactions[0].amount.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-sm">Ingresos</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <ArrowDownLeft className="h-4 w-4 text-green-500" />
            <p className="text-lg font-bold text-green-600">$ {totalIncome.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-sm">Gastos</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-red-500" />
            <p className="text-lg font-bold text-red-600">$ {totalExpense.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm">Detalle de Movimientos</CardTitle>
          <CardDescription className="text-xs">
            {months.find((m) => m.value === selectedMonth)?.label} {selectedYear}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[400px] overflow-auto">
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0">
                <TableRow>
                  <TableHead className="w-[100px] text-xs">Fecha</TableHead>
                  <TableHead className="text-xs">Descripción</TableHead>
                  <TableHead className="text-right text-xs">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className={transaction.type === "balance" ? "bg-muted/30 font-medium" : ""}
                  >
                    <TableCell className="text-xs">{new Date(transaction.date).toLocaleDateString("es-ES")}</TableCell>
                    <TableCell className="text-xs">{transaction.description}</TableCell>
                    <TableCell
                      className={`text-right text-xs ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : transaction.type === "expense"
                            ? "text-red-600"
                            : ""
                      }`}
                    >
                      {transaction.amount > 0 && transaction.type !== "balance" ? "+" : ""}${" "}
                      {transaction.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between py-3 border-t">
          <p className="text-sm font-medium">Saldo Final</p>
          <p className="text-sm font-bold">$ {transactions[transactions.length - 1].amount.toLocaleString()}</p>
        </CardFooter>
      </Card>
    </div>
  )
}
