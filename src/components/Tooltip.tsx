import type { CSSProperties } from "react"

type Props = {
  text: string
  position: { top: number; left: number }
}

export const Tooltip: React.FC<Props> = ({ text, position }) => {
  const style: CSSProperties = {
    top: position.top,
    left: position.left,
  }

  return (
    <div className="tooltip" style={style}>
      {text}
    </div>
  )
}
