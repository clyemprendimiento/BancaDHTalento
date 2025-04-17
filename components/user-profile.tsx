"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Calendar, Building2, CreditCard, Shield, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Datos de ejemplo del usuario
  const [userData, setUserData] = useState({
    personal: {
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan.perez@ejemplo.com",
      phone: "+34 612 345 678",
      birthDate: "1985-06-15",
      address: "Calle Principal 123",
      city: "Madrid",
      postalCode: "28001",
      country: "España",
    },
    employment: {
      company: "Empresa ABC",
      position: "Gerente de Proyectos",
      workPhone: "+34 912 345 678",
      workEmail: "juan.perez@empresaabc.com",
      workAddress: "Avenida Empresarial 456",
      workCity: "Madrid",
      workPostalCode: "28002",
      workCountry: "España",
      startDate: "2018-03-01",
    },
    financial: {
      taxId: "12345678A",
      monthlyIncome: "4500",
      employmentType: "Tiempo completo",
      employmentYears: "5",
    },
  })

  const handleInputChange = (section: keyof typeof userData, field: string, value: string) => {
    setUserData({
      ...userData,
      [section]: {
        ...userData[section],
        [field]: value,
      },
    })
  }

  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos en un servidor
    setIsEditing(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="h-5 w-5" /> Mi Perfil
            </CardTitle>
            <CardDescription>Gestiona tu información personal y preferencias</CardDescription>
          </div>
          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Guardar
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => setIsEditing(true)}>
                Editar Perfil
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {saveSuccess && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>Tus datos han sido actualizados correctamente.</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal" className="text-xs">
              Información Personal
            </TabsTrigger>
            <TabsTrigger value="employment" className="text-xs">
              Datos Laborales
            </TabsTrigger>
            <TabsTrigger value="financial" className="text-xs">
              Información Financiera
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="firstName">Nombre</Label>
                </div>
                <Input
                  id="firstName"
                  value={userData.personal.firstName}
                  onChange={(e) => handleInputChange("personal", "firstName", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="lastName">Apellido</Label>
                </div>
                <Input
                  id="lastName"
                  value={userData.personal.lastName}
                  onChange={(e) => handleInputChange("personal", "lastName", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="email">Correo Electrónico</Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  value={userData.personal.email}
                  onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="phone">Teléfono</Label>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  value={userData.personal.phone}
                  onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                </div>
                <Input
                  id="birthDate"
                  type="date"
                  value={userData.personal.birthDate}
                  onChange={(e) => handleInputChange("personal", "birthDate", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="address">Dirección</Label>
                </div>
                <Input
                  id="address"
                  value={userData.personal.address}
                  onChange={(e) => handleInputChange("personal", "address", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  value={userData.personal.city}
                  onChange={(e) => handleInputChange("personal", "city", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Código Postal</Label>
                <Input
                  id="postalCode"
                  value={userData.personal.postalCode}
                  onChange={(e) => handleInputChange("personal", "postalCode", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  value={userData.personal.country}
                  onChange={(e) => handleInputChange("personal", "country", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="employment" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="company">Empresa</Label>
                </div>
                <Input
                  id="company"
                  value={userData.employment.company}
                  onChange={(e) => handleInputChange("employment", "company", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Input
                  id="position"
                  value={userData.employment.position}
                  onChange={(e) => handleInputChange("employment", "position", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="workPhone">Teléfono Laboral</Label>
                </div>
                <Input
                  id="workPhone"
                  type="tel"
                  value={userData.employment.workPhone}
                  onChange={(e) => handleInputChange("employment", "workPhone", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="workEmail">Correo Laboral</Label>
                </div>
                <Input
                  id="workEmail"
                  type="email"
                  value={userData.employment.workEmail}
                  onChange={(e) => handleInputChange("employment", "workEmail", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="workAddress">Dirección Laboral</Label>
                </div>
                <Input
                  id="workAddress"
                  value={userData.employment.workAddress}
                  onChange={(e) => handleInputChange("employment", "workAddress", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workCity">Ciudad</Label>
                <Input
                  id="workCity"
                  value={userData.employment.workCity}
                  onChange={(e) => handleInputChange("employment", "workCity", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workPostalCode">Código Postal</Label>
                <Input
                  id="workPostalCode"
                  value={userData.employment.workPostalCode}
                  onChange={(e) => handleInputChange("employment", "workPostalCode", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workCountry">País</Label>
                <Input
                  id="workCountry"
                  value={userData.employment.workCountry}
                  onChange={(e) => handleInputChange("employment", "workCountry", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="startDate">Fecha de Inicio</Label>
                </div>
                <Input
                  id="startDate"
                  type="date"
                  value={userData.employment.startDate}
                  onChange={(e) => handleInputChange("employment", "startDate", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="taxId">Identificación Fiscal</Label>
                </div>
                <Input
                  id="taxId"
                  value={userData.financial.taxId}
                  onChange={(e) => handleInputChange("financial", "taxId", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="monthlyIncome">Ingresos Mensuales</Label>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <Input
                    id="monthlyIncome"
                    value={userData.financial.monthlyIncome}
                    onChange={(e) => handleInputChange("financial", "monthlyIncome", e.target.value)}
                    disabled={!isEditing}
                    className="pl-8 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentType">Tipo de Empleo</Label>
                <Input
                  id="employmentType"
                  value={userData.financial.employmentType}
                  onChange={(e) => handleInputChange("financial", "employmentType", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentYears">Años en Empleo Actual</Label>
                <Input
                  id="employmentYears"
                  value={userData.financial.employmentYears}
                  onChange={(e) => handleInputChange("financial", "employmentYears", e.target.value)}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">Última actualización: 15 de abril de 2023</p>
      </CardFooter>
    </Card>
  )
}
