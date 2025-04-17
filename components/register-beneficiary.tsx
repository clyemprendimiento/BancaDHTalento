"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RegisterBeneficiaryProps {
  onComplete: () => void
}

export function RegisterBeneficiary({ onComplete }: RegisterBeneficiaryProps) {
  const [alias, setAlias] = useState("")
  const [idType, setIdType] = useState("rfc")
  const [idValue, setIdValue] = useState("")
  const [accountType, setAccountType] = useState("clabe")
  const [accountNumber, setAccountNumber] = useState("")
  const [bank, setBank] = useState("")
  const [email, setEmail] = useState("")
  const [registerStatus, setRegisterStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!alias || !idValue || !accountNumber || !bank) {
      setRegisterStatus("error")
      return
    }

    // Validación específica por tipo de cuenta
    if (accountType === "clabe" && accountNumber.length !== 18) {
      setRegisterStatus("error")
      return
    }

    if (accountType === "card" && accountNumber.length !== 16) {
      setRegisterStatus("error")
      return
    }

    if (accountType === "phone" && accountNumber.length !== 10) {
      setRegisterStatus("error")
      return
    }

    // Simulación de registro exitoso
    setTimeout(() => {
      setRegisterStatus("success")
      // Resetear el formulario después de 2 segundos y cerrar el modal
      setTimeout(() => {
        setAlias("")
        setIdValue("")
        setAccountNumber("")
        setBank("")
        setEmail("")
        setRegisterStatus("idle")
        onComplete()
      }, 2000)
    }, 1000)
  }

  // Lista de bancos
  const banks = [
    { id: "bank1", name: "Banco Nacional" },
    { id: "bank2", name: "Banco Internacional" },
    { id: "bank3", name: "Banco Comercial" },
    { id: "bank4", name: "Banco del Bienestar" },
    { id: "bank5", name: "BBVA" },
    { id: "bank6", name: "Santander" },
    { id: "bank7", name: "Citibanamex" },
    { id: "bank8", name: "HSBC" },
    { id: "bank9", name: "Scotiabank" },
    { id: "bank10", name: "Banorte" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="alias">Alias del Beneficiario</Label>
        <Input
          id="alias"
          placeholder="Ej: Juan Pérez - Nómina"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">Este nombre se mostrará en tu lista de beneficiarios</p>
      </div>

      <div className="space-y-2">
        <Label>Tipo de Identificación</Label>
        <RadioGroup value={idType} onValueChange={setIdType} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rfc" id="rfc" />
            <Label htmlFor="rfc" className="cursor-pointer">
              RFC
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="curp" id="curp" />
            <Label htmlFor="curp" className="cursor-pointer">
              CURP
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="id-value">{idType.toUpperCase()}</Label>
        <Input
          id="id-value"
          placeholder={idType === "rfc" ? "Ej: XAXX010101000" : "Ej: BADD110313HCMLNS09"}
          value={idValue}
          onChange={(e) => setIdValue(e.target.value)}
          maxLength={idType === "rfc" ? 13 : 18}
        />
      </div>

      <div className="space-y-2">
        <Label>Tipo de Cuenta</Label>
        <Select value={accountType} onValueChange={setAccountType}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un tipo de cuenta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clabe">CLABE (18 dígitos)</SelectItem>
            <SelectItem value="card">Tarjeta (16 dígitos)</SelectItem>
            <SelectItem value="phone">Número Celular (10 dígitos)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="account-number">
          {accountType === "clabe"
            ? "CLABE Interbancaria"
            : accountType === "card"
              ? "Número de Tarjeta"
              : "Número de Celular"}
        </Label>
        <Input
          id="account-number"
          placeholder={accountType === "clabe" ? "18 dígitos" : accountType === "card" ? "16 dígitos" : "10 dígitos"}
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
          maxLength={accountType === "clabe" ? 18 : accountType === "card" ? 16 : 10}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bank">Banco</Label>
        <Select value={bank} onValueChange={setBank}>
          <SelectTrigger id="bank">
            <SelectValue placeholder="Selecciona un banco" />
          </SelectTrigger>
          <SelectContent>
            {banks.map((bank) => (
              <SelectItem key={bank.id} value={bank.id}>
                {bank.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico (opcional)</Label>
        <Input
          id="email"
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Se enviará una notificación a este correo cuando realices transferencias
        </p>
      </div>

      {registerStatus === "success" && (
        <Alert
          variant="default"
          className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
        >
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>¡Beneficiario registrado con éxito!</AlertTitle>
          <AlertDescription>El beneficiario ha sido agregado a tu lista.</AlertDescription>
        </Alert>
      )}

      {registerStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Por favor completa todos los campos requeridos y verifica que el formato sea correcto.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onComplete}>
          Cancelar
        </Button>
        <Button type="submit">Registrar Beneficiario</Button>
      </div>
    </form>
  )
}
