import { Sequence } from "./sequence";
import { IndependentEventSource } from "./eventSources";

export class Dice extends IndependentEventSource {
    quantity: number
    resultEvents: Array<Sequence>
    resultSums: Sequence

    constructor(quantity: number, faces: number[] | Sequence) {
        const numVal = Math.abs(quantity)
        const numSign = quantity / numVal
        super(faces.map((face: number) => face * numSign))
        this.quantity = numVal
        this.resultEvents = this.getEvents(quantity)
        this.resultSums = this.getResults()
    }

    private getResults(): Sequence {
        return new Sequence(...this.resultEvents.map(
            (events: Sequence): number => events.reduce(
                (a:number, b:number): number => {
                    return a + b
                },
                0
            )
        ))
    }
}