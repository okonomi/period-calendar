import { useTooltipPosition } from "../hooks/use-tooltip-position"
import { Tooltip } from "./Tooltip"

type Props = {
  tooltip?: string
}

export const TooltipContainer: React.FC<React.PropsWithChildren<Props>> = ({ children, tooltip }) => {
  const { tooltipPosition, handleMouseEnter, handleMouseLeave } = useTooltipPosition()

  return (
    <div className="relative" onMouseEnter={(e) => !!tooltip && handleMouseEnter(e)} onMouseLeave={handleMouseLeave}>
      {children}
      {tooltipPosition && tooltip && <Tooltip text={tooltip} position={tooltipPosition} />}
    </div>
  )
}
