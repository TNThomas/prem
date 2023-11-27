import type { TreeCursor } from '@lezer/common'
import { evalOrder2 } from "../order2"
import type { Sequence } from '$lib/lang/dataStructures'
import { evalNegative } from './negative'

export function evalOrder3(
    src: string,
    node: TreeCursor
): number | Sequence {
    switch (node.type.name) {
        case "Negative":
            return evalNegative(src, node)
        default:
            return evalOrder2(src, node)
    }
}