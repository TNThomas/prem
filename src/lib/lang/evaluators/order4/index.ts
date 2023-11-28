
import type { TreeCursor } from '@lezer/common'
import type { Sequence } from '$lib/lang/dataStructures'
import { evalOrder3 } from '../order3'
import { evalArithmeticBinary } from '../arithmeticBinary'

export function evalOrder4(
    src: string,
    node: TreeCursor
): number | Sequence {

    switch (node.type.name) {
        case "Mult":
            return evalArithmeticBinary(
                src,
                node,
                (a: number, b: number) => a*b,
                evalOrder3,
                evalOrder4
            )
        default:
            return evalOrder3(src, node)
        }
}