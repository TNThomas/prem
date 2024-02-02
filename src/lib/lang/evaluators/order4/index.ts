import type { TreeCursor } from '@lezer/common'
import type { Sequence } from '$lib/lang/dataStructures'
import { evalOrder3 } from '../order3'
import { evalArithmeticBinary } from '../arithmeticBinary'
import { DivZeroError, EvaluationError } from '../errors'

export function evalOrder4(
    src: string,
    node: TreeCursor
): number | Sequence {

    switch (node.type.name) {
        case "Mult":

            return evalArithmeticBinary(
                src,
                node,
                (a: number, b: number) => a*b,
                evalOrder3,
                evalOrder4
            )
        case "Div":
            try {
                return evalArithmeticBinary(
                    src,
                    node,
                    divOperator,
                    evalOrder3,
                    evalOrder4
                )
            } catch (error) {
                throw new EvaluationError(src, node, error instanceof Error ? error.message : undefined)
            }
        case "Mod":
            try {
                return evalArithmeticBinary(
                    src,
                    node,
                    modOperator,
                    evalOrder3,
                    evalOrder4
                )
            } catch (error) {
                throw new EvaluationError(src, node, error instanceof Error ? error.message : undefined)
            }
        default:
            return evalOrder3(src, node)
    }
}

function divOperator(a: number, b: number) : number {
    if (b === 0) {
        throw new DivZeroError()
    }
    return a/b
}

function modOperator(a: number, b: number) : number {
    if (b === 0) {
        throw new DivZeroError()
    }
    return ((a%b)+b)%b;
}