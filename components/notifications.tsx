"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      title: "Pago recibido",
      description: "Has recibido una transferencia de $1,500.00",
      time: "Hace 10 minutos",
      read: false,
    },
    {
      id: "n2",
      title: "Cargo a tarjeta",
      description: "Cargo de $350.00 en Netflix",
      time: "Hace 2 horas",
      read: false,
    },
    {
      id: "n3",
      title: "Estado de cuenta disponible",
      description: "Tu estado de cuenta de abril está listo",
      time: "Hace 1 día",
      read: true,
    },
    {
      id: "n4",
      title: "Promoción especial",
      description: "3 meses sin intereses en compras mayores a $2,000",
      time: "Hace 2 días",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel className="text-xs font-medium">Notificaciones</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={markAllAsRead}>
              Marcar todas como leídas
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-3 cursor-pointer ${!notification.read ? "bg-muted/50" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-xs">{notification.title}</span>
                  <span className="text-[10px] text-muted-foreground">{notification.time}</span>
                </div>
                <span className="text-xs mt-1">{notification.description}</span>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-xs text-muted-foreground">No tienes notificaciones</div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs text-center justify-center text-muted-foreground">
          Ver todas las notificaciones
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
