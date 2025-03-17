import { createContext } from "react"
import type { Holiday } from "../types/Holiday"

export const HolidaysContext = createContext<Record<string, Holiday>>({})
