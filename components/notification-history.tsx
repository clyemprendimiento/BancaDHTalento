"use client"

import { useState } from "react"
import { Bell, Check, CheckCheck, Clock, Filter, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Tipos para las notificaciones
type NotificationType = "transaction" | "security" | "account" | "promotion"
type NotificationStatus = "read" | "unread"

interface Notification {
  id: string
  title: string
  description: string
  date: string
  type: NotificationType
  status: NotificationStatus
}

export function NotificationHistory() {
  // Estado para las notificaciones
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n1",
      title: "Pago recibido",
      description: "Has recibido una transferencia de $1,500.00",
      date: "2023-04-15T10:30:00",
      type: "transaction",
      status: "unread",
    },
    {
      id: "n2",
      title: "Cargo a tarjeta",
      description: "Cargo de $350.00 en Netflix",
      date: "2023-04-14T15:45:00",
      type: "transaction",
      status: "unread",
    },
    {
      id: "n3",
      title: "Estado de cuenta disponible",
      description: "Tu estado de cuenta de abril está listo",
      date: "2023-04-13T09:15:00",
      type: "account",
      status: "read",
    },
    {
      id: "n4",
      title: "Promoción especial",
      description: "3 meses sin intereses en compras mayores a $2,000",
      date: "2023-04-12T14:20:00",
      type: "promotion",
      status: "read",
    },
    {
      id: "n5",
      title: "Inicio de sesión detectado",
      description: "Se ha detectado un inicio de sesión desde un nuevo dispositivo",
      date: "2023-04-11T08:45:00",
      type: "security",
      status: "read",
    },
    {
      id: "n6",
      title: "Recordatorio de pago",
      description: "Tu pago de tarjeta de crédito vence en 3 días",
      date: "2023-04-10T11:30:00",
      type: "account",
      status: "read",
    },
    {
      id: "n7",
      title: "Cambio de contraseña",
      description: "Tu contraseña ha sido actualizada exitosamente",
      date: "2023-04-09T16:20:00",
      type: "security",
      status: "read",
    },
    {
      id: "n8",
      title: "Nuevo beneficio disponible",
      description: "Descubre los nuevos beneficios de tu tarjeta de crédito",
      date: "2023-04-08T13:10:00",
      type: "promotion",
      status: "read",
    },
  ])

  // Estado para filtros
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<NotificationType | "all">("all")

  // Funciones para gestionar notificaciones
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, status: "read" } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, status: "read" })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const deleteAllNotifications = () => {
    setNotifications([])
  }

  // Filtrar notificaciones
  const filteredNotifications = notifications.filter((notification) => {
    // Filtro por pestaña (estado)
    if (activeTab === "unread" && notification.status !== "unread") return false
    if (activeTab === "read" && notification.status !== "read") return false

    // Filtro por tipo
    if (typeFilter !== "all" && notification.type !== typeFilter) return false

    // Filtro por búsqueda
    if (
      searchTerm &&
      !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !notification.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Función para obtener el icono según el tipo
  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case "transaction":
        return <Clock className="h-4 w-4" />
      case "security":
        return <Bell className="h-4 w-4" />
      case "account":
        return <Check className="h-4 w-4" />
      case "promotion":
        return <Badge className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  // Función para obtener el nombre del tipo
  const getTypeName = (type: NotificationType) => {
    switch (type) {
      case "transaction":
        return "Transacción"
      case "security":
        return "Seguridad"
      case "account":
        return "Cuenta"
      case "promotion":
        return "Promoción"
      default:
        return type
    }
  }

  // Función para obtener el color del badge según el tipo
  const getTypeBadgeClass = (type: NotificationType) => {
    switch (type) {
      case "transaction":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "security":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "account":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "promotion":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Bell className="h-5 w-5" /> Historial de Notificaciones
        </CardTitle>
        <CardDescription>Gestiona y revisa todas tus notificaciones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all" className="text-xs">
                Todas
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                No leídas{" "}
                {notifications.filter((n) => n.status === "unread").length > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center"
                  >
                    {notifications.filter((n) => n.status === "unread").length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="read" className="text-xs">
                Leídas
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={markAllAsRead}
                disabled={!notifications.some((n) => n.status === "unread")}
              >
                <CheckCheck className="h-3 w-3 mr-1" /> Marcar todas como leídas
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={deleteAllNotifications}
                disabled={notifications.length === 0}
              >
                <Trash2 className="h-3 w-3 mr-1" /> Eliminar todas
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar notificaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-8 text-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as any)}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">
                    Todos los tipos
                  </SelectItem>
                  <SelectItem value="transaction" className="text-xs">
                    Transacciones
                  </SelectItem>
                  <SelectItem value="security" className="text-xs">
                    Seguridad
                  </SelectItem>
                  <SelectItem value="account" className="text-xs">
                    Cuenta
                  </SelectItem>
                  <SelectItem value="promotion" className="text-xs">
                    Promociones
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="mt-4">
            {renderNotificationTable(filteredNotifications)}
          </TabsContent>
          <TabsContent value="unread" className="mt-4">
            {renderNotificationTable(filteredNotifications)}
          </TabsContent>
          <TabsContent value="read" className="mt-4">
            {renderNotificationTable(filteredNotifications)}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">
          Mostrando {filteredNotifications.length} de {notifications.length} notificaciones
        </p>
      </CardFooter>
    </Card>
  )

  function renderNotificationTable(notifications: Notification[]) {
    if (notifications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Bell className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No hay notificaciones</p>
          <p className="text-xs text-muted-foreground mt-1">
            {searchTerm || typeFilter !== "all" ? "Prueba con otros filtros" : "Las notificaciones aparecerán aquí"}
          </p>
        </div>
      )
    }

    return (
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px] text-xs">Fecha</TableHead>
              <TableHead className="text-xs">Notificación</TableHead>
              <TableHead className="w-[100px] text-xs">Tipo</TableHead>
              <TableHead className="w-[100px] text-xs text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow
                key={notification.id}
                className={notification.status === "unread" ? "bg-muted/30 font-medium" : ""}
              >
                <TableCell className="text-xs">{formatDate(notification.date)}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-xs font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[10px] ${getTypeBadgeClass(notification.type)}`}>
                    {getTypeName(notification.type)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {notification.status === "unread" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => markAsRead(notification.id)}
                        title="Marcar como leída"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => deleteNotification(notification.id)}
                      title="Eliminar"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}
