import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalNeqExpression", () => {

    test("satisfies not equal operator truth table", () => {

        for( const [left, right, expected] of [
            [6, 9, 1],
            [1, 1, 0],
            [4, 2, 1]
        ]) {
            const result = evalProgram(`output ${left} != ${right}`)
            expect(result).toEqual([
                {
                    name: "Output",
                    value: [expected]
                }
            ])

        }
    })

})