import type React from "react"

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <title>Plus</title>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
