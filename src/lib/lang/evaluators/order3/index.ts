
import type { TreeCursor } from '@lezer/common'
import { Cards, Dice, Sequence } from '$lib/lang/dataStructures'
import { evalEventSource } from './eventSource'
import { evalOrder2 } from '../order2'

export function evalOrder3(
    src: string,
    node: TreeCursor
): number | Sequence {
    const results = new Sequence()
    let events: Cards | Dice | Cards[] | Dice[]
    switch (node.type.name) {
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
            return evalOrder2(src, node)
        }
}