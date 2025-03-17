import type { CSSProperties } from "react"

type Props = {
  text: string
  position: { top: number; left: number }
}

export const Tooltip: React.FC<Props> = ({ text, position }) => {
  const style: CSSProperties = {
    top: position.top,
    left: position.left,
    transform: "translateX(-50%)",
  }

  return (
    <div className="absolute bg-black text-white text-xs rounded py-1 px-2" style={style}>
      {text}
    </div>
  )
}
