import type React from "react"

export const CalculatorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <title>Calculator</title>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="12" y1="10" x2="12" y2="10" />
      <line x1="12" y1="14" x2="12" y2="14" />
      <line x1="12" y1="18" x2="12" y2="18" />
      <line x1="8" y1="10" x2="8" y2="10" />
      <line x1="8" y1="14" x2="8" y2="14" />
      <line x1="8" y1="18" x2="8" y2="18" />
      <line x1="16" y1="10" x2="16" y2="10" />
      <line x1="16" y1="14" x2="16" y2="14" />
      <line x1="16" y1="18" x2="16" y2="18" />
      <line x1="4" y1="6" x2="20" y2="6" />
    </svg>
  )
}
