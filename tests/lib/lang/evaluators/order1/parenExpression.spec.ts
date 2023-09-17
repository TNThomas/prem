import { describe, expect, test } from "vitest";
import { evalProgram } from "$lib/lang/evaluators";

describe( "evalParenExpression", () => {

    test("parses basic syntax", () => {
        const result = evalProgram("output (2d4)")
        expect(result).toEqual([
            {
                name: "Output",
                value: [
                    2,      // 2d4 = 1, 1
                    3, 3,   // 2d4 = 1, 2
                    4, 4,   // 2d4 = 1, 3
                    4,      // 2d4 = 2, 2
                    5, 5,   // 2d4 = 1, 4
                    5, 5,   // 2d4 = 2, 3
                    6, 6,   // 2d4 = 2, 4
                    6,      // 2d4 = 3, 3
                    7, 7,   // 2d4 = 1, 3
                    8       // 2d4 = 4, 4
                ]
            }
        ])
    })

    test("Overrides default precedence", () => {
        const result = evalProgram("output 1d(2d4)")
        expect(result).toEqual([
            {
                name: "Output",
                    //2d4 can be any value between 2 and 8 
                    //1d(2d4) thus is 1 die with a face for every possible result from 2d4 
                    //a very srangely numbered d16 
                value: [     
                    2,      // 2d4 = 1, 1
                    3, 3,   // 2d4 = 1, 2
                    4, 4,   // 2d4 = 1, 3
                    4,      // 2d4 = 2, 2
                    5, 5,   // 2d4 = 1, 4
                    5, 5,   // 2d4 = 2, 3
                    6, 6,   // 2d4 = 2, 4
                    6,      // 2d4 = 3, 3
                    7, 7,   // 2d4 = 1, 3
                    8       // 2d4 = 4, 4
                    ]
            }
        ])
    })

    test("Evaluates normally inside another expression when parentheses do not override the default precedence ", () => {
        const result = evalProgram("output (1d2)d4")
        expect(result).toEqual([
            {
                name: "Output",
                    //essentilly ensure there is no difference between 1d2d4 and (1d2)d4
                    // 1d2d4 results in the Sequence {1,2}d4
                    // the end result being the sequence {1d4,2d4}
                    // we essentially just add the possible results of 1d4 1,2,3,4 to the results of 2d4
                value: [    
                    1,      // 1d4 = 1
                    2,      // 1d4 = 2  
                    2,      // 2d4 = 1,1   
                    3,      // 1d4 = 3
                    3, 3,   // 2d4 = 1, 2      
                    4,      // 1d4 = 4
                    // everything beyond this point is the same as 2d4
                    4, 4,   // 2d4 = 1, 3
                    4,      // 2d4 = 2, 2
                    5, 5,   // 2d4 = 1, 4 
                    5, 5,   // 2d4 = 2, 3     
                    6, 6,   // 2d4 = 2, 4
                    6,      // 2d4 = 3, 3
                    7, 7,   // 2d4 = 1, 3
                    8       // 2d4 = 4, 4      
                    ]
            }
        ])
    })

    // we currently throw an evaluator error in the case that the output is empty
    test("Throws an EvaluatorError if there's nothing between the parentheses", () => {
        let actual = () => evalProgram("output ()")
        expect(actual).toThrowError()
    })

})