import { useState } from "react"
import type { TooltipPosition } from "../components/Tooltip"

export const useTooltipPosition = () => {
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null)

  const handleMouseEnter = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({ top: -30, left: rect.width / 2 })
  }

  const handleMouseLeave = () => {
    setTooltipPosition(null)
  }

  return {
    tooltipPosition,
    handleMouseEnter,
    handleMouseLeave,
  }
}
