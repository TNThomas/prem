import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalDivExpression", () => {

    test("does not divide numbers by zero", () => {
        const result = () => evalProgram("output 2/0")
        expect(result).toThrowError()
    })
    test("divides zero by numbers", () => {
        const result = evalProgram("output 0/2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    test("divides nonzero numbers", () => {
        const result = evalProgram("output 2 / 2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [1]
            }
        ])
    })

    test("divides negative numbers", () => {
        const result = evalProgram("output 4/-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-2]
            }
        ])
    })

    test("divides zero by negative numbers", () => {
        const result = evalProgram("output 0/-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })


})