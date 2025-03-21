import type { CSSProperties } from "react"

export type TooltipPosition = { top: number; left: number }

type Props = {
  text: string
  position: TooltipPosition
}

export const Tooltip: React.FC<Props> = ({ text, position }) => {
  const style: CSSProperties = {
    position: "absolute",
    top: position.top,
    left: position.left,
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
  }

  return (
    <div className="bg-black text-white text-xs rounded py-1 px-2" style={style}>
      {text}
    </div>
  )
}
