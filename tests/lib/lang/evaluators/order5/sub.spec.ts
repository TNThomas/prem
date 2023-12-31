import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalSubExpression", () => {

    test("subtracts numbers from zero", () => {
        const result = evalProgram("output 0-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-2]
            }
        ])
    })

    test("subtracts nonzero numbers", () => {
        const result = evalProgram("output 1-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-1]
            }
        ])
    })

    test("subtracts negative numbers", () => {
        const result = evalProgram("output -2--3")
        expect(result).toEqual([
            {
                name: "Output",
                value: [1]
            }
        ])
    })

    test("subtracts negative numbers from zero", () => {
        const result = evalProgram("output 0--2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [2]
            }
        ])
    })


    test("Disallows incomplete equation", () => {
        const result = () => evalProgram("output 1-")
        expect(result).toThrow()
    })

    test("subtracts sequences", () => {
        const result = evalProgram("output 2- {0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [2, 1, 1, 0, -1, -3, -6, -11, -19, -32, -53, -87, -142].sort((a, b) => a-b)
            }
        ])
    })

    test("subtracts sequences with negatives", () => {
        const result = evalProgram("output -1- {0, 1, -2, 3, 5, -8, -13, -21, 34, 55, 89, 144}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-1, -2, 1, -4, -6, 7, 12, 20, -35, -56, -90, -145].sort((a, b) => a-b)
            }
        ])
    })


    test("subtracts multiple sequences", () => {
        const result = evalProgram("output 1d4-1d4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [
                    0, -1, -2, -3,  // 1 - 2nd sequence
                    1,  0, -1, -2,  // 2 - 2nd sequence
                    2,  1,  0, -1,  // 3 - 2nd sequence
                    3,  2,  1,  0,  // 4 - 2nd sequence
                ].sort((a, b) => a-b)
            }
        ])
    })

    test("subtracts multiple sequences with negative values", () => {
        const result = evalProgram("output {-1,-2,3,4}-{0,1,-2,-3}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [  
                -1, -2,  1,  2, // -1- second sequence
                -2, -3,  0,  1, // -2- second sequence
                 3,  2,  5,  6, //  3- second sequence
                 4,  3,  6,  7  //  4- second sequence
                ].sort((a, b) => a-b)
            }
        ])
    })

})