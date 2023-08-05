import type { TreeCursor } from '@lezer/common'

export class EvaluationError extends Error {
    constructor(src: string, node: TreeCursor, message?: string) {
        let msg = `Could not evaluate ${node.type.name} expression "${src.slice(node.from, node.to)}"`
        if (message !== undefined) {
            msg += ": " + message
        }
        super(msg)
    }
}

export class ErrorNodeError extends Error {
    constructor(src: string, node: TreeCursor, detail?: string) {
        const errText = src.slice(node.from, node.to)
        node.parent()
        super(`Could not evaluate "${errText}" in ${node.type.name} expression "${src.slice(node.from, node.to)}". `)
        this.message += detail
    }
}