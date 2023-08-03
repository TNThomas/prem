import type { TreeCursor } from '@lezer/common'
import { Sequence} from '../dataStructures/sequence'
import { evalStr } from './primitives'
import { evalNumExpression } from './numExpression'

export function evalOutputExpression(src: string, node: TreeCursor): {name: string, value: number[]} {
    node.firstChild()
    let resultVal = evalNumExpression(src, node)
    const resultName = node.nextSibling() ? evalStr(src, node): "Output"
    node.parent()
    if (typeof resultVal === "number") {
        resultVal = new Sequence(resultVal)
    }
    return {name: resultName, value: [...resultVal]}
}