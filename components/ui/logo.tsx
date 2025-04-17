import { Building2 } from "lucide-react"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

// Modificar la función Logo para quitar el texto por defecto
export function Logo({ className, showText = false, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="p-1">
        <Building2 className={`${iconSizes[size]} text-black dark:text-white`} />
      </div>
      {showText && <span className={`font-semibold ${textSizes[size]}`}>Banca Electrónica</span>}
    </div>
  )
}
