"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AccountSettings() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="security">Seguridad</TabsTrigger>
        <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">Nombre</Label>
              <Input id="first-name" defaultValue="Juan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Apellido</Label>
              <Input id="last-name" defaultValue="Pérez" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" defaultValue="juan.perez@ejemplo.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" type="tel" defaultValue="+34 612 345 678" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input id="address" defaultValue="Calle Principal 123" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Idioma</Label>
            <Select defaultValue="es">
              <SelectTrigger id="language">
                <SelectValue placeholder="Selecciona un idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">Inglés</SelectItem>
                <SelectItem value="fr">Francés</SelectItem>
                <SelectItem value="de">Alemán</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button>Guardar Cambios</Button>
        </div>
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Cambiar Contraseña</h3>
                <p className="text-sm text-muted-foreground">Actualiza tu contraseña para mantener tu cuenta segura.</p>
              </div>

              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña Actual</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva Contraseña</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <Button>Actualizar Contraseña</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Autenticación de Dos Factores</h3>
                <p className="text-sm text-muted-foreground">Añade una capa adicional de seguridad a tu cuenta.</p>
              </div>

              <div className="mt-4 flex items-center space-x-2">
                <Switch id="2fa" />
                <Label htmlFor="2fa">Habilitar autenticación de dos factores</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Sesiones Activas</h3>
                <p className="text-sm text-muted-foreground">
                  Administra tus sesiones activas en diferentes dispositivos.
                </p>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Este dispositivo</p>
                    <p className="text-sm text-muted-foreground">Madrid, España • Activo ahora</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Cerrar
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">iPhone 13</p>
                    <p className="text-sm text-muted-foreground">Barcelona, España • Hace 2 días</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Cerrar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Preferencias de Notificaciones</h3>
          <p className="text-sm text-muted-foreground">Configura cómo y cuándo quieres recibir notificaciones.</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Alertas de Seguridad</Label>
                <p className="text-sm text-muted-foreground">Recibe notificaciones sobre actividades sospechosas</p>
              </div>
              <Switch defaultChecked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Transacciones</Label>
                <p className="text-sm text-muted-foreground">Notificaciones para cada transacción realizada</p>
              </div>
              <Switch defaultChecked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Ofertas y Promociones</Label>
                <p className="text-sm text-muted-foreground">Recibe información sobre ofertas especiales</p>
              </div>
              <Switch defaultChecked={false} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Actualizaciones de Servicio</Label>
                <p className="text-sm text-muted-foreground">Cambios en términos y condiciones o servicios</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <Label htmlFor="notification-method">Método de Notificación Preferido</Label>
            <Select defaultValue="email">
              <SelectTrigger id="notification-method">
                <SelectValue placeholder="Selecciona un método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Correo Electrónico</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="push">Notificaciones Push</SelectItem>
                <SelectItem value="all">Todos los métodos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button>Guardar Preferencias</Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}
