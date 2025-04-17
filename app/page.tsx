import { redirect } from "next/navigation"
import { DashboardPage } from "@/components/dashboard-page"

export default function Home() {
  // En una aplicación real, verificaríamos la autenticación aquí
  // Si el usuario no está autenticado, redirigir al login
  const isAuthenticated = true

  if (!isAuthenticated) {
    redirect("/login")
  }

  return <DashboardPage />
}
