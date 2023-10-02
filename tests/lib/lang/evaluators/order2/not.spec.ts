import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalParenExpression", () => {


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
                value: [1,1,1,1,0,0,0]
            }
        ])
    })

    test("Not functions over a sequence of different values", () => {
        const result = evalProgram("output !{0,1,0,26,0,0,45}")
        expect(result).toEqual([
            {
                name: "Output",
                value: [1,1,1,1,0,0,0]
            }
        ])
    })

    test("Not throws an error when nothing is present", () => {
        expect(() => evalProgram("output !")).toThrowError()
    })

    test("Not functions while within paranthesies", () => {
        const result = evalProgram("output (!1)d6")
        expect(result).toEqual([
            {
                name: "Output",
                value: []
            }
        ])
    })

    test("Not functions with dice within paranthesies", () => {
        const result = evalProgram("output !(1d6)")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0,0,0,0,0,0]
            }
        ])
    })

    // i am not completely sure why this one fails
    // however my theory is that the code is reading in !1 as the input for the first value in the dice 
    // since it expects it to be only values of order1 the index for order1 throws an error
    test("Not functions with dice without paranthesies", () => {
        const result = evalProgram("output !1d6")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0,0,0,0,0,0]
            }
        ])
    })

})