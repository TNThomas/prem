import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalNegativeExpression", () => {

    test("negates 0 as 0", () => {
        const result = evalProgram("output -0")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    test("negates positives as negative", () => {
        for (const input of [1, 2, 3, 5, 8, 13, 21, 34, 55, 79, 134]) {
            expect(evalProgram(`output -${input}`)).toEqual([
                {
                    name: "Output",
                    value: [-(input)]
                }
            ])
        }
    })

    test("negates negatives as positive", () => {
        for (const input of [-1, -2, -3, -5, -8, -13, -21, -34, -55, -79, -134]) {
            expect(evalProgram(`output -(${input})`)).toEqual([
                {
                    name: "Output",
                    value: [-(input)]
                }
            ])
        }
    })

    test("disallows --", () => {
        const result = () => evalProgram("output --1")
        expect(result).toThrow()
    })

    test("negates sequences", () => {
        const result = evalProgram("output -{0, 1, -2, 3, 5, -8, -13, -21, 34, 55, 79, 134}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0, -1, 2, -3, -5, 8, 13, 21, -34, -55, -79, -134].sort((a, b) => a-b)
            }
        ])
    })

    test("negates a die", () => {
        const result = evalProgram("output -1d4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-1, -2, -3, -4].sort((a, b) => a-b)
            }
        ])
    })

    test("negates a shorthanded die", () => {
        const result = evalProgram("output -(d4)")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-1, -2, -3, -4].sort((a, b) => a-b)
            }
        ])
    })

    test("negates a multiple of dice", () => {
        const result = evalProgram("output -2d4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [
                    -8,       // 2d4 = 4, 4
                    -7, -7,   // 2d4 = 3, 4
                    -6,       // 2d4 = 3, 3
                    -6, -6,   // 2d4 = 2, 4
                    -5, -5,   // 2d4 = 2, 3
                    -5, -5,   // 2d4 = 1, 4
                    -4,       // 2d4 = 2, 2
                    -4, -4,   // 2d4 = 1, 3    
                    -3, -3,   // 2d4 = 1, 2
                    -2      // 2d4 = 1, 1
                ]
            }
        ])
    })

    test("negates the number of faces on a die", () => {
        const result = evalProgram("output d-4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-1, -2, -3, -4].sort((a, b) => a-b)
            }
        ])
    })

    test("negates a card", () => {
        const result = evalProgram("output -1c4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-1, -2, -3, -4].sort((a, b) => a-b)
            }
        ])
    })

    test("negates a shorthanded card", () => {
        const result = evalProgram("output -(c4)")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-1, -2, -3, -4].sort((a, b) => a-b)
            }
        ])
    })

    test("negates a multiple of cards", () => {
        const result = evalProgram("output -2c4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [
                    -7, -7,   // 4, 3
                    -6, -6,   // 4, 2
                    -5, -5,   // 4, 1
                    -5, -5,   // 3, 2
                    -4, -4,   // 3, 1
                    -3, -3,   // 2, 1
                ]
            }
        ])
    })

    test("negates the number of faces in a deck", () => {
        const result = evalProgram("output c-4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-1, -2, -3, -4].sort((a, b) => a-b)
            }
        ])
    })
})