import type { TreeCursor } from '@lezer/common'
import { Sequence } from '../../dataStructures/sequence'
import { evalNum } from './primitives'
import { evalSequence } from './sequence'
import { EvaluationError } from '../errors'
import { evalEventSource } from './eventSource'
import type { Cards, Dice } from '../../dataStructures'

export function evalOrder1(
    src: string,
    node: TreeCursor
): number | Sequence {
    const results = new Sequence()
    let events: Cards | Dice | Cards[] | Dice[]
    switch (node.type.name) {
        case "Num":
            return evalNum(src, node)
        case "Sequence":
            return evalSequence(src, node)
        case "Cards":
        case "Dice":
            events = evalEventSource(src, node)
            if (!Array.isArray(events)){
                return events.resultSums
            }
            for (const event of events) {
                results.insert(event.resultSums)
            }
            return results
        default:
            throw new EvaluationError(src, node, `Expected a Number, Sequence, Dice, or Cards, but got ${node.type.name} instead.`)
    }
}