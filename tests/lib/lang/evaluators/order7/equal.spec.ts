import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalEqExpression", () => {

    test("satisfies equal operator truth table", () => {

        for( const [left, right, expected] of [
            [6, 9, 0],
            [1, 1, 1],
            [4, 2, 0]
        ]) {
            const result = evalProgram(`output ${left}==${right}`)
            expect(result).toEqual([
                {
                    name: "Output",
                    value: [expected]
                }
            ])

        }
    })

})