import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalModExpression", () => {

    test("does not divide numbers by zero", () => {
        const result = () => evalProgram("output 2%0")
        expect(result).toThrowError()
    })
    test("computes remainder of dividing zero by numbers", () => {
        const result = evalProgram("output 0%2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    test("computes remainder of dividing nonzero numbers evenly", () => {
        const result = evalProgram("output 2%2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    test("computes remainder of dividing nonzero numbers unevenly", () => {
        const result = evalProgram("output 5%2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [1]
            }
        ])
    })

    test("computes remainder of dividing negative numbers evenly", () => {
        const result = evalProgram("output 4%-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    test("computes remainder of dividing zero by negative numbers", () => {
        const result = evalProgram("output 0%-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    test("computes remainder of dividing negative numbers unevenly", () => {
        const result = evalProgram("output 5%-3")
        expect(result).toEqual([
            {
                name: "Output",
                value: [2]
            }
        ])
    })

    test("rejects division by sequences containing zero", () => {
        const result = () => evalProgram("output 2%{0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144}")
        expect(result).toThrow()
    })

    test("computes remainder of dividing values by sequences", () => {
        const result = evalProgram("output 20%{ 2, 2, 4, 5, 16, 20, 40}")

        expect(result).toEqual([
            {
                name: "Output",
                value: [ 0, 0, 0, 0, 4, 0, 20, ].sort((a, b) => a-b)
            }
        ])
    })

})