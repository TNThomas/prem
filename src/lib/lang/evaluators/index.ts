import { evalOrder5 } from "./order5"

export * from "./errors"
export { evalProgram } from "./program"

export const evalOrderLast = evalOrder5

export function applyOperator(
    operator: (...operands: number[]) => number,
    ...operands: number[]
): number {
    const result = operator(...operands)
    return result === 0 ? 0 : result
}