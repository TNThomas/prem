import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

// Test evalArithmeticBinary using multiplication, since the operator function is just (a,b) => a*b
describe( "evalArithmeticBinary", () => {
    
    test("operates on zero", () => {
        const result = evalProgram("output 0*2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    test("operates on nonzero numbers", () => {
        const result = evalProgram("output 2 * 2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [4]
            }
        ])
    })

    test("operates on negative numbers", () => {
        const result = evalProgram("output 2*-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-4]
            }
        ])
    })

    test("operates on negatives with zero", () => {
        const result = evalProgram("output 0*-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })


    test("disallows incomplete equations", () => {
        const result = () => evalProgram("output 1*")
        expect(result).toThrow()
    })

    test("distributes operations over sequences", () => {
        const result = evalProgram("output 2* {0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0, 2, 2, 4, 6, 10, 16, 26, 42, 68, 110, 178, 288].sort((a, b) => a-b)
            }
        ])
    })

    test("distributes operations over sequences with positives, negatives, and zero", () => {
        const result = evalProgram("output -1* {0, 1, -2, 3, 5, -8, -13, -21, 34, 55, 79, 134}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0, -1, 2, -3, -5, 8, 13, 21, -34, -55, -79, -134].sort((a, b) => a-b)
            }
        ])
    })


    test("distributes operations across sequences on both sides of the operator", () => {
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

    test("distributes operations across sequences on both sides of the operator when positive, negative, and zero values are present", () => {
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