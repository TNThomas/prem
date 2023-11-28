import type { TreeCursor } from '@lezer/common'
import { Sequence } from "$lib/lang/dataStructures"
import { ErrorNodeError, EvaluationError, applyOperator } from ".."
import { evalOrder2 } from "../order2"

export function evalUnary(
    src: string,
    node: TreeCursor,
    operator: (a: number) => number,
): number | Sequence {
    let childVal: number | Sequence | undefined
    if (node.firstChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node)
        }
        childVal = evalOrder2(src, node)
        node.parent()
    }
    if (typeof childVal !== undefined) {
        if (typeof childVal === "number") {
            return applyOperator(operator, childVal)
        }
        if (childVal instanceof Sequence) {
            return new Sequence(...childVal.map(value => applyOperator(operator, value)))
        }
    }
    throw new EvaluationError(src, node, "Cannot negate a value that is neither Number nor Sequence.")
}