import { atLeastCollation, atMostCollation } from "$lib/resultProcessing";
import { describe, expect, test } from "vitest";

const sampleResult = {
    name: 'Output',
    value: [
      2, 3, 3, 4, 4, 4,
      5, 5, 5, 5, 6, 6,
      6, 7, 7, 8
    ]
  }

describe("atLeastCollation", () => {

    test("gives smallest result probabilty as 100%", () => {
        const result = atLeastCollation(sampleResult)
        expect(result.data.get(2)).toEqual(1)
    })

    test("gives smaller results more probability than larger results", () => {
        const result = atLeastCollation(sampleResult)
        let prev = [Number.POSITIVE_INFINITY, 0]
        for (const kv of result.data.entries()) {
            expect(kv[0] < prev[0]).toEqual(kv[1] > prev[1])
            prev = kv
        }
    })
})

describe("atMostCollation", () => {

    test("gives largest result probabilty as 100%", () => {
        const result = atMostCollation(sampleResult)
        expect(result.data.get(8)).toEqual(1)
    })

    test("gives larger results more probability than smaller results", () => {
        const result = atMostCollation(sampleResult)
        let prev = [Number.NEGATIVE_INFINITY, 0]
        for (const kv of result.data.entries()) {
            expect(kv[0] > prev[0]).toEqual(kv[1] > prev[1])
            prev = kv
        }
    })
})