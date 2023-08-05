import type { Tree} from '@lezer/common'

import { prem } from '..'
export { EvaluationError } from "./errors"
import { evalOutputExpression } from './outputExpression'
import type { ResultType } from '$lib/resultProcessing'
import { ErrorNodeError, EvaluationError } from './errors'

const premLang = prem()

export class Evaluator {
    src: string
    tree: Tree

    constructor(src: string) {
        this.src = src
        this.tree  = premLang.language.parser.parse(
            src
        )
    }

    evalProgram(): ResultType[] {
        const cursor = this.tree.cursor()
        if (cursor.firstChild()) {
            if (cursor.type.isError) {
                throw new ErrorNodeError(this.src, cursor)
            }
            const results = []
            results.push(evalOutputExpression(this.src, cursor))
            console.log(results[0])
            while (cursor.nextSibling()) {
                if (cursor.type.isError) {
                    throw new ErrorNodeError(this.src, cursor)
                }
                results.push(evalOutputExpression(this.src, cursor))
                console.log(results.at(-1))
            }
            return results
        }
        throw new EvaluationError(this.src, cursor)
    }

}