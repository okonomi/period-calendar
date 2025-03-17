import { createContext } from "react"

export const HolidaysContext = createContext<Record<string, { date: Date; name: string }>>({})
