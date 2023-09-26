import type { TreeCursor } from '@lezer/common'
import { Sequence } from '../../dataStructures/sequence'
import { EvaluationError } from '../errors'
import { evalOrder1 } from '../order1/index'
import { evalNot } from './not'
//import { evalEventSource } from './eventSource'
//import type { Cards, Dice } from '../../dataStructures'

export function evalOrder2(
    src: string,
    node: TreeCursor
): number | Sequence {
     const results = new Sequence()
    // let events: Cards | Dice | Cards[] | Dice[]
     switch (node.type.name) {
         case "Not":
             return evalNot(src, node)
         default:
            // if we dont find something of order2 we check up the order at order1
             return evalOrder1(src,node)
    }
}