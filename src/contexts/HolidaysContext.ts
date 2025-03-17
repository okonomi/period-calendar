import { createContext } from "react"

export const HolidaysContext = createContext<Record<string, Date>>({})
