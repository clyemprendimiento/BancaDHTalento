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
import { AlertCircle, Calendar, CheckCircle2, CreditCard, DollarSign, FileText, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Tipos para los créditos
interface Loan {
  id: string
  type: "personal" | "auto" | "mortgage" | "business"
  amount: number
  term: number // en meses
  rate: number // tasa anual
  startDate: string
  endDate: string
  status: "active" | "pending" | "paid"
  monthlyPayment: number
  remainingAmount: number
  nextPaymentDate: string
  progress: number // porcentaje pagado
}

export function Loans() {
  const [activeTab, setActiveTab] = useState("my-loans")
  const [amount, setAmount] = useState("")
  const [term, setTerm] = useState("12")
  const [loanType, setLoanType] = useState("personal")
  const [loanStatus, setLoanStatus] = useState<"idle" | "success" | "error">("idle")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
  const [showActiveLoans, setShowActiveLoans] = useState(false)
  const [showLoanHistory, setShowLoanHistory] = useState(false)

  // Estado para los créditos
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: "loan1",
      type: "personal",
      amount: 50000,
      term: 24,
      rate: 16.5,
      startDate: "2023-01-10",
      endDate: "2025-01-10",
      status: "active",
      monthlyPayment: 2458.33,
      remainingAmount: 35000,
      nextPaymentDate: "2023-05-10",
      progress: 30,
    },
    {
      id: "loan2",
      type: "auto",
      amount: 200000,
      term: 48,
      rate: 12.8,
      startDate: "2022-06-15",
      endDate: "2026-06-15",
      status: "active",
      monthlyPayment: 5277.78,
      remainingAmount: 160000,
      nextPaymentDate: "2023-05-15",
      progress: 20,
    },
    {
      id: "loan3",
      type: "personal",
      amount: 15000,
      term: 12,
      rate: 18.9,
      startDate: "2022-10-05",
      endDate: "2023-10-05",
      status: "active",
      monthlyPayment: 1375.0,
      remainingAmount: 6875,
      nextPaymentDate: "2023-05-05",
      progress: 55,
    },
  ])

  // Obtener la tasa según el tipo de préstamo y plazo
  const getRate = (type: string, term: number) => {
    switch (type) {
      case "personal":
        return term <= 12 ? 18.9 : 16.5
      case "auto":
        return term <= 36 ? 14.5 : 12.8
      case "mortgage":
        return term <= 180 ? 10.5 : 9.8
      case "business":
        return term <= 24 ? 15.5 : 14.2
      default:
        return 16.5
    }
  }

  // Calcular el pago mensual
  const calculateMonthlyPayment = (amount: number, term: number, rate: number) => {
    const monthlyRate = rate / 100 / 12
    return (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
  }

  // Manejar la solicitud de un nuevo crédito
  const handleRequestLoan = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!amount || Number.parseFloat(amount) <= 0) {
      setLoanStatus("error")
      return
    }

    const amountValue = Number.parseFloat(amount)
    const termValue = Number.parseInt(term)
    const rateValue = getRate(loanType, termValue)

    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + termValue)

    const monthlyPayment = calculateMonthlyPayment(amountValue, termValue, rateValue)

    // Crear nuevo crédito
    const newLoan: Loan = {
      id: `loan${loans.length + 1}`,
      type: loanType as "personal" | "auto" | "mortgage" | "business",
      amount: amountValue,
      term: termValue,
      rate: rateValue,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      status: "pending",
      monthlyPayment,
      remainingAmount: amountValue,
      nextPaymentDate: new Date(startDate.setMonth(startDate.getMonth() + 1)).toISOString().split("T")[0],
      progress: 0,
    }

    // Agregar el nuevo crédito
    setLoans([...loans, newLoan])
    setLoanStatus("success")

    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
      setAmount("")
      setLoanStatus("idle")
    }, 3000)
  }

  // Manejar el pago de un crédito
  const handlePayLoan = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!paymentAmount || Number.parseFloat(paymentAmount) <= 0 || !selectedLoanId) {
      setPaymentStatus("error")
      return
    }

    const paymentValue = Number.parseFloat(paymentAmount)

    // Actualizar el crédito
    setLoans(
      loans.map((loan) => {
        if (loan.id === selectedLoanId) {
          const newRemainingAmount = Math.max(0, loan.remainingAmount - paymentValue)
          const newProgress = ((loan.amount - newRemainingAmount) / loan.amount) * 100
          const newStatus = newRemainingAmount === 0 ? ("paid" as const) : loan.status

          // Actualizar fecha del próximo pago
          const nextPaymentDate = new Date(loan.nextPaymentDate)
          nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1)

          return {
            ...loan,
            remainingAmount: newRemainingAmount,
            progress: newProgress,
            status: newStatus,
            nextPaymentDate:
              newRemainingAmount === 0 ? loan.nextPaymentDate : nextPaymentDate.toISOString().split("T")[0],
          }
        }
        return loan
      }),
    )

    setPaymentStatus("success")

    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
      setPaymentAmount("")
      setSelectedLoanId(null)
      setPaymentStatus("idle")
    }, 3000)
  }

  // Filtrar créditos activos y pagados
  const activeLoans = loans.filter((loan) => loan.status === "active" || loan.status === "pending")
  const paidLoans = loans.filter((loan) => loan.status === "paid")

  // Calcular totales
  const totalDebt = activeLoans.reduce((sum, loan) => sum + loan.remainingAmount, 0)
  const totalMonthlyPayment = activeLoans.reduce((sum, loan) => sum + loan.monthlyPayment, 0)

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Obtener el nombre del tipo de préstamo
  const getLoanTypeName = (type: string) => {
    switch (type) {
      case "personal":
        return "Personal"
      case "auto":
        return "Automotriz"
      case "mortgage":
        return "Hipotecario"
      case "business":
        return "Empresarial"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-loans">Mis Créditos</TabsTrigger>
          <TabsTrigger value="request-loan">Solicitar Crédito</TabsTrigger>
          <TabsTrigger value="pay-loan">Realizar Pago</TabsTrigger>
        </TabsList>

        <TabsContent value="my-loans" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Deuda Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-red-600" />
                  <span className="text-2xl font-bold">$ {totalDebt.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pago Mensual Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                  <span className="text-2xl font-bold">$ {totalMonthlyPayment.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Créditos Activos</CardTitle>
              <CardDescription>Créditos que estás pagando actualmente</CardDescription>
            </CardHeader>
            <CardContent>
              {activeLoans.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="w-[120px]">Monto</TableHead>
                        <TableHead>Tasa</TableHead>
                        <TableHead>Pago Mensual</TableHead>
                        <TableHead>Próximo Pago</TableHead>
                        <TableHead>Restante</TableHead>
                        <TableHead>Progreso</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeLoans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{getLoanTypeName(loan.type)}</TableCell>
                          <TableCell>$ {loan.amount.toLocaleString()}</TableCell>
                          <TableCell>{loan.rate}%</TableCell>
                          <TableCell>$ {loan.monthlyPayment.toLocaleString()}</TableCell>
                          <TableCell>{formatDate(loan.nextPaymentDate)}</TableCell>
                          <TableCell>$ {loan.remainingAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={loan.progress} className="h-2" />
                              <span className="text-xs">{Math.round(loan.progress)}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                loan.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              }
                            >
                              {loan.status === "active" ? "Activo" : "Pendiente"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-sm font-medium">No tienes créditos activos</p>
                  <p className="text-sm text-muted-foreground">Solicita un nuevo crédito para comenzar</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Créditos</CardTitle>
              <CardDescription>Créditos que has pagado completamente</CardDescription>
            </CardHeader>
            <CardContent>
              {paidLoans.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="w-[120px]">Monto</TableHead>
                        <TableHead>Tasa</TableHead>
                        <TableHead>Fecha Inicio</TableHead>
                        <TableHead>Fecha Fin</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paidLoans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{getLoanTypeName(loan.type)}</TableCell>
                          <TableCell>$ {loan.amount.toLocaleString()}</TableCell>
                          <TableCell>{loan.rate}%</TableCell>
                          <TableCell>{formatDate(loan.startDate)}</TableCell>
                          <TableCell>{formatDate(loan.endDate)}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            >
                              Pagado
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-sm font-medium">No tienes créditos pagados</p>
                  <p className="text-sm text-muted-foreground">Tu historial de créditos aparecerá aquí</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="request-loan">
          <Card>
            <CardHeader>
              <CardTitle>Solicitar Nuevo Crédito</CardTitle>
              <CardDescription>Completa el formulario para solicitar un crédito</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRequestLoan} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loan-type">Tipo de Crédito</Label>
                  <Select value={loanType} onValueChange={setLoanType}>
                    <SelectTrigger id="loan-type">
                      <SelectValue placeholder="Selecciona un tipo de crédito" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Crédito Personal</SelectItem>
                      <SelectItem value="auto">Crédito Automotriz</SelectItem>
                      <SelectItem value="mortgage">Crédito Hipotecario</SelectItem>
                      <SelectItem value="business">Crédito Empresarial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loan-amount">Monto del Crédito</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <Input
                      id="loan-amount"
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loan-term">Plazo (meses)</Label>
                  <Select value={term} onValueChange={setTerm}>
                    <SelectTrigger id="loan-term">
                      <SelectValue placeholder="Selecciona un plazo" />
                    </SelectTrigger>
                    <SelectContent>
                      {loanType === "personal" && (
                        <>
                          <SelectItem value="12">12 meses</SelectItem>
                          <SelectItem value="24">24 meses</SelectItem>
                          <SelectItem value="36">36 meses</SelectItem>
                        </>
                      )}
                      {loanType === "auto" && (
                        <>
                          <SelectItem value="24">24 meses</SelectItem>
                          <SelectItem value="36">36 meses</SelectItem>
                          <SelectItem value="48">48 meses</SelectItem>
                          <SelectItem value="60">60 meses</SelectItem>
                        </>
                      )}
                      {loanType === "mortgage" && (
                        <>
                          <SelectItem value="120">10 años (120 meses)</SelectItem>
                          <SelectItem value="180">15 años (180 meses)</SelectItem>
                          <SelectItem value="240">20 años (240 meses)</SelectItem>
                        </>
                      )}
                      {loanType === "business" && (
                        <>
                          <SelectItem value="12">12 meses</SelectItem>
                          <SelectItem value="24">24 meses</SelectItem>
                          <SelectItem value="36">36 meses</SelectItem>
                          <SelectItem value="48">48 meses</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Resumen del Crédito</Label>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Tipo de Crédito:</span>
                        <span className="font-medium">{getLoanTypeName(loanType)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Monto:</span>
                        <span className="font-medium">
                          $ {amount ? Number.parseFloat(amount).toLocaleString() : "0.00"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Plazo:</span>
                        <span className="font-medium">{term} meses</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Tasa anual:</span>
                        <span className="font-medium">{getRate(loanType, Number.parseInt(term))}%</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Pago mensual estimado:</span>
                          <span className="font-bold">
                            ${" "}
                            {amount && Number.parseFloat(amount) > 0
                              ? calculateMonthlyPayment(
                                  Number.parseFloat(amount),
                                  Number.parseInt(term),
                                  getRate(loanType, Number.parseInt(term)),
                                ).toLocaleString(undefined, { maximumFractionDigits: 2 })
                              : "0.00"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {loanStatus === "success" && (
                  <Alert
                    variant="default"
                    className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>¡Solicitud enviada con éxito!</AlertTitle>
                    <AlertDescription>Tu solicitud de crédito está siendo procesada.</AlertDescription>
                  </Alert>
                )}

                {loanStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Por favor completa todos los campos requeridos.</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Solicitar Crédito
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pay-loan">
          <Card>
            <CardHeader>
              <CardTitle>Realizar Pago a Crédito</CardTitle>
              <CardDescription>Abona a tus créditos activos</CardDescription>
            </CardHeader>
            <CardContent>
              {activeLoans.length > 0 ? (
                <form onSubmit={handlePayLoan} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loan-select">Selecciona un Crédito</Label>
                    <Select value={selectedLoanId || ""} onValueChange={setSelectedLoanId}>
                      <SelectTrigger id="loan-select">
                        <SelectValue placeholder="Selecciona un crédito" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeLoans.map((loan) => (
                          <SelectItem key={loan.id} value={loan.id}>
                            {getLoanTypeName(loan.type)} - $ {loan.remainingAmount.toLocaleString()} restante
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedLoanId && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="source-account">Cuenta de Origen</Label>
                        <Select defaultValue="savings1">
                          <SelectTrigger id="source-account">
                            <SelectValue placeholder="Selecciona una cuenta" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="savings1">Cuenta de Ahorro Principal - $4,329.50</SelectItem>
                            <SelectItem value="savings2">Cuenta de Ahorro Vacaciones - $1,250.75</SelectItem>
                            <SelectItem value="debit1">Tarjeta de Débito - $2,150.75</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="payment-amount">Monto a Pagar</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                          <Input
                            id="payment-amount"
                            type="number"
                            placeholder="0.00"
                            className="pl-8"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Información del Crédito</Label>
                        <Card>
                          <CardContent className="p-4 space-y-2">
                            {activeLoans
                              .filter((loan) => loan.id === selectedLoanId)
                              .map((loan) => (
                                <div key={loan.id} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Tipo de Crédito:</span>
                                    <span className="font-medium">{getLoanTypeName(loan.type)}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Monto Original:</span>
                                    <span className="font-medium">$ {loan.amount.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Saldo Pendiente:</span>
                                    <span className="font-medium">$ {loan.remainingAmount.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Pago Mensual:</span>
                                    <span className="font-medium">$ {loan.monthlyPayment.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Próximo Pago:</span>
                                    <span className="font-medium">{formatDate(loan.nextPaymentDate)}</span>
                                  </div>
                                  <div className="pt-2">
                                    <Label className="text-xs">Progreso del Pago</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Progress value={loan.progress} className="h-2" />
                                      <span className="text-xs">{Math.round(loan.progress)}%</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}

                  {paymentStatus === "success" && (
                    <Alert
                      variant="default"
                      className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>¡Pago realizado con éxito!</AlertTitle>
                      <AlertDescription>Tu pago ha sido procesado correctamente.</AlertDescription>
                    </Alert>
                  )}

                  {paymentStatus === "error" && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>Por favor completa todos los campos requeridos.</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={!selectedLoanId || !paymentAmount}>
                    <DollarSign className="mr-2 h-4 w-4" /> Realizar Pago
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-sm font-medium">No tienes créditos activos</p>
                  <p className="text-sm text-muted-foreground">Solicita un nuevo crédito para comenzar</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
