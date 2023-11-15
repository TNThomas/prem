
import type { TreeCursor } from '@lezer/common'
import type { Sequence } from '$lib/lang/dataStructures'
import { evalOrder3 } from '../order3'
import { evalMult } from './mult'
import { evalDiv } from './div'

export function evalOrder4(
    src: string,
    node: TreeCursor
): number | Sequence {

    switch (node.type.name) {
        case "Mult":
            return evalMult(src, node)
        case "Div":
            return evalDiv(src, node)
        default:
            return evalOrder3(src, node)
        }
}