"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Clock, DollarSign, PiggyBank, Wallet } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Tipos para las inversiones
interface Investment {
  id: string
  amount: number
  term: number // en días
  rate: number // tasa anual
  startDate: string
  endDate: string
  status: "active" | "pending" | "completed" | "withdrawn"
  interest: number
  totalReturn: number
}

export function Investments() {
  const [activeTab, setActiveTab] = useState("my-investments")
  const [amount, setAmount] = useState("")
  const [term, setTerm] = useState("90")
  const [investmentStatus, setInvestmentStatus] = useState<"idle" | "success" | "error">("idle")
  const [showActiveInvestments, setShowActiveInvestments] = useState(false)
  const [showCompletedInvestments, setShowCompletedInvestments] = useState(false)

  // Estado para las inversiones
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "inv1",
      amount: 10000,
      term: 90,
      rate: 8.5,
      startDate: "2023-01-15",
      endDate: "2023-04-15",
      status: "completed",
      interest: 210.27,
      totalReturn: 10210.27,
    },
    {
      id: "inv2",
      amount: 25000,
      term: 180,
      rate: 9.2,
      startDate: "2023-02-20",
      endDate: "2023-08-19",
      status: "active",
      interest: 1136.99,
      totalReturn: 26136.99,
    },
    {
      id: "inv3",
      amount: 5000,
      term: 30,
      rate: 7.8,
      startDate: "2023-03-10",
      endDate: "2023-04-09",
      status: "withdrawn",
      interest: 32.05,
      totalReturn: 5032.05,
    },
    {
      id: "inv4",
      amount: 15000,
      term: 360,
      rate: 10.5,
      startDate: "2023-04-01",
      endDate: "2024-03-26",
      status: "active",
      interest: 1575.0,
      totalReturn: 16575.0,
    },
  ])

  // Calcular el interés estimado
  const calculateInterest = (amount: number, term: number, rate: number) => {
    return (amount * (rate / 100) * (term / 360)).toFixed(2)
  }

  // Manejar la creación de una nueva inversión
  const handleCreateInvestment = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!amount || Number.parseFloat(amount) <= 0) {
      setInvestmentStatus("error")
      return
    }

    const amountValue = Number.parseFloat(amount)
    const termValue = Number.parseInt(term)
    const rateValue = getRate(termValue)

    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + termValue)

    const interest = Number.parseFloat(calculateInterest(amountValue, termValue, rateValue))
    const totalReturn = amountValue + interest

    // Crear nueva inversión
    const newInvestment: Investment = {
      id: `inv${investments.length + 1}`,
      amount: amountValue,
      term: termValue,
      rate: rateValue,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      status: "pending",
      interest,
      totalReturn,
    }

    // Agregar la nueva inversión
    setInvestments([...investments, newInvestment])
    setInvestmentStatus("success")

    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
      setAmount("")
      setInvestmentStatus("idle")
    }, 3000)
  }

  // Obtener la tasa según el plazo
  const getRate = (term: number) => {
    if (term <= 30) return 7.8
    if (term <= 90) return 8.5
    if (term <= 180) return 9.2
    return 10.5
  }

  // Manejar el retiro de una inversión
  const handleWithdraw = (id: string) => {
    setInvestments(investments.map((inv) => (inv.id === id ? { ...inv, status: "withdrawn" as const } : inv)))
  }

  // Filtrar inversiones activas y completadas
  const activeInvestments = investments.filter((inv) => inv.status === "active" || inv.status === "pending")
  const completedInvestments = investments.filter((inv) => inv.status === "completed" || inv.status === "withdrawn")

  // Calcular totales
  const totalInvested = activeInvestments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalInterest = activeInvestments.reduce((sum, inv) => sum + inv.interest, 0)
  const totalReturn = activeInvestments.reduce((sum, inv) => sum + inv.totalReturn, 0)

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-investments">Mis Inversiones</TabsTrigger>
          <TabsTrigger value="new-investment">Nueva Inversión</TabsTrigger>
        </TabsList>

        <TabsContent value="my-investments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Capital Invertido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <PiggyBank className="mr-2 h-4 w-4 text-green-600" />
                  <span className="text-2xl font-bold">$ {totalInvested.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Interés Estimado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-blue-600" />
                  <span className="text-2xl font-bold">$ {totalInterest.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Retorno Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-2xl font-bold">$ {totalReturn.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inversiones Activas</CardTitle>
              <CardDescription>Inversiones a plazo fijo actualmente en curso</CardDescription>
            </CardHeader>
            <CardContent>
              {activeInvestments.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Monto</TableHead>
                        <TableHead>Plazo</TableHead>
                        <TableHead>Tasa</TableHead>
                        <TableHead>Fecha Inicio</TableHead>
                        <TableHead>Vencimiento</TableHead>
                        <TableHead>Interés</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeInvestments.map((investment) => (
                        <TableRow key={investment.id}>
                          <TableCell className="font-medium">$ {investment.amount.toLocaleString()}</TableCell>
                          <TableCell>{investment.term} días</TableCell>
                          <TableCell>{investment.rate}%</TableCell>
                          <TableCell>{formatDate(investment.startDate)}</TableCell>
                          <TableCell>{formatDate(investment.endDate)}</TableCell>
                          <TableCell>$ {investment.interest.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                investment.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              }
                            >
                              {investment.status === "active" ? "Activa" : "Pendiente"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={investment.status === "pending" || new Date(investment.endDate) > new Date()}
                              onClick={() => handleWithdraw(investment.id)}
                            >
                              Retirar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <PiggyBank className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-sm font-medium">No tienes inversiones activas</p>
                  <p className="text-sm text-muted-foreground">
                    Crea una nueva inversión para comenzar a generar rendimientos
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Inversiones</CardTitle>
              <CardDescription>Inversiones completadas o retiradas</CardDescription>
            </CardHeader>
            <CardContent>
              {completedInvestments.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Monto</TableHead>
                        <TableHead>Plazo</TableHead>
                        <TableHead>Tasa</TableHead>
                        <TableHead>Fecha Inicio</TableHead>
                        <TableHead>Vencimiento</TableHead>
                        <TableHead>Interés</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedInvestments.map((investment) => (
                        <TableRow key={investment.id}>
                          <TableCell className="font-medium">$ {investment.amount.toLocaleString()}</TableCell>
                          <TableCell>{investment.term} días</TableCell>
                          <TableCell>{investment.rate}%</TableCell>
                          <TableCell>{formatDate(investment.startDate)}</TableCell>
                          <TableCell>{formatDate(investment.endDate)}</TableCell>
                          <TableCell>$ {investment.interest.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                investment.status === "completed"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              }
                            >
                              {investment.status === "completed" ? "Completada" : "Retirada"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-sm font-medium">No tienes inversiones completadas</p>
                  <p className="text-sm text-muted-foreground">Tu historial de inversiones aparecerá aquí</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-investment">
          <Card>
            <CardHeader>
              <CardTitle>Crear Nueva Inversión</CardTitle>
              <CardDescription>Invierte tu dinero y genera rendimientos</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateInvestment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Monto a Invertir</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="term">Plazo</Label>
                  <Select value={term} onValueChange={setTerm}>
                    <SelectTrigger id="term">
                      <SelectValue placeholder="Selecciona un plazo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 días - 7.8% anual</SelectItem>
                      <SelectItem value="90">90 días - 8.5% anual</SelectItem>
                      <SelectItem value="180">180 días - 9.2% anual</SelectItem>
                      <SelectItem value="360">360 días - 10.5% anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Resumen de la Inversión</Label>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Monto:</span>
                        <span className="font-medium">
                          $ {amount ? Number.parseFloat(amount).toLocaleString() : "0.00"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Plazo:</span>
                        <span className="font-medium">{term} días</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Tasa anual:</span>
                        <span className="font-medium">{getRate(Number.parseInt(term))}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Fecha de inicio:</span>
                        <span className="font-medium">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Fecha de vencimiento:</span>
                        <span className="font-medium">
                          {new Date(
                            new Date().setDate(new Date().getDate() + Number.parseInt(term)),
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Interés estimado:</span>
                          <span className="font-medium text-green-600">
                            ${" "}
                            {amount
                              ? calculateInterest(
                                  Number.parseFloat(amount),
                                  Number.parseInt(term),
                                  getRate(Number.parseInt(term)),
                                )
                              : "0.00"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Total al vencimiento:</span>
                          <span className="font-bold">
                            ${" "}
                            {amount
                              ? (
                                  Number.parseFloat(amount) +
                                  Number.parseFloat(
                                    calculateInterest(
                                      Number.parseFloat(amount),
                                      Number.parseInt(term),
                                      getRate(Number.parseInt(term)),
                                    ),
                                  )
                                ).toLocaleString()
                              : "0.00"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {investmentStatus === "success" && (
                  <Alert
                    variant="default"
                    className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>¡Inversión creada con éxito!</AlertTitle>
                    <AlertDescription>Tu inversión ha sido registrada correctamente.</AlertDescription>
                  </Alert>
                )}

                {investmentStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Por favor ingresa un monto válido para tu inversión.</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full">
                  <PiggyBank className="mr-2 h-4 w-4" /> Crear Inversión
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
