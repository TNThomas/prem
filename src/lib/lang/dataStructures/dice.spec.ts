import { describe, expect, test } from "vitest";
import { Dice } from "./dice";
import { Sequence } from "./sequence";

describe( "Dice", () => {

    test("construct negative quantities", () => {
        const instance = new Dice(-3, [1,2,3,4,5,6])
        expect(instance.quantity).toEqual(3)
        expect(instance.possibleEvents).toEqual([-1,-2,-3,-4,-5,-6])
    })

    test("generate accurate result spreads", () => {
        const instance = new Dice(3, [1,-1,0])
        const expected = new Sequence(
            -3,               // -1, -1, -1
            -2, -2, -2,       // -1, -1,  0
            -1, -1, -1,       // -1, -1,  1
            -1, -1, -1,       // -1,  0,  0
            0,                //  0,  0,  0
            0, 0, 0, 0, 0, 0, // -1, 0, 1
            1, 1, 1,          // Mirrors of the negatives from here
            1, 1, 1,
            2, 2, 2,
            3
        )
        expect(instance.resultSums).toEqual(expected)
    })
})