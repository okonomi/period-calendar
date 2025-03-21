import type { CSSProperties } from "react"

type Props = {
  text: string
  position: { top: number; left: number }
}

export const Tooltip: React.FC<Props> = ({ text, position }) => {
  const style: CSSProperties = {
    position: "absolute",
    top: position.top,
    left: position.left,
  }

  return (
    <div
      className="absolute -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded py-1 px-2 before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-[-4px] before:border-4 before:border-transparent before:border-t-black"
      style={style}
    >
      {text}
    </div>
  )
}
