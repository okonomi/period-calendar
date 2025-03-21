import { useState } from "react"
import { Tooltip } from "./Tooltip"

type TooltipPosition = { top: number; left: number }

type Props = {
  tooltip?: string
}

export const TooltipContainer: React.FC<React.PropsWithChildren<Props>> = ({ children, tooltip }) => {
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null)

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (!tooltip) return
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({ top: -30, left: rect.width / 2 })
  }

  const handleMouseLeave = () => {
    setTooltipPosition(null)
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {tooltipPosition && tooltip && <Tooltip text={tooltip} position={tooltipPosition} />}
    </div>
  )
}
