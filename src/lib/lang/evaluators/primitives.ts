import type { TreeCursor } from '@lezer/common'
import { EvaluationError } from './errors'

export function evalNum(src:string, node: TreeCursor): number {
    try{
        return parseInt(src.slice(node.from, node.to))
    } catch (error) {
        throw new EvaluationError(src, node, "Not a Number.")
    }
    
}

export function evalStr(src: string, node: TreeCursor): string {
    return src.slice(node.from + 1, node.to - 1)
}