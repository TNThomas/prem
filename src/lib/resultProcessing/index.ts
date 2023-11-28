export { atLeastCollation } from "./atLeastCollation"
export { atMostCollation } from "./atMostCollation"
export { exactCollation } from "./exactCollation"

export type ResultType = {
    name: string,
    value: number[]
}

export type Collation = {
    name: string,
    data: Map<number, number>
}