import type { ResultType } from "$lib/resultProcessing"
import { prem } from ".."
import { ErrorNodeError, EvaluationError } from "./errors"
import { evalOutputExpression } from "./outputExpression"


const premLang = prem()

export function evalProgram(src: string): ResultType[] {
    const tree  = premLang.language.parser.parse(src)
    const cursor = tree.cursor()
    if (cursor.firstChild()) {
        if (cursor.type.isError) {
            throw new ErrorNodeError(src, cursor)
        }
        const results = []
        results.push(evalOutputExpression(src, cursor))
        console.log(results[0])
        while (cursor.nextSibling()) {
            if (cursor.type.isError) {
                throw new ErrorNodeError(src, cursor)
            }
            results.push(evalOutputExpression(src, cursor))
            console.log(results.at(-1))
        }
        return results
    }
    throw new EvaluationError(src, cursor)
}