import { createContext } from "react"
import type { Holiday } from "../domain/Holiday"

export const HolidaysContext = createContext<Record<string, Holiday>>({})
