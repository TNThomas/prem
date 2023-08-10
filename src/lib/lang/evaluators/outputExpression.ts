import type { TreeCursor } from '@lezer/common'
import { Sequence} from '../dataStructures/sequence'
import { evalStr } from './order1/primitives'
import { evalOrderLast } from '.'
import { ErrorNodeError, EvaluationError } from './errors'

export function evalOutputExpression(src: string, node: TreeCursor): {name: string, value: number[]} {
    if (node.firstChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node)
        }
        let resultVal = evalOrderLast(src, node)
        const resultName = node.nextSibling() ? evalStr(src, node): "Output"
        node.parent()
        if (typeof resultVal === "number") {
            resultVal = new Sequence(resultVal)
        }
        return {name: resultName, value: [...resultVal]}
    }
    throw new EvaluationError(src, node, "No output given.")
}