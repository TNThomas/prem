import type { TreeCursor } from '@lezer/common'
import { Sequence} from '../dataStructures/sequence'
import { evalStr } from './primitives'
import { evalNumExpression } from './numExpression'
import { ErrorNodeError, EvaluationError } from './errors'

export function evalOutputExpression(src: string, node: TreeCursor): {name: string, value: number[]} {
    if (node.firstChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node)
        }
        let resultVal = evalNumExpression(src, node)
        const resultName = node.nextSibling() ? evalStr(src, node): "Output"
        node.parent()
        if (typeof resultVal === "number") {
            resultVal = new Sequence(resultVal)
        }
        return {name: resultName, value: [...resultVal]}
    }
    throw new EvaluationError(src, node, "No output given.")
}