import { describe, expect, test } from "vitest";
import { Cards } from "$lib/lang/dataStructures/cards";
import { Sequence } from "$lib/lang/dataStructures/sequence";

describe("Cards", () => {
    test("are instantiable without suits", () => {
        const instance = new Cards(1, [-4, 0, 12])
        expect(instance.possibleEvents).toEqual([-4, 0, 12])
    })

    test("are instantiable with negative quantity", () => {
        const instance = new Cards(-1, [-4, 0, 12])
        expect(instance.possibleEvents).toEqual([4, -0, -12])
    })

    test("generate accurate result spreads", () => {
        const instance = new Cards(3, [1, 1, 2, 2])
        expect(instance.resultSums).toEqual(new Sequence(
            4, 4, 4, 4, 4, 4, // 6 arrangements without the 2 of 2s
            4, 4, 4, 4, 4, 4, // 6 arrangements without the 2 of 1s
            5, 5, 5, 5, 5, 5, // 6 arrangements without the 1 of 2s
            5, 5, 5, 5, 5, 5, // 6 arrangements without the 1 of 1s
        ))
    })

    test("shuffle when deck is exhausted", () => {
        const instance = new Cards(3, [1, 2])
        expect(instance.resultSums).toEqual(new Sequence(
            4, 4, 5, 5
        ))
    })

})