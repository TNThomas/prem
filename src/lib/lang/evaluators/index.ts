import { evalOrder7 } from "./order7"

export * from "./errors"
export { evalProgram } from "./program"

export const evalOrderLast = evalOrder7

export function applyOperator(
    operator: (...operands: number[]) => number,
    ...operands: number[]
): number {
    const result = operator(...operands)
    return result === 0 ? 0 : result
}