import type { TreeCursor } from '@lezer/common'
import { Sequence } from '../dataStructures'
import { evalOrderLast } from "."
import { ErrorNodeError } from './errors'
import { sequence } from '@sveltejs/kit/hooks'

export function evalSequence(src: string, node: TreeCursor): Sequence {
    if (node.firstChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node, "Invalid item.")
        }
        const firstElem = evalOrderLast(src, node)
        let results: Sequence
        if (firstElem instanceof Sequence) {
            results = firstElem
        }
        else {
            results = new Sequence(firstElem)
        }

        while (node.nextSibling()) {
            if (node.type.isError) {
                throw new ErrorNodeError(src, node, "Invalid item.")
            }
            results.insert(evalOrderLast(src, node))         
        }

        node.parent()
        return results
    }
    return new Sequence(0)
}
