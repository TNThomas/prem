import { describe, expect, test } from "vitest";
import { Sequence } from "./sequence";

describe( "Sequence", () => {

    test("sorts on construction", () => {
        const instance = new Sequence(3, -1, 0, 12)
        expect(instance).toBeTruthy()
        expect([...instance]).toEqual([-1, 0, 3, 12])
    })

    test("is indexable", () => {
        const instance = new Sequence(3, -1, 0)
        expect(instance.at(0)).toEqual(-1)
        expect(instance.at(1)).toEqual(0)
        expect(instance.at(2)).toEqual(3)
    })

    test("is iterable multiple times", () => {
        const instance = new Sequence(3, -1, 0)
        const expected = [-1, 0, 3]
        const results = [true,true,true]
        for (let i of results) {
            instance.forEach( (value:number, index: number) => {
                i = i && (value === expected[index])
            } )
        }
        expect(results).toEqual([true,true,true])
    })
    
    test("maintains sort after insertion", () => {
        const instance = new Sequence(1, 2, 5)
        expect(instance.insert(4, 3)).toEqual(new Sequence(1, 2, 3, 4, 5))
    })

    test("inserts at start and end of original Sequence", () => {
        const instance = new Sequence(8, 6, 7)
        expect(instance.insert(5, 3, 0, 9)).toEqual(
            new Sequence(0, 3, 5, 6, 7, 8, 9)
        )
    })
    
})