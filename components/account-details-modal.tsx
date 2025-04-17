"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowDownLeft, ArrowUpRight, Calendar, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
}

interface AccountDetailsModalProps {
  accountId: string
  accountName: string
  accountNumber: string
  accountType: "savings" | "debit" | "credit"
}

export function AccountDetailsModal({ accountId, accountName, accountNumber, accountType }: AccountDetailsModalProps) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Generar transacciones de ejemplo
  const generateTransactions = (): Transaction[] => {
    const categories = [
      "Compras",
      "Restaurantes",
      "Transporte",
      "Servicios",
      "Entretenimiento",
      "Salud",
      "Educación",
      "Transferencias",
    ]

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

    const transactions: Transaction[] = []

    // Generar 20 transacciones aleatorias
    for (let i = 0; i < 20; i++) {
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 30))

      const isIncome = Math.random() > 0.7 // 30% de probabilidad de ser un ingreso
      const amount = isIncome ? Math.floor(Math.random() * 1500) + 500 : -(Math.floor(Math.random() * 500) + 50)

      transactions.push({
        id: `t${i}`,
        date: date.toISOString().split("T")[0],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        amount: amount,
        type: isIncome ? "income" : "expense",
        category: categories[Math.floor(Math.random() * categories.length)],
      })
    }

    // Ordenar por fecha (más reciente primero)
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const transactions = generateTransactions()

  // Filtrar transacciones
  const filteredTransactions = transactions.filter((transaction) => {
    // Filtro por fecha
    if (startDate && new Date(transaction.date) < new Date(startDate)) return false
    if (endDate && new Date(transaction.date) > new Date(endDate)) return false

    // Filtro por categoría
    if (categoryFilter !== "all" && transaction.category !== categoryFilter) return false

    // Filtro por búsqueda
    if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) return false

    return true
  })

  // Calcular totales
  const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  // Obtener categorías únicas para el filtro
  const uniqueCategories = Array.from(new Set(transactions.map((t) => t.category)))

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold">{accountName}</h3>
          <p className="text-sm text-muted-foreground">Número: {accountNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-green-600">
            <ArrowDownLeft className="h-4 w-4" />
            <span className="text-sm font-medium">$ {totalIncome.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-red-600">
            <ArrowUpRight className="h-4 w-4" />
            <span className="text-sm font-medium">$ {totalExpense.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-xs">
                Fecha Inicio
              </Label>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input
                  id="start-date"
                  type="date"
                  className="h-8 text-xs"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-xs">
                Fecha Fin
              </Label>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input
                  id="end-date"
                  type="date"
                  className="h-8 text-xs"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-xs">
                Categoría
              </Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category" className="h-8 text-xs">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="search" className="text-xs">
                Buscar
              </Label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Buscar transacciones..."
                  className="pl-8 h-8 text-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => {
                setStartDate("")
                setEndDate("")
                setSearchTerm("")
                setCategoryFilter("all")
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-xs">Fecha</TableHead>
              <TableHead className="text-xs">Descripción</TableHead>
              <TableHead className="text-xs">Categoría</TableHead>
              <TableHead className="text-right text-xs">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-xs">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-xs">{transaction.description}</TableCell>
                  <TableCell className="text-xs">{transaction.category}</TableCell>
                  <TableCell
                    className={`text-right text-xs ${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}$ {Math.abs(transaction.amount).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-sm text-muted-foreground">
                  No se encontraron transacciones con los filtros seleccionados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
