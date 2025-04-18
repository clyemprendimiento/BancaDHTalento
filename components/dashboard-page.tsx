"use client"

import { useState, useEffect } from "react"
import {
  CreditCard,
  DollarSign,
  Home,
  PieChart,
  Settings,
  User,
  LogOut,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  ChevronRight,
  PiggyBank,
  FileText,
  Menu,
  X,
  ChevronLeft,
  ChevronRightIcon,
  BanknoteIcon,
  Bell,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountSummary } from "@/components/account-summary"
import { RecentTransactions } from "@/components/recent-transactions"
import { TransferForm } from "@/components/transfer-form"
import { AccountSettings } from "@/components/account-settings"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/ui/logo"
import { MonthlyStatement } from "@/components/monthly-statement"
import { UserProfile } from "@/components/user-profile"
import { Investments } from "@/components/investments"
import { Loans } from "@/components/loans"
import { Documents } from "@/components/documents"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NotificationHistory } from "@/components/notification-history"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AccountDetailsModal } from "@/components/account-details-modal"

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [menuOpen, setMenuOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setMenuOpen(false)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Datos de ejemplo para cuentas y tarjetas activas
  const activeAccounts = [
    {
      id: "savings1",
      type: "savings",
      name: "Cuenta de Ahorro Principal",
      number: "****9012",
      balance: 4329.5,
      currency: "MXN",
      status: "active",
    },
    {
      id: "savings2",
      type: "savings",
      name: "Cuenta de Ahorro Vacaciones",
      number: "****5678",
      balance: 1250.75,
      currency: "MXN",
      status: "active",
    },
  ]

  const activeCards = [
    {
      id: "debit1",
      type: "debit",
      name: "Tarjeta de Débito",
      number: "****7890",
      balance: 2150.75,
      currency: "MXN",
      expiryDate: "09/26",
      status: "active",
    },
    {
      id: "credit1",
      type: "credit",
      name: "Tarjeta de Crédito",
      number: "****3456",
      balance: 1250.0,
      limit: 5000.0,
      availableCredit: 3750.0,
      currency: "MXN",
      expiryDate: "12/25",
      status: "active",
    },
  ]

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 ease-in-out md:relative",
          menuOpen ? "w-64" : "w-0 md:w-16 overflow-hidden",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          {menuOpen ? (
            <Logo />
          ) : (
            <div className="w-full flex justify-center">
              <Logo showText={false} />
            </div>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 py-2">
            {menuOpen && (
              <h2 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">MENÚ PRINCIPAL</h2>
            )}
            <div className="space-y-1">
              <Button
                variant={activeTab === "dashboard" ? "secondary" : "ghost"}
                className={cn("w-full", menuOpen ? "justify-start" : "justify-center px-0")}
                onClick={() => setActiveTab("dashboard")}
                title="Inicio"
              >
                <Home className={cn("h-4 w-4", menuOpen ? "mr-2" : "")} />
                {menuOpen && "Inicio"}
              </Button>
              <Button
                variant={activeTab === "accounts" ? "secondary" : "ghost"}
                className={cn("w-full", menuOpen ? "justify-start" : "justify-center px-0")}
                onClick={() => setActiveTab("accounts")}
                title="Cuentas y Tarjetas"
              >
                <CreditCard className={cn("h-4 w-4", menuOpen ? "mr-2" : "")} />
                {menuOpen && "Cuentas y Tarjetas"}
              </Button>
              <Button
                variant={activeTab === "transfers" ? "secondary" : "ghost"}
                className={cn("w-full", menuOpen ? "justify-start" : "justify-center px-0")}
                onClick={() => setActiveTab("transfers")}
                title="Transferencias"
              >
                <DollarSign className={cn("h-4 w-4", menuOpen ? "mr-2" : "")} />
                {menuOpen && "Transferencias"}
              </Button>
              <Button
                variant={activeTab === "investments" ? "secondary" : "ghost"}
                className={cn("w-full", menuOpen ? "justify-start" : "justify-center px-0")}
                onClick={() => setActiveTab("investments")}
                title="Inversiones"
              >
                <PiggyBank className={cn("h-4 w-4", menuOpen ? "mr-2" : "")} />
                {menuOpen && "Inversiones"}
              </Button>
              <Button
                variant={activeTab === "loans" ? "secondary" : "ghost"}
                className={cn("w-full", menuOpen ? "justify-start" : "justify-center px-0")}
                onClick={() => setActiveTab("loans")}
                title="Créditos"
              >
                <BanknoteIcon className={cn("h-4 w-4", menuOpen ? "mr-2" : "")} />
                {menuOpen && "Créditos"}
              </Button>
              <Button
                variant={activeTab === "documents" ? "secondary" : "ghost"}
                className={cn("w-full", menuOpen ? "justify-start" : "justify-center px-0")}
                onClick={() => setActiveTab("documents")}
                title="Documentos"
              >
                <FileText className={cn("h-4 w-4", menuOpen ? "mr-2" : "")} />
                {menuOpen && "Documentos"}
              </Button>
              <Button
                variant={activeTab === "reports" ? "secondary" : "ghost"}
                className={cn("w-full", menuOpen ? "justify-start" : "justify-center px-0")}
                onClick={() => setActiveTab("reports")}
                title="Reportes"
              >
                <PieChart className={cn("h-4 w-4", menuOpen ? "mr-2" : "")} />
                {menuOpen && "Reportes"}
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Desktop Header */}
        <header className="hidden h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-6 md:flex">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="mr-2">
              {menuOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
            </Button>
          </div>

          <div className="text-center font-bold text-lg">BANCA ELECTRÓNICA</div>

          <div className="flex items-center space-x-4">
            <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Notificaciones</DialogTitle>
                  <DialogDescription>Historial de notificaciones y alertas de tu cuenta</DialogDescription>
                </DialogHeader>
                <NotificationHistory />
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
                  <User className="h-4 w-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                  <User className="mr-2 h-4 w-4" /> Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                  <Settings className="mr-2 h-4 w-4" /> Ajustes
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-4 md:hidden">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="mr-2">
              <Menu className="h-4 w-4" />
            </Button>
            <Logo size="sm" />
          </div>

          <div className="text-center font-bold text-sm">Banca Electrónica</div>

          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Notificaciones</DialogTitle>
                </DialogHeader>
                <NotificationHistory />
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 p-0">
                  <User className="h-3 w-3 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                  <User className="mr-2 h-4 w-4" /> Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                  <Settings className="mr-2 h-4 w-4" /> Ajustes
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="md:hidden">
              <TabsTrigger value="dashboard">Inicio</TabsTrigger>
              <TabsTrigger value="accounts">Cuentas</TabsTrigger>
              <TabsTrigger value="transfers">Transferencias</TabsTrigger>
              <TabsTrigger value="settings">Ajustes</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$ 12,580.25</div>
                    <p className="text-xs text-muted-foreground">+2.5% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
                    <ArrowDownLeft className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$ 4,395.00</div>
                    <p className="text-xs text-muted-foreground">+10.1% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gastos</CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$ 2,850.75</div>
                    <p className="text-xs text-muted-foreground">-3.2% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">+8 desde el mes pasado</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Resumen de Cuenta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AccountSummary />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Transacciones Recientes</CardTitle>
                    <CardDescription>Últimas 3 transacciones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentTransactions limit={3} />
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Ver todas las transacciones
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>Historial de Transacciones</DialogTitle>
                          <DialogDescription>Todas las transacciones realizadas en tu cuenta</DialogDescription>
                        </DialogHeader>
                        <RecentTransactions />
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Sección para Cuentas y Tarjetas */}
            <TabsContent value="accounts" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Mis Cuentas</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {activeAccounts.map((account) => (
                    <Card key={account.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-100 dark:bg-gray-800 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{account.name}</CardTitle>
                          <Badge variant="outline" className="bg-white">
                            Activa
                          </Badge>
                        </div>
                        <CardDescription>Cuenta {account.number}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Saldo Disponible</p>
                            <p className="text-2xl font-bold">$ {account.balance.toLocaleString()}</p>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex items-center">
                                Detalles
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-auto">
                              <DialogHeader>
                                <DialogTitle>Detalle de Cuenta</DialogTitle>
                                <DialogDescription>Movimientos y transacciones de tu cuenta</DialogDescription>
                              </DialogHeader>
                              <AccountDetailsModal
                                accountId={account.id}
                                accountName={account.name}
                                accountNumber={account.number}
                                accountType="savings"
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Mis Tarjetas</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {activeCards.map((card) => (
                    <Card key={card.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-100 dark:bg-gray-800 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{card.name}</CardTitle>
                          <Badge variant="outline" className="bg-white">
                            Activa
                          </Badge>
                        </div>
                        <CardDescription>
                          Tarjeta {card.number} • Vence: {card.expiryDate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        {card.type === "credit" ? (
                          <>
                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Saldo Actual</p>
                                <p className="text-2xl font-bold">$ {card.balance.toLocaleString()}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Límite de Crédito</p>
                                <p className="text-lg font-medium">$ {card.limit.toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                              <div
                                className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500"
                                style={{ width: `${(card.balance / card.limit) * 100}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <p className="text-sm text-muted-foreground">
                                Disponible:{" "}
                                <span className="font-medium">$ {card.availableCredit.toLocaleString()}</span>
                              </p>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="flex items-center">
                                    Detalles
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-auto">
                                  <DialogHeader>
                                    <DialogTitle>Detalle de Tarjeta</DialogTitle>
                                    <DialogDescription>Movimientos y transacciones de tu tarjeta</DialogDescription>
                                  </DialogHeader>
                                  <AccountDetailsModal
                                    accountId={card.id}
                                    accountName={card.name}
                                    accountNumber={card.number}
                                    accountType={card.type as "debit" | "credit"}
                                  />
                                </DialogContent>
                              </Dialog>
                            </div>
                          </>
                        ) : (
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground">Saldo Disponible</p>
                              <p className="text-2xl font-bold">$ {card.balance.toLocaleString()}</p>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center">
                                  Detalles
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-auto">
                                <DialogHeader>
                                  <DialogTitle>Detalle de Tarjeta</DialogTitle>
                                  <DialogDescription>Movimientos y transacciones de tu tarjeta</DialogDescription>
                                </DialogHeader>
                                <AccountDetailsModal
                                  accountId={card.id}
                                  accountName={card.name}
                                  accountNumber={card.number}
                                  accountType={card.type as "debit" | "credit"}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transfers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transferir Dinero</CardTitle>
                  <CardDescription>Realiza transferencias a cuentas propias o de terceros</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransferForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Cuenta</CardTitle>
                  <CardDescription>Administra tus preferencias y seguridad</CardDescription>
                </CardHeader>
                <CardContent>
                  <AccountSettings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Estado de Cuenta Mensual</CardTitle>
                  <CardDescription className="text-xs">
                    Visualiza y descarga tus estados de cuenta mensuales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MonthlyStatement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <UserProfile />
            </TabsContent>

            <TabsContent value="investments" className="space-y-4">
              <Investments />
            </TabsContent>

            <TabsContent value="loans" className="space-y-4">
              <Loans />
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Documents />
            </TabsContent>
          </Tabs>
        </main>
        {/* Footer */}
        <footer className="mt-auto py-3 px-4 border-t text-center text-xs text-gray-500">
          <p>Versión 1.0.0 | © 2025 La Koope</p>
        </footer>
      </div>
    </div>
  )
}
