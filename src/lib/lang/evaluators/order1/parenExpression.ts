import type { TreeCursor } from '@lezer/common'
import type { Sequence } from '../../dataStructures'
import { evalOrderLast } from ".."
import { ErrorNodeError } from '../errors'


export function evalParenExpression(src: string, node: TreeCursor): number | Sequence{

    // there is only one child within the parentheses
    let results: number|Sequence = 0

    if (node.firstChild()) { // context manager wherein `node` is the first child
        if (node.type.isError) {
                throw new ErrorNodeError(src, node)
        }
        // we just evaluate the contents of the parentheses as normal using evalOrderLast 
        results = evalOrderLast(src, node)
        node.parent() // return `node` to its original state before we leave the context
    }
    return results
}