import type { TreeCursor } from '@lezer/common'
import { Sequence } from "$lib/lang/dataStructures"
import { ErrorNodeError, EvaluationError, applyOperator } from "."
import { cross } from 'd3'

export function evalArithmeticBinary(
    src: string,
    node: TreeCursor,
    operator: (a: number, b: number) => number,
    leftEvaluator: (src: string, node: TreeCursor) => number | Sequence,
    rightEvaluator: (src: string, node: TreeCursor) => number | Sequence
): number | Sequence {

    let first: number | Sequence | undefined, second: number | Sequence | undefined

    if (node.firstChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node, "Invalid first value.")
        }
        first = leftEvaluator(src, node)
    

        if (node.nextSibling()) {
            if (node.type.isError) {
                throw new ErrorNodeError(src, node, "Invalid second value.")
            }         
            second = rightEvaluator(src, node)
        }
        node.parent()
    }

    if (first !== undefined && second !== undefined) {
        // Return a Num when both inputs are Nums
        if (typeof first === "number" && typeof second === "number") {
            return applyOperator(operator, first, second)
        }

        // Ensure first is a sequence so we can do sequence stuff
        first = typeof first === "number" ? new Sequence(first) : first
        // Ensure second is a sequence so we can do sequence stuff
        second = typeof second === "number" ? new Sequence(second) : second

        // Calculate the Cartesian product to generate every pair of factors, multiplying as we go
        return new Sequence(...cross(
            first,
            second,
            (a: number, b: number) => applyOperator(operator, a, b)
        ))
    }

    throw new EvaluationError(src, node, "Cannot multiply values that are neither Number nor Sequence.")
}