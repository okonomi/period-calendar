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
    <div
      className="-translate-x-1/2 before:-translate-x-1/2 absolute whitespace-nowrap rounded bg-black px-2 py-1 text-white text-xs before:absolute before:bottom-[-4px] before:left-1/2 before:border-4 before:border-transparent before:border-t-black before:content-['']"
      style={style}
    >
      {text}
    </div>
  )
}
