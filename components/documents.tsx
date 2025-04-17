"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, FileText, Upload, X, Eye, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Tipos para los documentos
interface Document {
  id: string
  name: string
  type: "ine" | "address" | "income" | "other"
  status: "pending" | "approved" | "rejected"
  uploadDate: string
  expiryDate?: string
  fileSize: string
  fileType: string
  thumbnailUrl?: string
}

export function Documents() {
  const [activeTab, setActiveTab] = useState("my-documents")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState<string>("ine")

  // Estado para los documentos
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc1",
      name: "INE_frente.jpg",
      type: "ine",
      status: "approved",
      uploadDate: "2023-01-15",
      expiryDate: "2028-01-15",
      fileSize: "1.2 MB",
      fileType: "image/jpeg",
      thumbnailUrl: "/placeholder.svg?height=100&width=160",
    },
    {
      id: "doc2",
      name: "INE_reverso.jpg",
      type: "ine",
      status: "approved",
      uploadDate: "2023-01-15",
      expiryDate: "2028-01-15",
      fileSize: "1.1 MB",
      fileType: "image/jpeg",
      thumbnailUrl: "/placeholder.svg?height=100&width=160",
    },
    {
      id: "doc3",
      name: "Comprobante_domicilio.pdf",
      type: "address",
      status: "approved",
      uploadDate: "2023-02-10",
      expiryDate: "2023-08-10",
      fileSize: "850 KB",
      fileType: "application/pdf",
    },
    {
      id: "doc4",
      name: "Recibo_nomina.pdf",
      type: "income",
      status: "pending",
      uploadDate: "2023-04-05",
      fileSize: "1.5 MB",
      fileType: "application/pdf",
    },
  ])

  // Manejar la selección de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Manejar la carga de documento
  const handleUpload = () => {
    if (!selectedFile || !documentType) {
      setUploadStatus("error")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulación de carga
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadStatus("success")

          // Crear nuevo documento
          const newDocument: Document = {
            id: `doc${documents.length + 1}`,
            name: selectedFile.name,
            type: documentType as "ine" | "address" | "income" | "other",
            status: "pending",
            uploadDate: new Date().toISOString().split("T")[0],
            fileSize: `${(selectedFile.size / 1024).toFixed(0)} KB`,
            fileType: selectedFile.type,
          }

          setDocuments([...documents, newDocument])

          // Resetear después de 3 segundos
          setTimeout(() => {
            setSelectedFile(null)
            setUploadStatus("idle")
          }, 3000)

          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  // Obtener el nombre del tipo de documento
  const getDocumentTypeName = (type: string) => {
    switch (type) {
      case "ine":
        return "Identificación Oficial"
      case "address":
        return "Comprobante de Domicilio"
      case "income":
        return "Comprobante de Ingresos"
      case "other":
        return "Otro Documento"
      default:
        return type
    }
  }

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
          <TabsTrigger value="my-documents">Mis Documentos</TabsTrigger>
          <TabsTrigger value="upload-document">Subir Documento</TabsTrigger>
        </TabsList>

        <TabsContent value="my-documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Digitalizados</CardTitle>
              <CardDescription>Documentos que has subido a tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              {documents.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Documento</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Fecha de Carga</TableHead>
                        <TableHead>Vencimiento</TableHead>
                        <TableHead>Tamaño</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((document) => (
                        <TableRow key={document.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{document.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getDocumentTypeName(document.type)}</TableCell>
                          <TableCell>{formatDate(document.uploadDate)}</TableCell>
                          <TableCell>{document.expiryDate ? formatDate(document.expiryDate) : "No aplica"}</TableCell>
                          <TableCell>{document.fileSize}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                document.status === "approved"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : document.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              }
                            >
                              {document.status === "approved"
                                ? "Aprobado"
                                : document.status === "pending"
                                  ? "Pendiente"
                                  : "Rechazado"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" title="Ver documento">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8" title="Descargar documento">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-sm font-medium">No tienes documentos cargados</p>
                  <p className="text-sm text-muted-foreground">Sube tus documentos para completar tu perfil</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload-document">
          <Card>
            <CardHeader>
              <CardTitle>Subir Nuevo Documento</CardTitle>
              <CardDescription>Digitaliza y sube tus documentos para completar tu perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="document-type">Tipo de Documento</Label>
                  <select
                    id="document-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                  >
                    <option value="ine">Identificación Oficial (INE/Pasaporte)</option>
                    <option value="address">Comprobante de Domicilio</option>
                    <option value="income">Comprobante de Ingresos</option>
                    <option value="other">Otro Documento</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document-file">Archivo</Label>
                  <div className="grid w-full items-center gap-1.5">
                    <Input
                      id="document-file"
                      type="file"
                      className="cursor-pointer"
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    />
                    <p className="text-xs text-muted-foreground">
                      Formatos aceptados: JPG, PNG, PDF, DOC. Tamaño máximo: 5MB
                    </p>
                  </div>
                </div>

                {selectedFile && (
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{selectedFile.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(selectedFile.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedFile(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Subiendo documento...</Label>
                      <span className="text-xs font-medium">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {uploadStatus === "success" && (
                  <Alert
                    variant="default"
                    className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>¡Documento subido con éxito!</AlertTitle>
                    <AlertDescription>Tu documento ha sido cargado y está pendiente de revisión.</AlertDescription>
                  </Alert>
                )}

                {uploadStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Por favor selecciona un archivo y un tipo de documento.</AlertDescription>
                  </Alert>
                )}

                <Button type="button" className="w-full" onClick={handleUpload} disabled={!selectedFile || isUploading}>
                  <Upload className="mr-2 h-4 w-4" /> Subir Documento
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 items-start">
              <div className="space-y-2 w-full">
                <h3 className="text-sm font-medium">Recomendaciones para la digitalización:</h3>
                <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                  <li>Asegúrate que el documento sea legible y esté completo</li>
                  <li>Evita reflejos o sombras en la imagen</li>
                  <li>Verifica que toda la información sea visible</li>
                  <li>Para INE, sube ambos lados del documento</li>
                  <li>Los comprobantes de domicilio no deben tener más de 3 meses de antigüedad</li>
                </ul>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
