import { describe, expect, test } from "vitest";
import { evalProgram } from "..";

describe( "evalDice", () => {

    test("parses basic syntax", () => {
        const result = evalProgram("output 2d4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [
                    2,      // 2d4 = 1, 1
                    3, 3,   // 2d4 = 1, 2
                    4, 4,   // 2d4 = 1, 3
                    4,      // 2d4 = 2, 2
                    5, 5,   // 2d4 = 1, 4
                    5, 5,   // 2d4 = 2, 3
                    6, 6,   // 2d4 = 2, 4
                    6,      // 2d4 = 3, 3
                    7, 7,   // 2d4 = 1, 3
                    8       // 2d4 = 4, 4
                ]
            }
        ])
    })

    test("assumes 1 when no quantity provided", () => {
        const result = evalProgram("output d10")
        expect(result).toEqual([
            {
                name: "Output",
                value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        ])
    })

    test("composes with left precedence", () => {
        const result = evalProgram("output 1d2d4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [
                    1,      // 1d4 = 1
                    2,      // 1d4 = 2
                    2,      // 2d4 = 1, 1
                    3,      // 1d4 = 3
                    3, 3,   // 2d4 = 1, 2
                    4,      // 1d4 = 4
                    4, 4,   // 2d4 = 1, 3
                    4,      // 2d4 = 2, 2    
                    5, 5,   // 2d4 = 1, 4
                    5, 5,   // 2d4 = 2, 3
                    6, 6,   // 2d4 = 2, 4
                    6,      // 2d4 = 3, 3
                    7, 7,   // 2d4 = 3, 4
                    8       // 2d4 = 4, 4
                ]
            }
        ])
    })
})