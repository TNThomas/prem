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
        const result = evalProgram("output 2 % 2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })



    test("2 mod 4 = 2", () => {
        const result = evalProgram("output 2%4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [2]
            }
        ])
    })

    test("-1 mod 4 = 3", () => {
        const result = evalProgram("output -1%4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [3]
            }
        ])
    })

    test("-2 mod 4 = 2", () => {
        const result = evalProgram("output -2%4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [2]
            }
        ])
    })

    test("-10 mod 16 = 6", () => {
        const result = evalProgram("output -10%16")
        expect(result).toEqual([
            {
                name: "Output",
                value: [6]
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

    test("mods zero by negative numbers", () => {
        const result = evalProgram("output 0%-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0]
            }
        ])
    })

    test("disallows incomplete equation", () => {
        const result = () => evalProgram("output 1%")
        expect(result).toThrow()
    })



    test("computes remainder of dividing negative numbers unevenly", () => {
        const result = evalProgram("output 5%-3")
        expect(result).toEqual([
            {
                name: "Output",
                value: [-1]
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


    test("computes remainder of dividing sequences by values", () => {
        const result = evalProgram("output { 2, 2, 4, 6, 10, 16, 26, 42, 68, 110, 178, 288}%2")

        expect(result).toEqual([
            {
                name: "Output",
                value: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].sort((a, b) => a-b)
            }
        ])
    })


    test("computes remainder of dividing sequences by negatives", () => {
        const result = evalProgram("output {0, 1, -2, 3, 5, -8, -13, -21, 34, 55, 79, 134}%-2")
        expect(result).toEqual([
            {
                name: "Output",
                value: [0, -1, 0, -1, -1, 0, -1, -1, 0, -1, -1, 0].sort((a, b) => a-b)
            }
        ])
    })


    test("computes remainder of dividing multiple sequences", () => {
        const result = evalProgram("output 1d4%1d4")
        expect(result).toEqual([
            {
                name: "Output",
                value: [
                0, 1, 1, 1,   //  1% second sequence
                0, 0, 2, 2,   //  2% second sequence
                0, 1, 3, 0,   //  3% second sequence
                0, 0, 1, 0    //  4% second sequence
                ].sort((a, b) => a-b)
            }
        ])
    })

    test("mod functions on multiple sequences with negative values", () => {
        const result = evalProgram("output {-1,-2,3,4}%{1,-2,-3,4}")
        
        expect(result).toEqual([
            {
                name: "Output",
                value: [  
                    0, -1, -1, 3,       //  -1% second sequence
                    0, 0, -2, 2,        //  -2% second sequence
                    0, -1, 0, 3,        //   3% second sequence
                    0, 0, -2, 0         //   4% second sequence
                ].sort((a, b) => a-b)

            }
        ])
    })



})