import type { TreeCursor } from '@lezer/common'
import { evalOrder1 } from "../order1"
import type { Sequence } from '$lib/lang/dataStructures'
import { evalNegative } from './negative'

export function evalOrder2(
    src: string,
    node: TreeCursor
): number | Sequence {
    switch (node.type.name) {
        case "Negative":
            return evalNegative(src, node)
        default:
            return evalOrder1(src, node)
    }
}