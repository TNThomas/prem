import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalMultExpression", () => {

    test("Multiplies numbers by zero", () => {
        const result = evalProgram("output 0*2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    test("Multiplies nonzero numbers", () => {
        const result = evalProgram("output 2*2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [4]
            }
        ])
    })

    test("Multiplies negative numbers", () => {
        const result = evalProgram("output 2*-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-4]
            }
        ])
    })

    test("Multiplies negative numbers by zero", () => {
        const result = evalProgram("output 0*-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })


    test("Disallows incomplete equation", () => {
        const result = () => evalProgram("output 1*")
        expect(result).toThrow()
    })

    test("Multiplies sequences", () => {
        const result = evalProgram("output 2* {0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0, 2, 2, 4, 6, 10, 16, 26, 42, 68, 110, 178, 288].sort((a, b) => a-b)
            }
        ])
    })

    test("Multiplies sequences with negatives", () => {
        const result = evalProgram("output -1* {0, 1, -2, 3, 5, -8, -13, -21, 34, 55, 79, 134}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0, -1, 2, -3, -5, 8, 13, 21, -34, -55, -79, -134].sort((a, b) => a-b)
            }
        ])
    })


    test("Multiplies multiple sequences", () => {
        const result = evalProgram("output 1d4*1d4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [
                1,      // 1*1
                2,2,    // 1*2, 2*1
                3,3,    // 1*3, 3*1
                4,4,4,  // 1*4, 4*1, 2*2
                6,6,    // 2*3, 3*2
                8,8,    // 2*4, 4*2
                9,      // 3*3
                12,12,  // 3*4, 4*3
                16      // 4*4
                ].sort((a, b) => a-b)
            }
        ])
    })

    test("Multiplies multiple sequences with negative values", () => {
        const result = evalProgram("output {-1,-2,3,4}*{0,1,-2,-3}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [  
                0, -1, 2, 3, // -1* second sequence
                0, -2, 4, 6, // -2* second sequence
                0, 3, -6, -9,//  3* second sequence
                0, 4, -8,-12 //  4* second sequence
                ].sort((a, b) => a-b)

            }
        ])
    })

})