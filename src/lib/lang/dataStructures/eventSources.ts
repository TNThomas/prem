import { cross, difference, permute, range } from "d3"
import { Sequence} from "./sequence"

export interface EventSource {
    possibleEvents: number[]
    getEvents: (numEvents: number) => Array<Sequence>
}

export class IndependentEventSource implements EventSource {
    possibleEvents: number[]

    constructor(possibleEvents: number[]) {
        this.possibleEvents = possibleEvents.sort()
    }
    
    getEvents(numEvents: number): Sequence[] {
        if (numEvents === 0) return []
        let events = this.possibleEvents.map((event: number) => [event])
        for (let i = 1; i < Math.abs(numEvents); ++i) {
            events = cross(events, this.possibleEvents, (priorEvents: number[], newEvent: number) => {
                return priorEvents.concat(newEvent)
            })
        }
        return events.map(eventSequence => new Sequence(...eventSequence))
    }
    
}

export class DependentEventSource implements EventSource {
    possibleEvents: number[]

    constructor(possibleEvents: number[]) {
        this.possibleEvents = possibleEvents
    }

    getEvents(numEvents: number, overflow = false): Sequence[] {
        if (numEvents === 0) return []
        const possibilityIndices = range(this.possibleEvents.length)
        let eventIndices = possibilityIndices.map(idx => [idx])
        for (let i = 1; i < Math.abs(numEvents); ++i) {
            const usedIndexSets = eventIndices
            eventIndices = []
            usedIndexSets.forEach( (usedIndices) => {
                let remainingIndices = [...difference(possibilityIndices, usedIndices)]
                if (overflow && remainingIndices.length === 0) {
                    remainingIndices = possibilityIndices
                }
                eventIndices = eventIndices.concat(remainingIndices.map(
                    (newIndex) => usedIndices.concat(newIndex)
                ))
            })
        }
        // Turn indices back into events
        return eventIndices.map(
            (eventSet: number[]) => new Sequence(...permute(this.possibleEvents, eventSet) )
        )
    }

}