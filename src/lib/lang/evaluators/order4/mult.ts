import type { TreeCursor } from '@lezer/common'
import { Sequence } from "$lib/lang/dataStructures"
import { ErrorNodeError, EvaluationError } from ".."
import { evalOrder3 } from "../order3"
import { evalOrder4 } from "../order4"
import { cross } from 'd3'

export function evalMult(src: string, node: TreeCursor): number | Sequence {

    let first: number | Sequence | undefined, second: number | Sequence | undefined

    if (node.firstChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node, "Invalid first value.")
        }
        first = evalOrder3(src, node)
    

        if (node.nextSibling()) {
            if (node.type.isError) {
                throw new ErrorNodeError(src, node, "Invalid second value.")
            }         
            second = evalOrder4(src, node)
        }
        node.parent()
    }

    if (first !== undefined && second !== undefined) {
        // Return a Num when both inputs are Nums
        if (typeof first === "number" && typeof second === "number") {
            return multiply(first, second)
        }

        // Ensure first is a sequence so we can do sequence stuff
        first = typeof first === "number" ? new Sequence(first) : first
        // Ensure second is a sequence so we can do sequence stuff
        second = typeof second === "number" ? new Sequence(second) : second

        // Calculate the Cartesian product to generate every pair of factors, multiplying as we go
        return new Sequence(...cross(
            first,
            second,
            multiply
        ))
    }
    throw new EvaluationError(src, node, "Cannot multiply values that are neither Number nor Sequence.")

}

function multiply(a: number, b: number) {
    const product = a * b
    return product === 0 ? 0 : product
}