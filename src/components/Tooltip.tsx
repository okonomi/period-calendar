import type { CSSProperties } from "react"

export type TooltipPosition = { top: number; left: number }

type Props = {
  text: string
  position: TooltipPosition
}

export const Tooltip: React.FC<Props> = ({ text, position }) => {
  // top, leftは動的な値なのでstyleとして残す
  const style: CSSProperties = {
    top: position.top,
    left: position.left,
  }

  return (
    <div
      className="absolute -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded py-1 px-2"
      style={style}
    >
      {text}
    </div>
  )
}
