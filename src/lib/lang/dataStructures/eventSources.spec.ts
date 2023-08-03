import { describe, expect, test } from "vitest"
import { DependentEventSource, IndependentEventSource } from "./eventSources"
import { Sequence } from "./sequence"

describe( "IndependentEventSource", () => {

    const testDummy = new IndependentEventSource([-1, 0, 1])

    test("constructor correctly sets possibleEvents", () => {
        expect(testDummy.possibleEvents).toEqual([-1, 0, 1])
    })

    test("gets an empty list for 0 events", () => {
        expect(testDummy.getEvents(0)).toEqual([])
    })

    test("single event === transposed possibility space", () => {
        expect(testDummy.getEvents(1)).toEqual([
            new Sequence(-1),
            new Sequence(0),
            new Sequence(1),
        ])
    })

    test("computes instances of several events correctly", () => {
        const events = testDummy.getEvents(3)
        expect(events.length).toEqual(27)
        expect(events.at(0)?.length).toEqual(3)
        expect(events.at(0)).toEqual(new Sequence(-1, -1, -1))
        expect(events.at(1)).toEqual(new Sequence(-1, -1,  0))
        expect(events.at(3)).toEqual(new Sequence(-1,  0, -1))
        expect(events.at(9)).toEqual(new Sequence( 0, -1, -1))
        expect(events).toEqual([
            new Sequence(-1, -1, -1),
            new Sequence(-1, -1,  0),
            new Sequence(-1, -1,  1),
            new Sequence(-1,  0, -1),
            new Sequence(-1,  0,  0),
            new Sequence(-1,  0,  1),
            new Sequence(-1,  1, -1),
            new Sequence(-1,  1,  0),
            new Sequence(-1,  1,  1),
            new Sequence( 0, -1, -1),
            new Sequence( 0, -1,  0),
            new Sequence( 0, -1,  1),
            new Sequence( 0,  0, -1),
            new Sequence( 0,  0,  0),
            new Sequence( 0,  0,  1),
            new Sequence( 0,  1, -1),
            new Sequence( 0,  1,  0),
            new Sequence( 0,  1,  1),
            new Sequence( 1, -1, -1),
            new Sequence( 1, -1,  0),
            new Sequence( 1, -1,  1),
            new Sequence( 1,  0, -1),
            new Sequence( 1,  0,  0),
            new Sequence( 1,  0,  1),
            new Sequence( 1,  1, -1),
            new Sequence( 1,  1,  0),
            new Sequence( 1,  1,  1),
        ])
    })

})

describe( "DependentEventSource", () => {

    const testDummy = new DependentEventSource([1, 2, 3, 4])

    test("constructor correctly sets possibleEvents", () => {
        expect(testDummy.possibleEvents).toEqual([1, 2, 3, 4])
    })

    test("gets an empty list for 0 events", () => {
        expect(testDummy.getEvents(0)).toEqual([])
    })

    test("single event === transposed possibility space", () => {
        expect(testDummy.getEvents(1)).toEqual([
            new Sequence(1),
            new Sequence(2),
            new Sequence(3),
            new Sequence(4),
        ])
    })
    
    test("computes instances of several events correctly", () => {
        const events = testDummy.getEvents(3)
        expect(events.length).toEqual(24)
        expect(events.at(0)?.length).toEqual(3)
        expect(events.at(0)).toEqual(new Sequence(1, 2, 3))
        expect(events.at(1)).toEqual(new Sequence(1, 2, 4))
        expect(events).toEqual([
            new Sequence(1, 2, 3),
            new Sequence(1, 2, 4),
            new Sequence(1, 3, 2),
            new Sequence(1, 3, 4),
            new Sequence(1, 4, 2),
            new Sequence(1, 4, 3),
            new Sequence(2, 1, 3),
            new Sequence(2, 1, 4),
            new Sequence(2, 3, 1),
            new Sequence(2, 3, 4),
            new Sequence(2, 4, 1),
            new Sequence(2, 4, 3),
            new Sequence(3, 1, 2),
            new Sequence(3, 1, 4),
            new Sequence(3, 2, 1),
            new Sequence(3, 2, 4),
            new Sequence(3, 4, 1),
            new Sequence(3, 4, 2),
            new Sequence(4, 1, 2),
            new Sequence(4, 1, 3),
            new Sequence(4, 2, 1),
            new Sequence(4, 2, 3),
            new Sequence(4, 3, 1),
            new Sequence(4, 3, 2),
        ])
    })

})