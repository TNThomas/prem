import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalLessThanExpression", () => {

    test("satisfies less than operator truth table", () => {

        for( const [left, right, expected] of [
            [6, 9, 1],
            [1, 1, 0],
            [4, 2, 0]
        ]) {
            const result = evalProgram(`output ${left}<${right}`)
            expect(result).toEqual([
                {
                    name: "Output",
                    value: [expected]
                }
            ])

        }
    })

})