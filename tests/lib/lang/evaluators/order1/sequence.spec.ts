import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalSequence", () => {

    test("parses basic syntax", () => {
        const actual = evalProgram("output {3, 2, 1}")
        expect(actual).toEqual([
            {
                name: "Output",
                value: [1, 2, 3]
            }
        ])
    })

    test("Allows spaces in basic syntax", () => {
        const actual = evalProgram("output { 3, 2, 1 }")
        expect(actual).toEqual([
            {
                name: "Output",
                value: [1, 2, 3]
            }
        ])
    })

    test("flattens composed Sequences", () => {
        const actual = evalProgram("output {1, 1, 2, 3, 5, 8, {1, 3}}")
        expect(actual).toEqual([
            {
                name: "Output",
                value: [1, 1, 1, 2, 3, 3, 5, 8]
            }
        ])
    })

    test("rejects sparse input", () => {
        let actual = () => evalProgram("output { , 2, 3}")
        expect(actual).toThrowError()
        actual = () => evalProgram("output { 1, , 3}")
        expect(actual).toThrowError()
    })

    test("accepts the Empty Sequence", () => {
        const actual = evalProgram("output {}")
        expect(actual).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })
})