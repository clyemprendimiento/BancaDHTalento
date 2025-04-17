"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, CreditCardIcon } from "lucide-react"

export function AccountSummary() {
  const [activeTab, setActiveTab] = useState("savings")

  const accounts = {
    savings: {
      number: "****9012",
      balance: 4329.5,
      currency: "MXN",
      transactions: 8,
    },
    credit: {
      number: "****3456",
      balance: 1250.0,
      limit: 5000.0,
      currency: "MXN",
      transactions: 14,
    },
    debit: {
      number: "****7890",
      balance: 2150.75,
      currency: "MXN",
      transactions: 22,
    },
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="savings" className="text-xs">
            Cuenta de Ahorro
          </TabsTrigger>
          <TabsTrigger value="debit" className="text-xs">
            Tarjeta de Débito
          </TabsTrigger>
          <TabsTrigger value="credit" className="text-xs">
            Tarjeta de Crédito
          </TabsTrigger>
        </TabsList>

        <TabsContent value="savings" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cuenta de Ahorro</p>
                    <p className="text-lg font-bold">$ {accounts.savings.balance.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Número: {accounts.savings.number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Transacciones este mes</p>
                  <p className="text-2xl font-bold">{accounts.savings.transactions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debit" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                    <CreditCardIcon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tarjeta de Débito</p>
                    <p className="text-lg font-bold">$ {accounts.debit.balance.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Número: {accounts.debit.number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Transacciones este mes</p>
                  <p className="text-2xl font-bold">{accounts.debit.transactions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credit" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                    <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tarjeta de Crédito</p>
                    <p className="text-lg font-bold">$ {accounts.credit.balance.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Número: {accounts.credit.number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Límite de Crédito</p>
                  <p className="text-2xl font-bold">$ {accounts.credit.limit.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    Disponible: $ {(accounts.credit.limit - accounts.credit.balance).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
