import type { TreeCursor } from '@lezer/common'
import { Sequence } from "$lib/lang/dataStructures"
import { ErrorNodeError, EvaluationError } from ".."
import { evalOrder1 } from "../order1"
import { evalOrder3 } from "../order3"
import { evalOrder4 } from "../order4"
import { evalOrderLast } from ".."

export function evalMult(src: string, node: TreeCursor): number | Sequence {

    let result: number | Sequence
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

        // if the first one is just a number
        if (typeof first === "number") {
            //if the second one is a number just multiply them
            if (typeof second === "number") {
                return first*second;
            }
            // if the first is a number and the second is a sequence, create a new sequence using map where every value in second is multiplied by first  
            if (second instanceof Sequence) {
                return new Sequence(...second.map(value => (first as number)*value ))
            }
        }

        if (first instanceof Sequence) {
            // if second is just a number we do a similar thing to how we handeled first being a sequnce and second not
            if (typeof second === "number") {
                return new Sequence(...first.map(value => value*(second as number) ))
            }

            if (second instanceof Sequence) {
                throw new ErrorNodeError(src, node, "Not finished lol.")

                // method: ??? fukin idunno? 
                //i really dont know what applies here
                //do i have each value in the first sequence apply to each value in the second? {a(1-n)}*{b(1-n)}={b1*{a1-n}, b2*{a1-n},...,bn*{a1-n}}
                //do i produce some weird 3d sequence? {a(1-n)}*{b(1-n)}={{b1*a1,b2*a1,...,bn*a1},...,{b1*an,b2*an,...,bn*an}}
                //do i just multiply the values in the same position on the sequence? {a(1-n)}*{b(1-n)}={a1*b1,a2*b2,...,an*bn}
                //im really not sure

                    
            }

        }


    }
    throw new EvaluationError(src, node, "Cannot multiply values that are neither Number nor Sequence.")


}