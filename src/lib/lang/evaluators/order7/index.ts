import type { TreeCursor } from '@lezer/common'
import type { Sequence } from '$lib/lang/dataStructures'
import { evalOrder6 } from '../order6'
import { evalArithmeticBinary } from '../arithmeticBinary'


export function evalOrder7(
    src: string,
    node: TreeCursor
): number | Sequence {

    switch (node.type.name) {
        case "Eq":
            return evalArithmeticBinary(
                src,
                node,
                (a: number, b: number) => a == b ? 1 : 0,
                evalOrder6,
                evalOrder6
            )
        case "Neq":
            return evalArithmeticBinary(
                src,
                node,
                (a: number, b: number) => a != b ? 1 : 0,
                evalOrder6,
                evalOrder6
            )
        default:
            return evalOrder6(src, node)
    }
}