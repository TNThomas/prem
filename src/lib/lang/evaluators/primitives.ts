import type { TreeCursor } from '@lezer/common'

export function evalNum(src:string, node: TreeCursor): number {
    return parseInt(src.slice(node.from, node.to))
}

export function evalStr(src: string, node: TreeCursor): string {
    return src.slice(node.from + 1, node.to - 1)
}