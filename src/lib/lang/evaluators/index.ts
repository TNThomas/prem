import type { Tree} from '@lezer/common'

import { prem } from '..'
export { EvaluationError } from "./errors"
import { evalOutputExpression } from './outputExpression'
import type { ResultType } from '$lib/resultProcessing'

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

    eval(): ResultType[] {
        const cursor = this.tree.cursor()
        cursor.firstChild()
        const result = evalOutputExpression(this.src, cursor)
        console.log(result)
        return [result]
    }

}