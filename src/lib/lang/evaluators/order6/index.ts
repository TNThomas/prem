import type { TreeCursor } from '@lezer/common'
import type { Sequence } from '$lib/lang/dataStructures'
import { evalOrder5 } from '../order5'
import { evalArithmeticBinary } from '../arithmeticBinary'


export function evalOrder6(
    src: string,
    node: TreeCursor
): number | Sequence {

    switch (node.type.name) {
        case "IsGreater":
            return evalArithmeticBinary(
                src,
                node,
                (a: number, b: number) => a > b ? 1 : 0,
                evalOrder5,
                evalOrder5
            )
        case "IsLess":
            return evalArithmeticBinary(
                src,
                node,
                (a: number, b: number) => a < b ? 1 : 0,
                evalOrder5,
                evalOrder5
            )
        case "IsGreaterEq":
            return evalArithmeticBinary(
                src,
                node,
                (a: number, b: number) => a>=b ? 1 : 0,
                evalOrder5,
                evalOrder5
            )
        case "IsLessEq":
            return evalArithmeticBinary(
                src,
                node,
                (a: number, b: number) => a<=b ? 1 : 0,
                evalOrder5,
                evalOrder5
            )
        default:
            return evalOrder5(src, node)
    }
}