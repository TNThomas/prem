
import type { TreeCursor } from '@lezer/common'
import type { Sequence } from '$lib/lang/dataStructures'
import { evalOrder4 } from '../order4'
import { evalArithmeticBinary } from '../arithmeticBinary'


export function evalOrder5(
    src: string,
    node: TreeCursor
): number | Sequence {

    switch (node.type.name) {
        case "Add":
            return evalArithmeticBinary(
                src,
                node,
                (a: number, b: number) => a+b,
                evalOrder4,
                evalOrder5
            )
        case "Sub":
            return evalArithmeticBinary(
                src,
                node,
                (a: number, b: number) => a-b,
                evalOrder4,
                evalOrder5
            )
        default:
            return evalOrder4(src, node)
    }
}