import { Sequence } from "./sequence";
import { DependentEventSource } from "./eventSources";



export class Cards extends DependentEventSource {
    quantity: number;
    resultEvents: Array<Sequence>
    resultSums: Sequence

    constructor(
        quantity: number,
        faces: number[] | Sequence
        ) {
            const numVal = Math.abs(quantity)
            super(faces.map(face => face * quantity / numVal))
            this.quantity = numVal
            this.resultEvents = this.getEvents(quantity, quantity > faces.length)
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