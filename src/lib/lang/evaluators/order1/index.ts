import type { TreeCursor } from '@lezer/common'
import type { Sequence } from '../../dataStructures/sequence'
import { evalNum } from './primitives'
import { evalSequence } from './sequence'
import { evalParenExpression } from './parenExpression'
import { EvaluationError } from '../errors'

export function evalOrder1(
    src: string,
    node: TreeCursor
): number | Sequence {
    switch (node.type.name) {
        case "Num":
            return evalNum(src, node)
        case "Sequence":
            return evalSequence(src, node)
        case "ParenExpression":
            return evalParenExpression (src, node)
        default:
            throw new EvaluationError(src, node, `Expected a Number, Sequence, or Parenthetical expression, but got ${node.type.name} instead.`)
    }
}