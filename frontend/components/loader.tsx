import { cn } from "@/lib/utils"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
  variant?: "default" | "primary" | "secondary"
}

export function Loader({ size = "md", className, variant = "primary" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  }

  const variantClasses = {
    default: "border-muted-foreground/20 border-t-muted-foreground/60",
    primary: "border-gray-300/30 border-t-blue-600",
    secondary: "border-gray-300/30 border-t-gray-700",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("animate-spin rounded-full", sizeClasses[size], variantClasses[variant])} />
    </div>
  )
}

