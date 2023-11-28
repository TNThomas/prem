import type { TreeCursor } from '@lezer/common'
import { Sequence } from "$lib/lang/dataStructures"
import { ErrorNodeError, EvaluationError } from ".."
import { evalOrder3 } from "../order3"
import { evalOrder4 } from "."

export function evalDiv(src: string, node: TreeCursor): number | Sequence {

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
            // if second is zero throw an error
            if(second === 0){
                throw new EvaluationError(src, node, "Cannot Divide by Zero.")
            }

            // if first is a number, we can multiply the two numbers
            if (typeof first === "number") {
                // if first /second === 0 return 0 else return first/second
                // we do this to avoid any possible occurances of -0 
                return first/second === 0 ? 0 :first/second;
            }

            // if first is a sequence we must produce a new sequence of every value in first divided by second
            if (first instanceof Sequence) {
                return new Sequence(...first.map(value => value/(second as number)  === 0 ? 0 : value/(second as number) ))
            }
        }

        if (second instanceof Sequence) {
            // i tried to come up with a way where this checking would be done within the map, but i kept having issues
            // this solution is much easier to implement, though i think its less efficent
            // if the second sequence contains a zero throw an error
            second.forEach(value=>{ if (value===0){
                throw new EvaluationError(src, node, "Zero Found in Sequence: Cannot Divide by Zero.")
            }})
            // if first is a number we must produce a new sequence of first divided by every value in second
            if (typeof first === "number") {
                return new Sequence(...second.map(value => (first as number)/value === 0 ? 0 : (first as number)/value ))
            }

            // if first and second are both sequences
            if (first instanceof Sequence) {
                let result: Sequence
                result = new Sequence();

                // loop through each value of first
                first.forEach(firstValue=>{
                    // create a sequence of every value in second divided by the current firstValue and add it to the result sequence
                    result.insert(new Sequence(...second.map(secondValue => {return firstValue/secondValue === 0 ? 0 :firstValue/secondValue}  )    ))
                })
                
                // return the sequence of sequences
                return result;
            }
        }

    }
    throw new EvaluationError(src, node, "Cannot divide values that are neither Number nor Sequence.")


}