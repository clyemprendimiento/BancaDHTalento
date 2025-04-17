"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, RefreshCw, UserPlus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { RegisterBeneficiary } from "@/components/register-beneficiary"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function TransferForm() {
  const [transferType, setTransferType] = useState("own")
  const [amount, setAmount] = useState("")
  const [fromAccount, setFromAccount] = useState("")
  const [toAccount, setToAccount] = useState("")
  const [concept, setConcept] = useState("")
  const [transferStatus, setTransferStatus] = useState<"idle" | "success" | "error">("idle")
  const [trackingKey, setTrackingKey] = useState("")
  const [generateTrackingKey, setGenerateTrackingKey] = useState(true)
  const [numericReference, setNumericReference] = useState("")
  const [generateNumericReference, setGenerateNumericReference] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!amount || !fromAccount || !toAccount) {
      setTransferStatus("error")
      return
    }

    // Simulación de transferencia exitosa
    setTimeout(() => {
      setTransferStatus("success")
      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setAmount("")
        setConcept("")
        setTrackingKey("")
        setNumericReference("")
        setTransferStatus("idle")
      }, 3000)
    }, 1000)
  }

  // Generar clave de rastreo aleatoria
  const generateRandomTrackingKey = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 18; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  // Generar referencia numérica aleatoria
  const generateRandomNumericReference = () => {
    return Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(10, "0")
  }

  // Modificar el array ownAccounts para incluir la tarjeta de débito
  const ownAccounts = [
    { id: "savings", label: "Cuenta de Ahorro ****9012" },
    { id: "debit", label: "Tarjeta de Débito ****7890" },
  ]

  const savedBeneficiaries = [
    { id: "ben1", label: "Juan Pérez - Banco Nacional ****1234" },
    { id: "ben2", label: "María García - Banco Internacional ****5678" },
    { id: "ben3", label: "Empresa ABC - Banco Comercial ****9012" },
  ]

  // Función para manejar cuando se completa el registro de un beneficiario
  const handleBeneficiaryRegistered = () => {
    setIsRegisterModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="own" onValueChange={setTransferType}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="own">Cuentas Propias</TabsTrigger>
          <TabsTrigger value="third">Cuentas de Terceros</TabsTrigger>
        </TabsList>

        <TabsContent value="own">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from-account">Cuenta de Origen</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger id="from-account">
                  <SelectValue placeholder="Selecciona una cuenta" />
                </SelectTrigger>
                <SelectContent>
                  {ownAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-account">Cuenta de Destino</Label>
              <Select value={toAccount} onValueChange={setToAccount}>
                <SelectTrigger id="to-account">
                  <SelectValue placeholder="Selecciona una cuenta" />
                </SelectTrigger>
                <SelectContent>
                  {ownAccounts
                    .filter((account) => account.id !== fromAccount)
                    .map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Monto</Label>
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
              <Label htmlFor="concept">Concepto</Label>
              <Input
                id="concept"
                placeholder="Añade un concepto para este traspaso"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
              />
            </div>

            {transferStatus === "success" && (
              <Alert
                variant="default"
                className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
              >
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>¡Transferencia exitosa!</AlertTitle>
                <AlertDescription>Tu transferencia ha sido procesada correctamente.</AlertDescription>
              </Alert>
            )}

            {transferStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Por favor completa todos los campos requeridos.</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Transferir
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="third">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from-account-third">Cuenta de Origen</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger id="from-account-third">
                  <SelectValue placeholder="Selecciona una cuenta" />
                </SelectTrigger>
                <SelectContent>
                  {ownAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="beneficiary">Beneficiario</Label>
              <div className="flex gap-2">
                <Select value={toAccount} onValueChange={setToAccount} className="flex-1">
                  <SelectTrigger id="beneficiary">
                    <SelectValue placeholder="Selecciona un beneficiario" />
                  </SelectTrigger>
                  <SelectContent>
                    {savedBeneficiaries.map((beneficiary) => (
                      <SelectItem key={beneficiary.id} value={beneficiary.id}>
                        {beneficiary.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setIsRegisterModalOpen(true)}
                  title="Registrar nuevo beneficiario"
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount-third">Monto</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <Input
                  id="amount-third"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="concept-third">Concepto</Label>
              <Input
                id="concept-third"
                placeholder="Añade un concepto para esta transferencia"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="tracking-key">Clave de Rastreo</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="auto-generate" className="text-xs">
                    Generar automáticamente
                  </Label>
                  <Switch
                    id="auto-generate"
                    checked={generateTrackingKey}
                    onCheckedChange={(checked) => {
                      setGenerateTrackingKey(checked)
                      if (checked) {
                        setTrackingKey(generateRandomTrackingKey())
                      } else {
                        setTrackingKey("")
                      }
                    }}
                  />
                </div>
              </div>
              <div className="relative">
                <Input
                  id="tracking-key"
                  placeholder="Clave de rastreo"
                  value={generateTrackingKey ? trackingKey || generateRandomTrackingKey() : trackingKey}
                  onChange={(e) => setTrackingKey(e.target.value)}
                  disabled={generateTrackingKey}
                />
                {generateTrackingKey && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setTrackingKey(generateRandomTrackingKey())}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="numeric-reference">Referencia Numérica</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="auto-generate-ref" className="text-xs">
                    Generar automáticamente
                  </Label>
                  <Switch
                    id="auto-generate-ref"
                    checked={generateNumericReference}
                    onCheckedChange={(checked) => {
                      setGenerateNumericReference(checked)
                      if (checked) {
                        setNumericReference(generateRandomNumericReference())
                      } else {
                        setNumericReference("")
                      }
                    }}
                  />
                </div>
              </div>
              <div className="relative">
                <Input
                  id="numeric-reference"
                  type="text"
                  placeholder="Referencia numérica (opcional)"
                  value={
                    generateNumericReference ? numericReference || generateRandomNumericReference() : numericReference
                  }
                  onChange={(e) => setNumericReference(e.target.value)}
                  disabled={generateNumericReference}
                />
                {generateNumericReference && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setNumericReference(generateRandomNumericReference())}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {transferStatus === "success" && (
              <Alert
                variant="default"
                className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
              >
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>¡Transferencia exitosa!</AlertTitle>
                <AlertDescription>Tu transferencia ha sido procesada correctamente.</AlertDescription>
              </Alert>
            )}

            {transferStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Por favor completa todos los campos requeridos.</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Transferir
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      {/* Modal para registrar beneficiario */}
      <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Registrar Nuevo Beneficiario</DialogTitle>
            <DialogDescription>Completa el formulario para agregar un nuevo beneficiario</DialogDescription>
          </DialogHeader>
          <RegisterBeneficiary onComplete={handleBeneficiaryRegistered} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
