import type { TreeCursor } from '@lezer/common'

/**
 * Base class for all errors raised by evaluation
 */
export class EvaluationError extends Error {
    src: string
    constructor(src: string, node: TreeCursor, message?: string) {
        const msg = `Failed to evaluate ${node.type.name} expression "${src.slice(node.from, node.to)}."`
        super(msg + ((" " + message) || ""))
        this.src = src
    }
}

/**
 * The evaluator has encountered an Error node. 
 */
export class ErrorNodeError extends EvaluationError {
    constructor(src: string, node: TreeCursor, detail?: string) {
        const errText = src.slice(node.from, node.to)
        node.parent()
        super(src, node, ` at ${errText}. ` + detail)
    }
}