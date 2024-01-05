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
        const result = evalProgram("output 1 - 2")
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

})