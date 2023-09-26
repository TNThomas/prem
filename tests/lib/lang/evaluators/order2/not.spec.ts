import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalParenExpression", () => {


    test("0 returns a 1", () => {
        const result = evalProgram("output !0")
        expect(result).toEqual([
            {
                name: "Output",
                value: [1]
            }
        ])
    })

    test("1 returns a 0", () => {
        const result = evalProgram("output !1")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    test("42 returns a 0", () => {
        const result = evalProgram("output !42")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    
    test("not functions over a sequence of ones and zeroes", () => {
        const result = evalProgram("output !{0,1,0,1,0,0,1}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [1,0,1,0,1,1,0]
            }
        ])
    })



})