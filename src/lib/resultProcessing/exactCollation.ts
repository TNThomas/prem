import type { Collation, ResultType } from ".";

export function exactCollation(raw: ResultType): Collation {
    const collation: Collation = {
        name: raw.name,
        data: new Map()
    }
    for (const result of raw.value) {
        collation.data.set(result, (collation.data.get(result) || 0) + 1)
    }
    for (const result of collation.data.keys()) {
        collation.data.set(result, (collation.data.get(result) || 0) / raw.value.length)
    }
    return collation
}