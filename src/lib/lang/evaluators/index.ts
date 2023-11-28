import { evalOrder4 } from "./order4"

export * from "./errors"
export { evalProgram } from "./program"

export const evalOrderLast = evalOrder4

export function applyOperator(
    operator: (...operands: number[]) => number,
    ...operands: number[]
): number {
    const result = operator(...operands)
    return result === 0 ? 0 : result
}