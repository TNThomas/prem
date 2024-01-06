import type { TreeCursor } from '@lezer/common'
import { Sequence } from "$lib/lang/dataStructures"
import { ErrorNodeError, EvaluationError } from ".."
import { evalOrder3 } from "../order3"
import { evalOrder4 } from "."
//import { evalOrderLast } from ".."

export function evalMod(src: string, node: TreeCursor): number | Sequence {

    let first: number | Sequence, second: number | Sequence

    if (node.firstChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node, "Invalid first value.")
        }
        first = evalOrder3(src, node)
    

        if (node.nextSibling()) {
            if (node.type.isError) {
                throw new ErrorNodeError(src, node, "Invalid second value.")
            }         
            second = evalOrder4(src, node)
        }
        node.parent()
    }

    if (first !== undefined && second !== undefined) {

        // we will check the second value first to ensure there is nothing dividing by zero
        if (typeof second === "number") {
            if(second === 0){
                throw new EvaluationError(src, node, "Cannot Divide by Zero.")
            }

            if (typeof first === "number") {
                // instead of using JS's mod (which dosnt work properly in all cases) we have instead created a mod function which we pas the values
                return mod(first,second) === 0 ? 0 :mod(first,second);
            }
            if (first instanceof Sequence) {
                return new Sequence(...first.map(value => mod(value,(second as number))  === 0 ? 0 : mod(value,(second as number)) ))
            }
        }

        if (second instanceof Sequence) {
            second.forEach(value=>{ if (value===0){
                throw new EvaluationError(src, node, "Zero Found in Sequence: Cannot Divide by Zero.")
            }})

            if (typeof first === "number") {
                return new Sequence(...second.map(value => mod((first as number),value) === 0 ? 0 : mod((first as number),value) ))
            }

            if (first instanceof Sequence) {
                let result: Sequence
                result = new Sequence();

                // loop through each value of first
                first.forEach(firstValue=>{
                    // create a sequence of every value in second modded by the current firstValue and add it to the result sequence
                    result.insert(new Sequence(...second.map(secondValue => {return mod(firstValue,secondValue) === 0 ? 0 :mod(firstValue,secondValue)}  )    ))
                })
                
                // return the sequence of sequences
                return result;
            }
        }

    }
    throw new EvaluationError(src, node, "Cannot divide values that are neither Number nor Sequence.")


}

// this mod function here exists becaue JavaScript Mod doesnt work like actual Math mod when it comes to negative numbers
function mod(n:number, m:number){
    return ((n%m)+m)%m;
}