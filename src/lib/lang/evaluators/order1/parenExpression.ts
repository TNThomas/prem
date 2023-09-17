import type { TreeCursor } from '@lezer/common'
import { Sequence } from '../../dataStructures'
import { evalOrderLast } from ".."
import { ErrorNodeError } from '../errors'

    //for the paren expression just go through everything within the parentheses and evaluate it FIRST before evaluating other things
export function evalParenExpression(src: string, node: TreeCursor): number | Sequence{

        // there is only one child within the parentheses

        /*
        reminder: node.firstChild SETS node to the first child and it RETURNS a bool 
        it does not return the first child like one might initially think
        */
    node.firstChild()

    if (node.type.isError) {
            throw new ErrorNodeError(src, node, "EvaluatorError.")
    }
        // we just evaluate the contents of the parentheses as normal using evalOrderLast 
    let results: number|Sequence = evalOrderLast(src, node)
        // because node.firstChild sets node to the first child, we have to re-set it to the parent here before returning our result
    node.parent()
    return results;
        
}