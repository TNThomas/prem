import type { TreeCursor } from '@lezer/common'
import { Sequence } from '../../dataStructures/sequence'
import { EvaluationError } from '../errors'
import { evalOrder1 } from '../order1/index'
import { evalNot } from './not'

export function evalOrder2(
    src: string,
    node: TreeCursor
): number | Sequence {

    // i have to keep thiis or else i get an error
    const results = new Sequence()

     switch (node.type.name) {
         case "Not":
             return evalNot(src, node)
        default:
            // if we dont find something of order2 we check up the order at order1
            return evalOrder1(src,node)
    }
}