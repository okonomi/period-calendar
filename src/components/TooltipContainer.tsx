type Props = {
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: () => void
}

export const TooltipContainer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  )
}
