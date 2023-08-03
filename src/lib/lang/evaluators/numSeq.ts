import type { TreeCursor } from '@lezer/common'
import { Sequence } from '../dataStructures'
import { evalNumExpression } from "./numExpression"

export function evalNumSeq(src: string, node: TreeCursor): Sequence {
    if (node.firstChild()) {
        const firstElem = evalNumExpression(src, node)
        let results: Sequence
        if (firstElem instanceof Sequence) {
            results = firstElem
        }
        else {
            results = new Sequence(firstElem)
        }

        while (node.nextSibling()) {
            results.insert(evalNumExpression(src, node))         
        }

        node.parent()

        return results
    }
    return new Sequence(0)
}
