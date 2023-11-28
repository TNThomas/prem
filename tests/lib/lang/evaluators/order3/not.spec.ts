import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalNotExpression", () => {


    test("!0 returns a 1", () => {
        const result = evalProgram("output !0")
        expect(result).toEqual([
            {
                name: "Output",
                value: [1]
            }
        ])
    })

    test("!1 returns a 0", () => {
        const result = evalProgram("output !1")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    test("!42 returns a 0", () => {
        const result = evalProgram("output !42")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    // we are ok not having this functionality as we would have to change grammar to do so
    // test("!!42 returns a 1", () => {
    //     const result = evalProgram("output !!42")
    //     expect(result).toEqual([
    //         {
    //             name: "Output",
    //             value: [1]
    //         }
    //     ])
    // })

    test("!(!42) returns a 1", () => {
        const result = evalProgram("output !(!42)")
        expect(result).toEqual([
            {
                name: "Output",
                value: [1]
            }
        ])
    })

    
    test("Not functions over a sequence of ones and zeroes", () => {
        const result = evalProgram("output !{0,1,0,1,0,0,1}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [1,0,1,0,1,1,0].sort((a, b) => a-b)
            }
        ])
    })

    test("Not functions over a sequence of different values", () => {
        const result = evalProgram("output !{0,1,0,26,0,0,45}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [1,0,1,0,1,1,0].sort((a, b) => a-b)
            }
        ])
    })

    test("Not throws an error when nothing is present", () => {
        expect(() => evalProgram("output !")).toThrowError()
    })

    test("Not functions while within parentheses", () => {
        const result = evalProgram("output (!1)d6")
        expect(result).toEqual([
            {
                name: "Output",
                value: []
            }
        ])
    })

    test("Not functions with dice within parentheses", () => {
        const result = evalProgram("output !(1d6)")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0,0,0,0,0,0]
            }
        ])
    })

    //!1d6 is parsed the same way as (!1)d6
    test("Not functions with dice without parentheses", () => {
        const result = evalProgram("output !1d6")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0,0,0,0,0,0]
            }
        ])
    })


})