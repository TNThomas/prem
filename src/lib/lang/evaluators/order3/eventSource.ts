import type { TreeCursor } from '@lezer/common'
import { Cards, Dice, type Sequence } from '../../dataStructures'
import { range } from 'd3'
import { ErrorNodeError } from '../errors'
import { evalOrder3 } from '.'
import { evalOrder2 } from '../order2'

export function evalEventSource(src: string, node: TreeCursor): Cards | Cards[] | Dice | Dice[] {
    return (node.type.name === "Cards" ? evalNode(src, node, Cards) : evalNode(src, node, Dice))
}

function evalNode<T>(
    src: string,
    node: TreeCursor,
    TClass: new (quantity: number, faces: number[] | Sequence) => T
){
    let quantity: number | number[] | Sequence = 1,
        faces

    if (node.lastChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node, "Invalid face.")
        }
        faces = evalOrder2(src, node)
        if (node.prevSibling()) {
            if (node.type.isError) {
                throw new ErrorNodeError(src, node, "Invalid quantity.")
            }
            quantity = evalOrder3(src, node)
        }
        node.parent()
    }

    if (quantity !== undefined && faces !== undefined) {
        if (typeof quantity === "number") {
            quantity = [quantity]
        }
        if (typeof faces === "number") {
            if (faces === 0) {
                return new TClass(1, [0])
            } else if (faces < 0) {
                faces = range(-1, faces - 1, -1)
            } else {
                faces = range(1, faces + 1)
            }
        }
        const results = new Array<T>()
        for (const amount of quantity) {
            results.push(new TClass(amount, faces))
        }
        return results
    }
    return new TClass(1, [0])
}