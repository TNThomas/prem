import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalAddExpression", () => {

    test("adds numbers to zero", () => {
        const result = evalProgram("output 0+2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [2]
            }
        ])
    })

    test("adds nonzero numbers", () => {
        const result = evalProgram("output 2+2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [4]
            }
        ])
    })

    test("adds negative numbers", () => {
        const result = evalProgram("output -2+-3")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-5]
            }
        ])
    })

    test("adds negative numbers to zero", () => {
        const result = evalProgram("output 0+-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-2]
            }
        ])
    })


    test("Disallows incomplete equation", () => {
        const result = () => evalProgram("output 1+")
        expect(result).toThrow()
    })

    test("adds sequences", () => {
        const result = evalProgram("output 2+ {0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [2, 3, 3, 4, 5, 7, 10, 15, 23, 36, 57, 91, 146].sort((a, b) => a-b)
            }
        ])
    })

    test("adds sequences with negatives", () => {
        const result = evalProgram("output -1+ {0, 1, -2, 3, 5, -8, -13, -21, 34, 55, 89, 144}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-1, 0, -3, 2, 4, -9, -14, -22, 33, 54, 88, 143].sort((a, b) => a-b)
            }
        ])
    })


    test("adds multiple sequences", () => {
        const result = evalProgram("output 1d4+1d4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [
                    2,          // 1+1
                    3,3,        // 1+2, 2+1
                    4,4,4,      // 1+3, 3+1, 2+2
                    5,5,5,5,    // 1+4, 4+1, 2+3, 3+2
                    6,6,6,      // 2+4, 4+2, 3+3
                    7,7,        // 3+4, 4+3
                    8           // 4+4
                ].sort((a, b) => a-b)
            }
        ])
    })

    test("adds multiple sequences with negative values", () => {
        const result = evalProgram("output {-1,-2,3,4}+{0,1,-2,-3}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [  
                -1,  0, -3, -4, // -1+ second sequence
                -2, -1, -4, -5, // -2+ second sequence
                 3,  4,  1,  0, //  3+ second sequence
                 4,  5,  2,  1  //  4+ second sequence
                ].sort((a, b) => a-b)

            }
        ])
    })

})