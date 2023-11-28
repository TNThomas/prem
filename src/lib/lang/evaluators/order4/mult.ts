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

        // if the first one is just a number
        if (typeof first === "number") {
            if ( typeof second === "number") {
                // Multiply, accounting for Javascript's -0
                return first*second === 0 ? 0 :first*second;
            }
            // if the first is a number and the second is a sequence, create a new sequence using map where every value in second is multiplied by first  
            first = new Sequence(first)
        }

        second = typeof second === "number" ? new Sequence(second) : second
                
        // Calculate the Cartesian product to generate every pair of factors
        return new Sequence(...cross(
            first,
            second,
            (a, b) => {
                // Then multiply each pair
                const product = a * b
                return product === 0 ? 0 : product
            }
        ))


    }
    throw new EvaluationError(src, node, "Cannot multiply values that are neither Number nor Sequence.")

}