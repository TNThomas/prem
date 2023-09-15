import { persisted } from 'svelte-local-storage-store'
import type { ResultType } from './resultProcessing'

export const programText = persisted<string>("programText", ""),
    programOut = persisted<ResultType[]>("programOut", [])