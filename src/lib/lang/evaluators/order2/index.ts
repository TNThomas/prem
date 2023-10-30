import type { TreeCursor } from '@lezer/common'
import type { Sequence } from '$lib/lang/dataStructures'
import { evalNegative } from './negative'
import { evalNot } from './not'
import { evalOrder1 } from "../order1"

export function evalOrder2(
    src: string,
    node: TreeCursor
): number | Sequence {
     switch (node.type.name) {
         case "Not":
             return evalNot(src, node)
        case "Negative":
            return evalNegative(src, node)
        default:
            return evalOrder1(src, node)
    }
}