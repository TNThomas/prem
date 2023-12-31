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
        const result = evalProgram("output 2 + 2")
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

})