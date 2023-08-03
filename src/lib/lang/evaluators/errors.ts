import type { TreeCursor } from '@lezer/common'

export class EvaluationError extends Error {
    constructor(src: string, node: TreeCursor, message?: string) {
        let msg = `Could not evaluate ${node.type.name} ${src.slice(node.from, node.to)}`
        if (message !== undefined) {
            msg += ": " + message
        }
        super(msg)
    }
}