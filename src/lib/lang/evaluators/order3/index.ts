import type { TreeCursor } from '@lezer/common'
import { evalOrder2 } from "../order2"
import type { Sequence } from '$lib/lang/dataStructures'
import { evalUnary } from './unary'

export function evalOrder3(
    src: string,
    node: TreeCursor
): number | Sequence {
    switch (node.type.name) {
        case "Negative":
            return evalUnary(src, node, (a: number) => -a)
        case "Not":
            return evalUnary(src, node, (a: number) => a === 0 ? 1 : 0)
        default:
            return evalOrder2(src, node)
    }
}