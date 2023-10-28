import type { TreeCursor } from '@lezer/common'
import type { Sequence } from '../../dataStructures'
import { evalOrderLast } from ".."
import { ErrorNodeError, EvaluationError } from '../errors'

    //for the paren expression just go through everything within the parentheses and evaluate it FIRST before evaluating other things
export function evalParenExpression(src: string, node: TreeCursor): number | Sequence{
    // there is only one child within the parentheses
    let result: number | Sequence
    if (node.firstChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node, "EvaluatorError.")
        }
        // we just evaluate the contents of the parentheses as normal using evalOrderLast 
        result = evalOrderLast(src, node)
        // because node.firstChild sets node to the first child, we have to re-set it to the parent here before returning our result
        node.parent()
    } else {
        throw new EvaluationError(src, node)
    }
    return result
}