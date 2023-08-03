import { describe, expect, test } from "vitest";
import { Evaluator } from ".";

describe( "evalCards", () => {

    test("parses basic syntax", () => {
        const result = new Evaluator("output 2c4").eval()
        expect(result).toEqual([
            {
                name: "Output",
                value: [
                    3, 3,   // 1, 2
                    4, 4,   // 1, 3
                    5, 5,   // 1, 4
                    5, 5,   // 2, 3
                    6, 6,   // 2, 4
                    7, 7,   // 1, 3
                ]
            }
        ])
    })

    test("assumes 1 when no quantity provided", () => {
        const result = new Evaluator("output c10").eval()
        expect(result).toEqual([
            {
                name: "Output",
                value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        ])
    })

    test("composes with left precedence", () => {
        const result = new Evaluator("output 1c2c4").eval()
        expect(result).toEqual([
            {
                name: "Output",
                value: [
                    1,      // 1c4 = 1
                    2,      // 1c4 = 2
                    3,      // 1c4 = 3
                    3, 3,   // 2c4 = 1, 2
                    4,      // 1c4 = 4
                    4, 4,   // 2c4 = 1, 3  
                    5, 5,   // 2c4 = 1, 4
                    5, 5,   // 2c4 = 2, 3
                    6, 6,   // 2c4 = 2, 4
                    7, 7,   // 2c4 = 3, 4
                ]
            }
        ])
    })
})