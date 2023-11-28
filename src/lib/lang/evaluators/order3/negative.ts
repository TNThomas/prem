import type { TreeCursor } from '@lezer/common'
import { Sequence } from "$lib/lang/dataStructures"
import { ErrorNodeError, EvaluationError } from ".."
import { evalOrder2 } from "../order2"

export function evalNegative(
    src: string,
    node: TreeCursor
): number | Sequence {
    let result: number | Sequence | undefined
    if (node.firstChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node)
        }
        result = evalOrder2(src, node)
        node.parent()
    }
    if (typeof result !== undefined) {
        if (typeof result === "number") {
            return -result === 0 ? 0 : -result
        }
        if (result instanceof Sequence) {
            return new Sequence(...result.map(value => -value === 0 ? 0 : -value))
        }
    }
    throw new EvaluationError(src, node, "Cannot negate a value that is neither Number nor Sequence.")
}