import { useState } from "react"
import type { TooltipPosition } from "../components/Tooltip"

export const useTooltipPosition = () => {
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null)

  const handleMouseEnter = (event: React.MouseEvent, hasTooltip: boolean) => {
    if (hasTooltip) {
      const rect = event.currentTarget.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      setTooltipPosition({ top: rect.top + scrollTop - 30, left: rect.left + scrollLeft + rect.width / 2 })
    }
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
